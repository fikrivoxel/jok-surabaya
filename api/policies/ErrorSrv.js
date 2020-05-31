const flaverr = require('flaverr');

const initOpts = {
  code: 'E_SERVER_ERROR',
  name: 'serverError',
  message: 'Server Error'
};

module.exports = function (opts = {}, err = new Error()) {
  let reOpts = {};
  if (_.isEmpty(err) || !_.isError(err)) {
    err = new Error();
  }
  if (_.isString(opts)) {
    _.extend(reOpts, initOpts, {
      message: opts
    });
  } else if (_.isObject(opts) && !_.isArray(opts)) {
    _.extend(reOpts, {
      code: _.has(opts, 'code') && !_.isEmpty(opts.code) ? opts.code : initOpts.code,
      name: _.has(opts, 'name') && !_.isEmpty(opts.name) ? opts.name : initOpts.name,
      message: _.has(opts, 'message') && !_.isEmpty(opts.message) ? opts.message : initOpts.message
    });
  } else {
    _.extend(reOpts, initOpts);
  }
  let flr = flaverr(reOpts, err);
  flr.toJSON = function () {
    return _.pick(flr, [
      'code', 'name', 'message'
    ]);
  };
  return flr;
};
