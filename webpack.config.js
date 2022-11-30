const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  mode: 'development', // 开发环境
  entry: './src/index.js', //打包的入口
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    port: 3001, // 服务端口
    static: {
      directory: path.join(__dirname, '/')
    },
    compress: true,
    open: true // 是否自动打开浏览器
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html')
    }),
    new CleanWebpackPlugin()
  ]
}
