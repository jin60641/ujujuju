const webpack = require('webpack');
const path = require('path');
const WebSocket = require('ws');
const chokidar = require('chokidar');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST = 'dist';

/**
 * [createConfig description]
 * HTML 뿐만 아니라 CSS, confirm 등 JS도 포함하여 동적으로 구성될 수 있도록
 * 기존에 작성한 코드를 기준으로 각 언어별 html, js로 추가 제작해주는 함수.
 * @param  {string} lang 언어의 Key 값
 * @return {Object}      webpack configuration object를 넘겨줌.
 */
const createConfig = () => {
  const config = {
    mode: 'development',
    devtool: 'cheap-eval-source-map',

    entry: [
      path.join(__dirname, 'src/index.js'),
    ],
    output: {
     
      filename: `${DIST}/app.js`,
      path: __dirname + '/build',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src/css'),
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif|mp3|wav|woff|eot)$/,
          include: [
            path.resolve(__dirname, 'musics'),
            path.resolve(__dirname, 'images'),
            path.resolve(__dirname, 'src/fonts'),
          ],
          use: [
            'file-loader',
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            interpolate: true,
          },
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
      }),

      new HtmlWebpackPlugin({
        template: 'public/index.html',
        filename: 'index.html',
        inject: true,
        minify: {
         
          removeComments: true,
          collapseWhitespace: false,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
          },
      }),
    ],
    resolve: {
      modules: [
       
        path.resolve(__dirname, 'src'),
        'node_modules',
      ],
      enforceExtension: false,
    },
  };

  const LiveReloadPlugin = require('webpack-livereload-plugin');
  config.plugins = [
    ...config.plugins,
    new LiveReloadPlugin({
      appendScriptTag: true,
    }),
  ];

  return config;
};

module.exports = createConfig();

module.exports.serve = {
  content: [__dirname],
  hot: {
    host: 'localhost',
    port: 8090,
  },
  on: {
    listening(server) {
      const socket = new WebSocket('ws://localhost:8090');
      const watchPath = __dirname;
      const options = {};
      const watcher = chokidar.watch(watchPath, options);

      watcher.on('change', () => {
        const data = {
          type: 'broadcast',
          data: {
            type: 'window-reload',
            data: {},
          },
        };

        socket.send(stringify(data));
      });
      console.log(server.listening,server.on);
      server.on.listening('close', () => {
        watcher.close();
      });
    },
  },
};
