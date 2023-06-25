export const GetDate = (item) => {
  var timeStamp = item * 1000;
  var date = new Date(timeStamp);
  var year = date.getFullYear().toString();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  return year + "." + month + "." + day;
};

export const getBoardType = (id) => {
  return null;
};
