const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/script.js', // Точка входа для сборки проекта

  output: {
    filename: 'bundle.js', // Имя выходного файла сборки
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/images/[name][ext]' // Путь для выходного файла сборки
  },

  module: {
    rules: [
      {
        test: /.css$/, // Регулярное выражение для обработки файлов с расширением .css
        use: ['style-loader', 'css-loader'], 
        // Загрузчики, используемые для обработки CSS-файлов
      },
      {
        test: /.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
  },

  mode: 'development', // Режим сборки
};