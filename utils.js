export const GetDate = (item) => {
  var timeStamp = item * 1000;
  var date = new Date(timeStamp);
  var year = date.getFullYear().toString();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  return year + "." + month + "." + day;
};

const boardId = async () => {
  const data = await fetch(
    "https://forum.nexon.com/api/v1/community/maplestorym?alias=maplestorym&countryCode=kr"
  ).then((response) => response.json());
  const board = {};
  data.boards.map((item) => {
    board[item.boardId] = item.title;
  });
  console.log(board);
};

boardId();

export const getBoardType = (id) => {
  return null;
};
