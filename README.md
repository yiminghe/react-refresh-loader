# react-refresh-loader

webpack loader for react-refresh: https://github.com/facebook/react/issues/16604

[![NPM version][npm-image]][npm-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/react-refresh-loader.svg?style=flat-square
[npm-url]: http://npmjs.org/package/react-refresh-loader
[travis-image]: https://img.shields.io/travis/yiminghe/react-refresh-loader.svg?style=flat-square
[travis-url]: https://travis-ci.org/yiminghe/react-refresh-loader
[coveralls-image]: https://img.shields.io/coveralls/yiminghe/react-refresh-loader.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yiminghe/react-refresh-loader?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/yiminghe/react-refresh-loader.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/yiminghe/react-refresh-loader
[node-image]: https://img.shields.io/badge/node.js-%3E=10.0.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/react-refresh-loader.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-refresh-loader



## example

checkout [example](./example)

## usage

webpack config:

```js
const ReactRefreshLoader = require('react-refresh-loader');
module.exports = {
	module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [

        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [require("react-refresh/babel")]
          }
        },
        {
          loader: ReactRefreshLoader.path(),
        }
        ]
      }
    ]
  },
  plugins: [
    new ReactRefreshLoader.Plugin(),
  ]
}
```

## history

### 0.2.0 / 2019-12-17
- add plugin

### 0.1.0
- add loader
