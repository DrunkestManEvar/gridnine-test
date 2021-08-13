const getCityName = (object, cityKeyName) => {
  let city = object[cityKeyName]?.caption ?? '';
  if (city) city += ', ';
  return city;
};

export default getCityName;
