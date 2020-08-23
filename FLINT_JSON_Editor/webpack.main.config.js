const CopyWebpackPlugin = require('copy-webpack-plugin');
const assets = [ 'Images', 'storage', 'css' ]; // asset directories
const path = require('path');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  // logo is copied in .webpack/main for mainWindow icon
  plugins: [new CopyWebpackPlugin({
    patterns: [{
      from:path.resolve(__dirname, 'src/Images/logo.png'),
      to: path.resolve(__dirname, '.webpack/main')
    }],
  })]

};
