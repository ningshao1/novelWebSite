const initialState = {
  history: JSON.parse(localStorage.getItem("history")) || [],
  bookrack: JSON.parse(localStorage.getItem("bookrack")) || [],
  reading: JSON.parse(localStorage.getItem("reading")) || []
};
//设置历史记录
function setHistory(localData, data) {
  var { history } = localData;
  if (history && Array.isArray(history)) {
    //只保存20条
    if (history.length >= 20) {
      history.shift();
    }
    const index = history.findIndex(({ id }) => id === data.id);
    if (index >= 0) {
      history.splice(index, 1);
    }
    history.unshift(data);
  } else {
    history = [data];
  }
  localStorage.setItem("history", JSON.stringify(history));
  return { ...localData, history };
}
//添加书架
function addBookrack(localData, data) {
  var { bookrack } = localData;
  if (bookrack && Array.isArray(bookrack)) {
    //只保存20条
    if (bookrack.length >= 20) {
      bookrack.shift();
    }
    const index = bookrack.findIndex(({ id }) => id === data.id);
    if (index >= 0) {
      bookrack.splice(index, 1);
    }
    bookrack.unshift(data);
  } else {
    bookrack = [data];
  }
  localStorage.setItem("bookrack", JSON.stringify(bookrack));
  return { ...localData, bookrack };
}
//移除书架
function delBookrack(localData, data) {
  debugger;
  var { bookrack } = localData;
  const currentIndex = bookrack.findIndex(item => item.id === data.id);
  if (currentIndex >= 0) {
    bookrack.splice(currentIndex, 1);
    localStorage.setItem("bookrack", JSON.stringify(bookrack));
  }
  return {
    ...localData,
    bookrack
  };
}
//记录已经阅读的信息
function addReading(localData, data) {
  var { reading } = localData;
  if (reading && Array.isArray(reading)) {
    //只保存100条
    if (reading.length >= 100) {
      reading.shift();
    }
    const index = reading.findIndex(({ bookid }) => bookid === data.bookid);
    if (index >= 0) {
      reading.splice(index, 1);
    }
    reading.unshift(data);
  } else {
    reading = [data];
  }
  localStorage.setItem("reading", JSON.stringify(reading));
  return { ...localData, reading };
}
export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_HISTORY":
      return setHistory(state, action.data);
    case "ADD_BOOKRACK":
      return addBookrack(state, action.data);
    case "DEL_BOOKRACK":
      return delBookrack(state, action.data);
    case "ADD_READ":
      return addReading(state, action.data);
    default:
      return state;
  }
}
