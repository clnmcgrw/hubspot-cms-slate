const cp = require('child_process');
const config = require('../..project.config');
const { argv } = require('../utils');

const cmd = `hs upload src ${config.theme.folder} --account=${argv.account || 'qa'}`;
cp.exec(cmd, (error, stdout, stderror) => {
  console.log({ error, stdout, stderror });
});