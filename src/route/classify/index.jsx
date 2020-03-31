import React, { useEffect, useState, useRef } from "react";
import Recommend from "../../component/recommend";
import axios from "../../axios";
function Search(props) {
  const {
    match: {
      params: { classify }
    }
  } = props;
  const topStyle = {
    position: "fixed",
    bottom: "40px",
    right: "25px",
    background: " #ed424b",
    height: " 30px",
    display: "inline-block",
    width: "30px",
    textAlign: "center",
    lineHeight: "30px",
    borderRadius: "50%",
    color: "#fff",
    transition: "all 0.5s ease-in-out"
  };
  const [RecommendData, setRecommend] = useState([]); //缓存展示的数据
  const listData = useRef({ current: [] });
  const [page, setPage] = useState(0);
  const [topClass, setTopClass] = useState("hide");
  var timer = 0;
  useEffect(() => {
    if (page !== 0) {
      listData.current = [];
      // setList([]);
      setPage(0);
    }
    axios.get(`novels/style/${classify}?page=0&count=40`).then(data => {
      if (data.length >= 20) {
        setRecommend(data.slice(0, data.length - 20));
        listData.current = data.slice(19, data.length);
      } else {
        setRecommend(data);
      }
    });
  }, [classify]);

  useEffect(() => {
    const count = page === 0 ? 40 : 20;
    if (listData.length <= 20) return;
    axios
      .get(`novels/style/${classify}?page=${page}&count=${count}`)
      .then(data => {
        // setList(data);
        listData.current = data;
      });
  }, [page]);
  useEffect(() => {
    //滚动到底部触发的函数
    function setScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (
        scrollHeight > clientHeight &&
        scrollTop + clientHeight >= scrollHeight - 650
      ) {
        clearTimeout(timer);

        // setTimeout(() => {
        //   console.log(RecommendData, listData);
        // },1000);
        timer = setTimeout(() => {
          // RecommendData.current = [
          //   ...RecommendData.current,
          //   ...listData.current
          // ];
          setRecommend(data => [...data, ...listData.current]);
          setPage(page => {
            if (page === 0) return page + 2;
            else return page + 1;
          });
        }, 200);
      }
      if (scrollHeight > clientHeight && scrollTop + clientHeight > 1500) {
        setTopClass("");
      } else {
        setTopClass("hide");
      }
    }

    document.addEventListener("scroll", () => {
      setScroll();
    });
    //取消监听滚动事件
    return () => {
      document.removeEventListener("scroll", () => {
        setScroll();
      });
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      <Recommend
        title={classify}
        data={RecommendData}
        //   loadingStatus={loading}
      ></Recommend>
      <span
        style={topStyle}
        className={topClass}
        onClick={() => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }}
      >
        顶部
      </span>
    </div>
  );
}
export default Search;
