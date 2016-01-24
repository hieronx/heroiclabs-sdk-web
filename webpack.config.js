module.exports = {
  entry: [
    'babel-polyfill',
    __dirname + '/src/client.js'
  ],
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: 'heroiclabs-sdk.js',
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        test: /\.js$/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0'],
        }
      }, {
        loader: 'eslint-loader',
        exclude: /node_modules/,
        test: /\.js$/
      }
    ]
  }
};
