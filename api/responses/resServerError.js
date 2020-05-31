module.exports = function resNotFound(data) {
  let res = this.res;
  let statusCode = 500;
  if (_.isEmpty(data)) {
    sails.log.warn(`Error with ${statusCode} : with unknown response`);
    return res.sendStatus(statusCode);
  } else if (_.isError(data)) {
    if (_.has(data, 'toJSON') && _.isFunction(data.toJSON)) {
      sails.log.warn(`Error with ${statusCode} : ${data.toJSON()}`);
      return res.status(statusCode).send(data.toJSON());
    } else {
      sails.log.warn(`Error with ${statusCode} : ${data}`);
      return res.status(statusCode).send(data);
    }
  } else {
    sails.log.warn(`Error with ${statusCode} : ${data}`);
    return res.status(statusCode).send(data);
  }
};
