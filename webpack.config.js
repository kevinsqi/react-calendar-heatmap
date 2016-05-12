const webpack = require('webpack');
const path = require('path');
const pak = require('./package.json');
const nodeEnv = process.env.NODE_ENV || 'development';

const webpackConfig = {
  context: __dirname,
  entry: {
    'react-calendar-heatmap': [
      path.resolve(__dirname, 'src', 'index.jsx')
    ]
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'index.js',
    library: 'CalendarHeatmap',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    })
  ]
};

if (nodeEnv === 'development') {
  webpackConfig.devtool = 'source-map';
  webpackConfig.debug = true;
  webpackConfig.devServer = { contentBase: './demo'};
  webpackConfig.entry['react-calendar-heatmap'].unshift('webpack-dev-server/client?http://0.0.0.0:8080/');
  webpackConfig.entry['react-calendar-heatmap'].push(path.resolve(__dirname, 'demo', 'demo.jsx'));
  webpackConfig.output.publicPath = '/';
}

if (nodeEnv === 'demo') {
  webpackConfig.entry['react-calendar-heatmap'].push(path.resolve(__dirname, 'demo', 'demo.jsx'));
  webpackConfig.output.path = path.resolve(__dirname, 'demo');
}

if (nodeEnv === 'development' || nodeEnv === 'demo') {
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'COMPONENT_NAME': JSON.stringify(pak.name),
    'COMPONENT_VERSION': JSON.stringify(pak.version),
    'COMPONENT_DESCRIPTION': JSON.stringify(pak.description)
  }));
}

if (nodeEnv === 'production') {
  webpackConfig.externals = {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  };
  webpackConfig.output.path = path.resolve(__dirname, 'build');
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    sourceMap: false
  }));
}

module.exports = webpackConfig;
