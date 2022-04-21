var appRoot = require('app-root-path');
var winston = require('winston');
var path = require('path');
var PROJECT_ROOT = path.join(__dirname, '..');

var options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },

  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

var logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false,
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

function formatLogArguments(args) {
  args = Array.prototype.slice.call(args)

  var stackInfo = getStackInfo(1);

  if (stackInfo) {
    var calleStr = '(' + stackInfo.relativePath + ':' + stackInfo.line + ')';

    if (typeof (args[0] === 'string')) {
      args[0] = calleStr + ' ' + args[0];
    } else {
      args.unshift(calleStr);
    }
  }

  return args;
}

function getStackInfo(stackIndex) {
  var stacklist = (new Error()).stack.split('\n').slice(3);

  var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
  var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi

  var s = stacklist[stackIndex] || stackList[0]
  var sp = stackReg.exec(s) || stackReg.exec(s)

  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(PROJECT_ROOT, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stacklist.join('\n')
    }
  }
}

module.exports.debug = module.exports.log = function () {
  logger.debug.apply(logger, formatLogArguments(arguments));
}

module.exports.debug = module.exports.log = function () {
  logger.info.apply(logger, formatLogArguments(arguments));
}

module.exports.debug = module.exports.log = function () {
  logger.warn.apply(logger, formatLogArguments(arguments));
}

module.exports.debug = module.exports.log = function () {
  logger.error.apply(logger, formatLogArguments(arguments));
}

module.exports.stream = logger.stream;