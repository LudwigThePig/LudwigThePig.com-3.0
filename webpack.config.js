require('dotenv');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const environment = (process.env.NODE_ENV || 'development').trim();


module.exports = {
  entry: {
    main: './src/index.js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'public', 'js'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          },
        },
      },
    ],
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(), // Uncomment and restart webpack to get a bundle.js report
  ],
};
