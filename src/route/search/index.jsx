import React, { useEffect, useState } from "react";
import Recommend from "../../component/recommend";
import axios from "../../axios";
function Search(props) {
  const {
    match: {
      params: { query }
    }
  } = props;
  const [listData, setList] = useState([]);
  useEffect(() => {
    axios
      .get(`search?bookname=${query}&author=${query}&count=40`)
      .then(data => {
        const chooseData = data.map(item => ({
          ...item
        }));
        setList(chooseData);
      });
  }, [query]);
  return (
    <Recommend title={'搜索  "' + query + '"  结果'} data={listData}>
      {/* <List extra data={listData} loading={loading} jump /> */}
    </Recommend>
  );
}
export default Search;
