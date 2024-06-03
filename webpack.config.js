const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HubSpotAutoUploadPlugin = require('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { log, argv } = require('./cli/utils');
const config = require('./project.config');

const uploadOptions = {
  portal: process.env.PORTAL || 'qa',
  autoupload: process.env.AUTOUPLOAD,
  src: config.dist,
  dest: config.theme.parentFolder,
};

const local = argv.config && argv.config.includes('.dev');
if (local) {
  log(`🚀 Local development server starting...`);
} else if (uploadOptions.autoupload) {
  log(`🚀 Syncing files to ${uploadOptions.portal} portal...`);
} else {
  log(`📦 Building project...`);
}

module.exports = {
  entry: {
    main: './assets/index.ts',
  },
  output: {
    path: path.resolve(__dirname, uploadOptions.src),
    filename: 'assets/[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HubSpotAutoUploadPlugin(uploadOptions),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/'), to: '' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        include: path.resolve(__dirname, 'assets/scripts'),
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'assets/styles'),
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									['postcss-preset-env', {}],
								],
							},
						},
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './node_modules'),
    ],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@assets': path.resolve(__dirname, './assets/'),
    },
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
};
