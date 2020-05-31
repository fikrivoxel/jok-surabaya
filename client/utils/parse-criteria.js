export default function parseCriteria(criteria) {
  let re = {};
  _.forEach(criteria, (val, key) => {
    re[key] = encodeURIComponent(val);
  });
  return re;
}
