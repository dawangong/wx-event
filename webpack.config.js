const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/event',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'event.min.js',
    // 支持script
    library: 'event',
    // 支持require|import
    // libraryTarget: "umd",
    libraryTarget: "var",
    umdNamedDefine: true,
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, './node_modules'),
        include: path.resolve(__dirname, './src')
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: true, // 模拟删除
      verbose: true, // 写入日志
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "dist")]
    }),
    new EsmWebpackPlugin()
  ]
};
