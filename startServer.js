const http = require('http');
const port = 3000;

/**
 * @returns {string} - Current time in UTC string format + milliseconds
 */
function now () {
  let date = new Date();
  return date.toUTCString() + ` (${date.getTime()})`;
}

/**
 * Creates web server and starts listening
 *
 * @param options - Options object
 * @param options.interval - Interval between log messages in milliseconds
 * @param options.timeout - Time before finishing request processing
 */
module.exports = function (options) {
  let connections = 0;

  const server = http.createServer((request, response) => {
    if (request.url !== '/') {
      response.statusCode = 404;
      response.end();
      return;
    }

    connections++;
    let num = connections;

    console.log(`CONNECTION ${num} OPENED`);

    let logInterval = setInterval(() => {
      console.log(`CONNECTION ${num}: ${now()}`);
    }, +options.interval);

    setTimeout(() => {
      clearInterval(logInterval);
      response.end(now());
      console.log(`CONNECTION ${num} CLOSED`);
    }, +options.timeout);
  });

  server.listen(port, err => {
    if (err) {
      console.log(err.toString());
      process.exit(-1);
    }

    console.log(`Server is listening on ${port}`);
  });
};
