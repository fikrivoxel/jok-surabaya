export default function axios({store, $axios, app: {$utils}}) {
  $axios.onError(err => {
    err = $utils.error(err);
    let token = store.getters['authorization/token'];
    if (err.status === 401 && !_.isEmpty(token)) {
      store.commit('authorization/removeState');
    }
    return Promise.resolve(err);
  });
}
