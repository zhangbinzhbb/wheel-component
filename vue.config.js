const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
        plugins: [
          new CleanWebpackPlugin()
        ],
        output: {
          libraryExport: 'umd'
        },
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
  },
  css: {
    loaderOptions: {
      sass: {
        includePaths: [path.join(__dirname, 'styles')]
      }
    }
  }
}