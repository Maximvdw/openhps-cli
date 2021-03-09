const TerserPlugin = require('terser-webpack-plugin');
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");

const PROJECT_NAME = "openhps-<%=projectName%>";
const LIBRARY_NAME = "@openhps/<%=projectName%>";

const path = require('path');

module.exports = env => [
  {
    name: PROJECT_NAME,
    mode: env.prod ? "production" : "development",
    entry: `./dist/cjs/index.js`,
    devtool: 'source-map',
    externals: ['@openhps/core'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `web/${PROJECT_NAME}${env.prod ? ".min" : ""}.${env.module ? 'mjs' : 'js'}`,
      library: LIBRARY_NAME,
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: `(typeof self !== 'undefined' ? self : this)`,
    },
    resolve: {
      alias: {
        typescript: false,
      },
      fallback: {
        path: false,
        fs: false,
        os: false,
      }
    },
    optimization: {
      minimize: env.prod,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            keep_classnames: true,
          }
        })
      ],
      portableRecords: true,
      usedExports: true,
      providedExports: true
    },
    performance: {
      hints: false,
      maxEntrypointSize: 300000,
      maxAssetSize: 300000
    }
  }
];
