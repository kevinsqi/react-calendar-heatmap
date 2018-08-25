const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const plugins = [];

if (isProduction) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: false,
    }),
  );
}

module.exports = {
  context: __dirname,
  entry: {
    'react-calendar-heatmap': [path.resolve(__dirname, 'src', 'index.jsx')],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: isProduction ? 'index.min.js' : 'index.js',
    library: 'CalendarHeatmap',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
  plugins,
};
