module.exports = {
  attributes: {
    nama: {
      type: 'string',
      required: true
    },
    flag: {
      type: 'string',
      required: true
    },
    karyawan: {
      collection: 'karyawan',
      via: 'jabatan'
    }
  }
};
