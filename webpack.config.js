var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/app.js',
    plurkForm: './src/form.js'
  },
  output: {
    path: path.resolve(__dirname, './out'),
    publicPath: '/out/',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue',
      options: {
        // vue-loader options go here
      }
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.css$/,
      loader: 'style!css?sourceMap'
    }, {
      test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
      loader: 'url-loader'
    }]
  },
  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['.vue', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'vue-router$': 'vue-router/dist/vue-router.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map',
  target: 'electron'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
