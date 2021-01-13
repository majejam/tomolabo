const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pages = ['sh-1', 'sh-2', 'sh-3', 'ps-1', 'ps-2', 'ps-3', 'ps-4', 'ps-5', 'ps-6']

let pagesPlugins = pages.map(name => {
  return new HtmlWebpackPlugin({
    template: path.resolve(__dirname, `../src/pages/${name}.html`), // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
  })
})

module.exports = {
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([{ from: 'static' }]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      chunks: [`main`],
    }),
  ].concat(pagesPlugins),
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.glsl$/,
        use: ['webpack-glsl-loader'],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(woff2|woff|otf|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
}
