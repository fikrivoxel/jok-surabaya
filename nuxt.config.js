const webpack = require('webpack');

module.exports = {
  mode: 'spa',
  srcDir: 'client/',
  head: {
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
      },
      {'http-equiv': 'X-UA-Compatible', content: 'ie=edge'}
    ]
  },
  loading: {},
  router: {
    middleware: []
  },
  css: [],
  plugins: [],
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    'vue-sweetalert2/nuxt'
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  axios: {
    https: false,
    prefix: '/api'
  },
  build: {
    extractCSS: true,
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        '_': 'lodash',
        'moment': 'moment'
      })
    ]
  },
  dev: process.env.NODE_ENV === 'development'
};
