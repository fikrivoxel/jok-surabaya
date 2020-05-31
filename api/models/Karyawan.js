const bcrypt = require('bcryptjs');

const empty = function (val) {
  return _.isEmpty(val) && !_.isNumber(val);
};

module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    nama_awal: {
      type: 'string',
      required: true
    },
    nama_akhir: {
      type: 'string',
      required: true
    },
    alamat: 'string',
    telepon: 'json',
    jabatan: {
      model: 'jabatan',
      required: true
    }
  },
  async beforeCreate(valSet, done) {
    try {
      let checkJabatan = await Jabatan.findOne({
        id: valSet.jabatan
      }).intercept(err => {
        return ErrorSrv(err);
      });
      if (_.isEmpty(checkJabatan)) {
        return done(
          ErrorSrv({
            code: 'E_JABATAN_NOT_FOUND',
            name: 'jabatanNotFound',
            message: 'Jabatan tidak ada'
          })
        );
      }
      let checkUsername = await Karyawan.findOne({
        username: valSet.username
      }).intercept(err => {
        return ErrorSrv(err);
      });
      if (!_.isEmpty(checkUsername)) {
        return done(
          ErrorSrv({
            code: 'E_USERNAME_FOUND',
            name: 'usernameFound',
            message: 'Username sudah digunakan'
          })
        );
      }
      valSet.password = await bcrypt.hash(valSet.password, 10);
      return done();
    } catch (err) {
      err = ErrorSrv(err);
      return done(err);
    }
  },
  async beforeUpdate(valSet, done) {
    try {
      if (!empty(valSet.jabatan)) {
        let checkJabatan = await Jabatan.findOne({
          id: valSet.jabatan
        }).intercept(err => {
          return ErrorSrv(err);
        });
        if (_.isEmpty(checkJabatan)) {
          return done(
            ErrorSrv({
              code: 'E_JABATAN_NOT_FOUND',
              name: 'jabatanNotFound',
              message: 'Jabatan tidak ada'
            })
          );
        }
      }
      if (!_.isEmpty(valSet.password)) {
        valSet.password = await bcrypt.hash(valSet.password, 10);
      }
      return done();
    } catch (err) {
      err = ErrorSrv(err);
      return done(err);
    }
  }
};
