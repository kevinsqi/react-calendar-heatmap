module.exports = {
  context: __dirname,
  entry: {
    'react-calendar-heatmap': [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      './src/index.jsx'
    ]
  },
  output: {
    path: './build',
    filename: 'index.js',
    library: 'CalendarHeatmap',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      }
    ]
  }
};
