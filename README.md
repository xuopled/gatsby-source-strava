# gatsby-source-strava

[![Npm version][badge-npm]][npm]
[![Npm downloads][badge-npm-dl]][npm]
[![MIT license][badge-licence]](./LICENCE.md)
[![PRs welcome][badge-prs-welcome]](#contributing)

Gatsby plugin to use Strava as a data source

## Usage

1. Download `gatsby-source-strava` from the NPM registry:

```shell
yarn add gatsby-source-strava
```

2. Open a terminal at the root of your project and [Generate a token](./docs/token.md)

```shell
gatsby-source-strava-token
```

3. [Add the plugin](./docs/options.md) in your `gatsby-config.js` file

```js
module.exports = {
    plugins: ["gatsby-source-strava"],
}
```

That's it!

> For advanced configuration, please read [options](./docs/options.md) documentation.

## Showcase

You are using `gatsby-source-strava` for your website?
Thank you!

Please add your website to the [Showcase](./showcase.yml)

## Contributing

-   ⇄ Pull/Merge requests and ★ Stars are always welcome.
-   For bugs and feature requests, please [create an issue][github-issue].

## Changelog

See [CHANGELOG](./CHANGELOG.md)

## License

This project is licensed under the MIT License - see the
[LICENCE](./LICENCE.md) file for details

[badge-npm]: https://img.shields.io/npm/v/gatsby-source-strava.svg?style=flat-square
[badge-npm-dl]: https://img.shields.io/npm/dt/gatsby-source-strava.svg?style=flat-square
[badge-licence]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[badge-prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[npm]: https://www.npmjs.org/package/gatsby-source-strava
[github-issue]: https://github.com/cedricdelpoux/gatsby-source-strava/issues/new
