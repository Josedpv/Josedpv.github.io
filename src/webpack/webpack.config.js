const path = require('path');
const webpackConfig = {
  target: 'node',
  node: {
    fs: 'empty',
}
};
module.exports = webpackConfig;
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',   node: {
    child_process: 'empty',
    fs: 'empty',
    crypto: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../client'),
  }, plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/client/template.html',
        //hash: true
    })],
  devServer: {
    contentBase: path.join(__dirname, './src/client'),
    compress: true,
    port: 9000
  }
};