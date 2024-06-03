const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../../project.config');

const argv = yargs(hideBin(process.argv)).argv;
const baseUrl = argv.qa ? config.domains.qa : config.domains.prod;
const findPage = pathname => config.hubspot.pages.filter(
  page => page === pathname || page.pathname === pathname
);
const localPages = argv.page ? findPage(argv.page) : config.hubspot.pages;

const template = fs.readFileSync('local/_template.html', {
  encoding: 'utf-8',
});

const saveHtmlFile = (path, html) => new Promise((resolve, reject) => {
  fs.writeFile(path, html, err => err ? reject(err) : resolve());
});

const syncPage = async ({ url, filename, append }) => {
  const { data } = await axios.get(`${baseUrl}${url}?v=${Math.random()}`);
  const $ = cheerio.load(data);
  $('script:not([type="application/json"])').remove();

  if (append) {
    $('body').append(append);
  }

  const htmlBody = $('body').prop('outerHTML');
  const pageHtml = template.replace('<!-- body -->', htmlBody);
  await saveHtmlFile(`local/pages/${filename}`, pageHtml);
};

localPages.forEach(async (page) => {
  try {
    await syncPage(page);
    console.log(`✅ Copied ${page.title || page} to local/${page.filename}`);
  } catch (e) {
    console.log(`Problem fetching ${page.title || page}`);
  }
});
