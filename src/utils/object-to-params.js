export default objectData => {
  let str = '';

  for (let key in objectData) {
    if (objectData[key]) {
      const value = encodeURIComponent(objectData[key]);
      if (value) {
        if (str !== '') str += '&';
        str += `${key}=${value}`;
      }
    }
  }
  return str;
};
