import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

const ls = new SecureLS({isCompression: true});

export default function vuexPersistedState({store}) {
  createPersistedState({
    key: 'backoffice',
    paths: ['authorization.token'],
    storage: {
      getItem: key => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: key => ls.remove(key)
    }
  })(store);
}
