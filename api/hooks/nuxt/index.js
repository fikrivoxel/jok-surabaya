const {Nuxt, Builder} = require('nuxt');

module.exports = function (sails) {
  let nuxt;
  return {
    async initialize(done) {
      if (_.isEmpty(process.env.API_PORT)) {
        process.env.API_PORT = sails.config.port;
      }
      if (_.isEmpty(process.env.API_HOST)) {
        if (sails.config.explicitHost) {
          process.env.API_HOST = sails.config.explicitHost;
        }
      }
      nuxt = new Nuxt(sails.config[this.configKey]);
      if (nuxt.options.dev) {
        try {
          await new Builder(nuxt).build();
        } catch (err) {
          return done(err);
        }
      }
      sails.nuxt = nuxt;
      return done();
    },
    routes: {
      after: {
        '*': {
          skipRegex: /^\/api\/.*$/,
          fn(req, res) {
            return nuxt.render(req, res);
          }
        }
      }
    }
  };
};
