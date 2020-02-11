const getActivities = require("./utils/activities.js")
const getAthlete = require("./utils/athlete.js")
const {verifyToken} = require("./utils/strava.js")

exports.sourceNodes = async (
  {actions, createNodeId, createContentDigest, reporter},
  pluginOptions,
  done
) => {
  try {
    await verifyToken()

    const activities = await getActivities({
      debug: pluginOptions.debug,
      options: pluginOptions.activities,
    })

    if (activities && activities.length > 0) {
      activities.forEach(activity => {
        if (pluginOptions.activities.extend) {
          pluginOptions.activities.extend({activity})
        }

        actions.createNode({
          activity,
          id: createNodeId(`StravaActivity${activity.id}`),
          internal: {
            type: "StravaActivity",
            contentDigest: createContentDigest(activity),
          },
        })
      })
    }

    const athlete = await getAthlete({
      options: pluginOptions.athlete,
    })

    if (pluginOptions.athlete.extend) {
      pluginOptions.athlete.extend({activities, athlete})
    }

    actions.createNode({
      athlete,
      id: createNodeId(`StravaAthlete${athlete.id}`),
      internal: {
        type: "StravaAthlete",
        contentDigest: createContentDigest(athlete),
      },
    })

    done()
  } catch (e) {
    if (pluginOptions.debug) {
      reporter.panic(`source-strava: `, e)
    } else {
      reporter.panic(`source-strava: ${e.message}`)
    }

    done()
  }
}
