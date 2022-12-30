const getUrlParameter = (field) => {
  let search = location.search
    .substring(1)
    .split('&')
    .reduce(function (res, a) {
      // разбираем пары ключ-значение
      let t = a.split('=');

      // нужно декодировать и ключ и значение, значения может не быть
      res[decodeURIComponent(t[0])] = t?.length === 1 ? null : decodeURIComponent(t[1]);
      return res;
    }, {});
  return search[field];
};

export default getUrlParameter;
