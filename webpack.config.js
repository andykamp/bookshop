var path = require('path');

const webpack = require('webpack');

module.exports = {
  entry: './src/client.js', //path for our app.js
  output: {
    filename: 'bundle.js', //
    path: path.resolve(__dirname, 'public')
  },
  watch: true, //everytime we save our change lunket to app.js webpack will recompile the bundle automaticly
  module:{
    loaders: [
      {
        test:/\.js$/, //tell webpack to scan all  .js files
        exclude:/node-modules/, //prevent long compile time we want to exclude all files inside node.modules
        loader: 'babel-loader',
        query:{
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  }
}
