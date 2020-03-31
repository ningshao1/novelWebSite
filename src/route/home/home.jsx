import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Recommend from "../../component/recommend/index.jsx";
import axios from "../../axios/index.js";
import "../../less/search.less";
import "../../less/home.less";
function HomeNav() {
  const nav = [
    {
      name: "首页",
      path: ""
    },
    {
      name: "排行",
      path: "top"
    },
    {
      name: "全本",
      path: "over",
      backgroundPosition: "-30px -30px"
    },
    {
      name: "足迹",
      path: "history",
      backgroundPosition: "0 -30px"
    },
    {
      name: "书架",
      path: "bookrack",
      backgroundPosition: "-65px -28px"
    }
  ];
  return (
    <div className="home-nav">
      {nav.map(({ name, path }, i) => (
        <Link
          to={"/" + path}
          className={"nav-" + (path || "home") + " ignore"}
          key={i}
        >
          <i
            style={{
              marginBottom: "6px"
            }}
          ></i>
          {name}
        </Link>
      ))}
    </div>
  );
}
export default function Home() {
  const [listData, setList] = useState([]);
  const [columnData, setColumn] = useState([]);
  const [bookType, setBookType] = useState("仙侠");
  const [classifyData, setClassify] = useState([]);
  const [loadingStatus, setSatus] = useState(true);
  useEffect(() => {
    axios.get(`novels?page=0&count=6`).then(data => setList(data));
    axios.get(`novels?page=2&count=10`).then(data => setColumn(data));
  }, []);
  useEffect(() => {
    setSatus(true);
    axios.get(`novels/style/${bookType}?page=1&count=5`).then(data => {
      setClassify(data);
      setSatus(false);
    });
  }, [bookType]);
  return (
    <div>
      {/* <TopBar /> */}
      <HomeNav />
      <Recommend data={listData} type="row" title="热门推荐" />
      <Recommend
        data={columnData}
        type="column"
        title="热门小说"
        style={{ marginTop: "10px" }}
      />
      <Recommend
        data={classifyData}
        loadingStatus={loadingStatus}
        type="column"
        title="分类推荐"
        // headerExtra
        control
        style={{ marginTop: "10px" }}
        onValueChange={val => {
          setBookType(val);
        }}
      />
    </div>
  );
}
