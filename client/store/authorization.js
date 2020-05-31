import Authorization from '@/api/authorization';

const initState = {
  token: '',
  karyawan: {
    username: '',
    nama_awal: '',
    nama_akhir: '',
    alamat: '',
    telepon: '',
    jabatan: {}
  },
  menu: []
};

export const state = () => initState;

export const getters = {
  token(state) {
    return state.token;
  },
  karyawan(state) {
    return state.karyawan;
  },
  menu() {
    return state.menu;
  }
};

export const mutations = {
  setToken(state, payload) {
    state.token = payload;
  },
  removeToken(state) {
    state.token = initState.token;
  },
  setKaryawan(state, payload) {
    state.karyawan = _.pick(payload, [
      'username',
      'nama_awal',
      'nama_akhir',
      'alamat',
      'telepon',
      'jabatan'
    ]);
  },
  removeKaryawan(state) {
    state.karyawan = initState.karyawan;
  },
  setMenu(state, payload) {
    state.menu = payload;
  },
  removeMenu(state) {
    state.menu = initState.menu;
  },
  removeState(state) {
    state.token = initState.token;
    state.karyawan = initState.karyawan;
    state.menu = initState.menu;
  }
};

export const actions = {
  async checkUsername(_store, data) {
    try {
      await Authorization.checkUsername(data);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
