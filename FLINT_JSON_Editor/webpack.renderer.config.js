const rules = require('./webpack.rules');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const assets = [ 'Images', 'storage', 'css' ]; // asset directories
const path = require('path');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  // plugins: assets.map(asset => {
  //   return new CopyWebpackPlugin({
  //     patterns: [{
  //       from: path.resolve(__dirname, 'src', asset),
  //       to: path.resolve(__dirname, '.webpack/renderer/main_window', asset)
  //     }],
  //   });
  // })
};
