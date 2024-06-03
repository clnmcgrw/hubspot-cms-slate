require('dotenv').config();
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const axios = require('axios');
const { getPortalId } = require('@hubspot/cli-lib');
const color = require('cli-color');
const config = require('./config');

const argv = yargs(hideBin(process.argv)).argv;

const portalIds = {
  qa: getPortalId('qa'),
  prod: getPortalId('prod'),
};

const logColorVariants = {
  default: color.xterm(15),
  warning: color.xterm(220),
  error: color.xterm(196),
  success: color.xterm(40),
};

const log = (message, variant = 'default') => {
  const colorize = logColorVariants[variant];
  console.log(colorize(message));
};

const accessToken = argv.prod ?
  process.env.HUBSPOT_ACCESS_TOKEN_PROD : 
  process.env.HUBSPOT_ACCESS_TOKEN_QA;

const hsClient = axios.create({
  baseURL: config.API_BASE,
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});

module.exports = {
  argv,
  portalIds,
  log,
  hsClient,
};
