const getDate = dateString => {
  const date = dateString.split('-');

  return new Date(date[2], date[0] - 1, date[1]);
};

export default getDate;
