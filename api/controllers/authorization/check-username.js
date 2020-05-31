module.exports = {
  inputs: {
    username: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'ok'
    },
    badRequest: {
      responseType: 'resBadRequest'
    },
    serverError: {
      responseType: 'resServerError'
    }
  },
  async fn(inputs, exits) {
    try {
      let checkUsername = await Karyawan.findOne({
        username: inputs.username
      }).intercept(err => {
        return ErrorSrv(err);
      });
      if (!_.isEmpty(checkUsername)) {
        return exits.badRequest(
          ErrorSrv({
            code: 'E_USERNAME_FOUND',
            name: 'usernameFound',
            message: 'Username sudah ada'
          })
        );
      }
      return exits.success({
        success: true
      });
    } catch (err) {
      err = ErrorSrv(err);
      return exits.serverError(err);
    }
  }
};
