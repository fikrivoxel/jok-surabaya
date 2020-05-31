const files = require.context('.', false, /\.js$/);
const utils = {};

files.keys().forEach((fileName) => {
  if (fileName === './index.js') {
    return;
  }
  let name = (() => {
    let fileNameArray = fileName.replace(/(\.\/|\.js)/g, '').split('-');
    return fileNameArray.map((n, i) => {
      if (i > 0) {
        return _.capitalize(n);
      }
      return n;
    }).join('');
  })();
  utils[name] = files(fileName).default;
});

export default utils;
