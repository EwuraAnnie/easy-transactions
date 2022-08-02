exports.getDate = () => {
  let date = new Date().toISOString();
  date = date.split("T")[0];
  return date;
};
