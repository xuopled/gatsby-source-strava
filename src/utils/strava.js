const strava = require("strava-v3")
const errors = require("request-promise/errors")

const {cache} = require("./cache.js")
const SourceStravaError = require("./error.js")

const isTokenValid = token => {
  if (
    token &&
    token.client_id &&
    token.client_secret &&
    token.access_token &&
    token.refresh_token &&
    token.expires_at
  ) {
    return true
  }

  return false
}

const verifyToken = async () => {
  const token = cache.getToken()

  if (isTokenValid(token)) {
    strava.config({
      client_id: token.client_id,
      client_secret: token.client_secret,
    })

    let expired = true

    if (token.expires_at) {
      const nowDate = new Date()
      const expirationDate = new Date(token.expires_at * 1000)
      expired = expirationDate.getTime() < nowDate.getTime()
    }

    if (expired) {
      const refreshedToken = await strava.oauth.refreshToken(
        token.refresh_token
      )

      cache.setToken({
        client_id: token.client_id,
        client_secret: token.client_secret,
        ...refreshedToken,
      })
    }
  } else {
    throw new Error("Invalid token. Please regenerate one")
  }
}

const handleError = ({category, method, error}) => {
  return new SourceStravaError("error", category, method, error)
}

const handleTooManyRequests = ({category, method}) => {
  const {longTermUsage, longTermLimit} = strava.rateLimiting
  const isLong = longTermUsage > longTermLimit ? true : false
  const type = isLong ? "LONG_LIMIT" : "SHORT_LIMIT"
  const message = isLong
    ? "Rate Limit Exceeded."
    : "Short Rate Limit Exceeded. Waiting 15 min."

  return new SourceStravaError(type, category, method, message)
}

const get = async ({args, method, format}) =>
  new Promise((resolve, reject) => {
    const {access_token} = cache.getToken()

    strava[method.category]
      [method.name]({...args, access_token})
      .then(payload => {
        if (format) {
          return resolve(format(payload))
        } else {
          return resolve(payload)
        }
      })
      .catch(errors.StatusCodeError, statusCodeError => {
        // Too Many Requests
        if (statusCodeError.statusCode === 429) {
          return reject(
            handleTooManyRequests({
              category: method.category,
              method: method.name,
            })
          )
        }

        return reject(
          handleError({
            category: method.category,
            method: method.name,
            error: statusCodeError.error.message,
          })
        )
      })
  })

module.exports = {
  get,
  verifyToken,
}