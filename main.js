const startServer = require('./startServer');
const args = require('yargs')
  .usage('Usage: node $0 [-i interval] [-t timeout]')
  .options({
    interval: {
      alias: 'i',
      describe: 'Timer interval (ms)',
      default: '1000'
    },
    timeout: {
      alias: 't',
      describe: 'Connection timeout (ms)',
      default: '5000'
    }
  }).argv;

startServer(args);
