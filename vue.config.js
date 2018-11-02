const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        store: 'store2'
      })
    ]
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/realNet':{
        //target:''
          target:'http://bin-go.me:9112'
      },       
    },
     /* eslint-disable */
    https: false,
    hotOnly: false
  }
}
