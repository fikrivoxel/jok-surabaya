const initOpts = {
  code: 'E_ERROR',
  name: 'Error',
  status: null,
  message: 'Error with unknown'
};

export default function error(opts = {}, err = new Error()) {
  let reOpts = {};
  if (_.isEmpty(err) || !_.isError(err)) {
    err = new Error();
  }
  if (_.isString(opts)) {
    _.extend(reOpts, initOpts, {
      message: opts
    });
  } else if (_.isObject(opts) && !_.isArray(opts)) {
    if (_.has(opts, 'response')) {
      let {response: {data, status}} = opts;
      if (_.isString(data)) {
        _.extend(reOpts, initOpts, {
          message: data
        });
      } else if (_.isObject(data) && !_.isArray(data)) {
        _.extend(reOpts, {
          code: _.has(data, 'code') && !_.isEmpty(data.code) ? data.code : initOpts.code,
          name: _.has(data, 'name') && !_.isEmpty(data.name) ? data.name : initOpts.name,
          status,
          message: _.has(data, 'message') && !_.isEmpty(data.message) ? data.message : initOpts.message,
        });
      } else {
        _.extend(reOpts, initOpts, {
          status,
          message: `Error with status ${status}`,
        });
      }
    } else if (_.has(opts, 'request')) {
      let {request: {status}} = opts;
      _.extend(reOpts, initOpts, {
        status,
        message: `Error with status ${status}`,
      });
    } else {
      _.extend(reOpts, {
        code: _.has(opts, 'code') && !_.isEmpty(opts.code) ? opts.code : initOpts.code,
        name: _.has(opts, 'name') && !_.isEmpty(opts.name) ? opts.name : initOpts.name,
        status: null,
        message: _.has(opts, 'message') && !_.isEmpty(opts.message) ? opts.message : initOpts.message,
      });
    }
  } else {
    _.extend(reOpts, initOpts);
  }
  _.extend(err, reOpts);
  return err;
}
