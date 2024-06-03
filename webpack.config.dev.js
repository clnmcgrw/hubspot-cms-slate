const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackProdConfig = require('./webpack.config');
const config = require('./project.config');

// generate a page listing index template
const getIndexTemplate = (pages, title = '') => {
  const pageList = pages.map(page => (
    `<li><a href="/${page.filename}">${page.title}</a></li>`
  )).join('');
  return (`
    <div>
      <h1>${config.theme.name} | ${title}</h1>
      <ul>${pageList}</ul>
    </div>
  `);
};

const hubspotPages = config.hubspot.pages.map(page => {
  return (typeof page === 'string') ? {
    title: page,
    template: `local/pages/${page}.html`,
    filename: `pages/${page}.html`,
  } : {
    title: page.title,
    template: `local/pages/${page.pathname}.html`,
    filename: `pages/${page.pathname}.html`,
    chunks: page.chunks ? ['main', ...page.chunks] : 'main',
  };
});

// TODO - get all sandbox page html webpack instances
// and generate listing index template
const sandboxPages = (() => {
  const template = fs.readFileSync('local/_template.html', { encoding: 'utf-8' });
  const files = fs.readdirSync(path.join(__dirname, 'local/sandbox'));
  console.log('sandbox files: ', files);
  return [];
});

module.exports = {
  ...webpackProdConfig,

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    ...hubspotPages.map(page => new HtmlWebpackPlugin(page)),
    new HtmlWebpackPlugin({
      title: 'HubSpot Page Listing',
      filename: `/pages/index.html`,
      templateContent: getIndexTemplate(hubspotPages, 'HubSpot Pages'),
    }),
  ],

  devServer: {
    hot: true,
    compress: true,
    open: {
      target: '/',
      app: {
        name: 'Chrome',
      },
    },
    client: {
      overlay: true,
      progress: true,
    },
  },
};
