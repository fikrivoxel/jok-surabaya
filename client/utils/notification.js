import Vue from 'vue';

export default function notification(opts) {
  if (_.has(opts, 'type')) {
    switch (opts.type) {
      case 'error':
      case 'err':
        opts.type = 'danger';
        break;
      case 'warn':
        opts.type = 'warning';
        break;
    }
  }
  let vm = new Vue();
  vm.$bvToast.toast(opts.message, {
    title: opts.title,
    variant: opts.type,
    solid: true,
    toaster: 'b-toaster-bottom-right',
    appendToast: true,
    autoHideDelay: 1500
  });
}
