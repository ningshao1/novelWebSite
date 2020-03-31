import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Toast } from "antd-mobile";
import Recommend from "../../component/recommend";
import axios from "./../../axios/index";
import "../../less/chapter.less";
import CatalogList from "../../component/List";
export default function Chapter(props) {
  const {
    match: {
      params: { id }
    }
  } = props;
  const [chapterInfo, setChapterInfo] = useState({});
  const [chapter, setChapter] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth, cover, title, status, style, introduction } = chapterInfo;
  const dispatch = useDispatch();
  const reading = useSelector(state => state.reading);
  const bookrack = useSelector(state => state.bookrack);
  const currentInfo = reading.find(item => id === item.bookid);
  const currentBookrack = bookrack.find(item => id === item.id);
  const [booktrackName, setName] = useState(
    currentBookrack ? "取消加入" : "加入书架"
  );

  useEffect(() => {
    setLoading(true);
    axios.get(`/novel/${id}`).then(data => {
      setChapterInfo(data.data);
      setChapter(data.chapterList.slice(-10).reverse());
      setLoading(false);
      dispatch({
        type: "ADD_HISTORY",
        data: data.data
      });
    });
  }, [id]);
  useEffect(() => {}, []);
  return (
    <div className="chapter">
      <div className="chapter-info">
        <div className="chapter-img">
          <img
            src={cover}
            alt=""
            onError={e => {
              e.currentTarget.src = require("../../asset/cover.png");
            }}
          />
        </div>
        <div className="chapter-right">
          <h1>{title}</h1>
          <p>作者：{auth}</p>
          <p>分类：{style}</p>
          <p>状态：{status}</p>
        </div>
      </div>
      <div className="book-detail-btn">
        <Button
          type="warning"
          onClick={() => {
            var chapter = 1;
            if (currentInfo) chapter = currentInfo.chapter_id;
            props.history.push(`/detail/${id}/${chapter}`);
          }}
        >
          {currentInfo ? "继续阅读" : "开始阅读"}
        </Button>
        <Button
          onClick={() => {
            props.history.push(`/catalog/${id}/${title}`);
          }}
        >
          章节目录
        </Button>
        <Button
          onClick={() => {
            if (loading) {
              Toast.info("数据还在加载，请稍后添加");
              return;
            }
            debugger;
            if (currentBookrack) {
              dispatch({
                type: "DEL_BOOKRACK",
                data: currentBookrack
              });
              Toast.info("取消成功", 2);
              setName("加入书架");
            } else {
              dispatch({
                type: "ADD_BOOKRACK",
                data: chapterInfo
              });
              Toast.info("加入成功", 2);
              setName("取消加入");
            }
          }}
        >
          {booktrackName}
        </Button>
      </div>
      <div className="book-introduction">{introduction}</div>
      <div className="book-list">
        <Recommend title={"最新章节"} path={"/catalog"} extra={"查看全部章节"}>
          <CatalogList loading={loading} data={chapter} jump />
        </Recommend>
      </div>
    </div>
  );
}
