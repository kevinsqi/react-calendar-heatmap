module.exports = {
  cache: true,
  entry: './demo.jsx',
  output: {
    path: __dirname,
    filename: 'demo.build.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};
