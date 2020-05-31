export default {
  async checkUsername(data) {
    let {$axios} = $nuxt;
    try {
      await $axios.$post('/authorization/check-username', data);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
