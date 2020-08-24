const path = require('path');

module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.js$|\.jsx$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  // {
  //   test: /\.(png|jpe?g|gif|svg)$/i,
  //   use: [
  //     {
  //       loader: 'file-loader',
  //       options: {
  //         // outputPath: '/main_window'
  //         // publicPath: '../'
  //       }
  //     },
  //   ],
  // },
  // url-loader is used instead of file-loader to smoothen packaging of app 
  {
    test: /\.(png|jpg|gif|svg)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          // limit: 8192,
        },
      },
    ],
  },
  // Put your webpack loader rules in this array.  This is where you would put
  // your ts-loader configuration for instance:
  /**
   * Typescript Example:
   *
   * {
   *   test: /\.tsx?$/,
   *   exclude: /(node_modules|.webpack)/,
   *   loaders: [{
   *     loader: 'ts-loader',
   *     options: {
   *       transpileOnly: true
   *     }
   *   }]
   * }
   */
];
