import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Recommend from "../../component/recommend";
function Search(props) {
  const [listData, setList] = useState([]);
  const historyAarry = useSelector(state => {
    return state.history;
  });
  useEffect(() => {
    setList(historyAarry);
  }, []);
  return <Recommend title={"足迹"} data={listData}></Recommend>;
}
export default Search;
