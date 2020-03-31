import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Recommend from "../../component/recommend";
function Search(props) {
  const [listData, setList] = useState([]);
  const historyAarry = useSelector(state => {
    return state.bookrack;
  });
  useEffect(() => {
    setList(historyAarry);
  }, [historyAarry]);
  return <Recommend title={"我的书架"} data={listData}></Recommend>;
}
export default Search;
