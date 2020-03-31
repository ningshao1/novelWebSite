import React, { useState, useEffect } from "react";
import Recommend from "../../component/recommend";
import CatalogList from "../../component/List";
import axios from "../../axios";
export default function CataLog(props) {
  const {
    match: {
      params: { id, title }
    }
  } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("倒序");
  useEffect(() => {
    setLoading(true);
    axios.get(`novel/${id}`).then(data => {
      setData(data.chapterList);
      setLoading(false);
    });
  }, [id]);
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          fontSize: "2.5vw",
          color: "#969ba3",
          position: "absolute",
          right: "25px",
          top: "10px",
          zIndex: 1
        }}
        onClick={() => {
          setData([...data.reverse()]);
          order === "正序" ? setOrder("倒序") : setOrder("正序");
        }}
      >
        {order}
      </div>
      <Recommend title={`《${title}》目录`}>
        <CatalogList loading={loading} data={data} jump={true} />
      </Recommend>
    </div>
  );
}
