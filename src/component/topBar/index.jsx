import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, withRouter } from "react-router-dom";
import { SearchBar, Icon } from "antd-mobile";
import axios from "../../axios";
import "../../less/topBar.less";
//下拉小说类型组件
function BookTypeList({ isDown, history }) {
  const [list, setList] = useState([]);
  const listRef = useRef({});
  useEffect(() => {
    axios.get("styles").then(res => setList(res || []));
  }, []);
  return (
    <ul className={"type-list " + (isDown ? "show" : "hide")} ref={listRef}>
      {list.map((v, i) => (
        <li
          key={i}
          onClick={() => {
            history.push("/classify/" + v);
          }}
        >
          {v}
        </li>
      ))}
    </ul>
  );
}
function TopBar(props) {
  /***
   * isDown false 收起   true 展开
   */
  const [isDown, setDown] = useState(false);
  const [searchShow, setSearchSHow] = useState(false);

  const {
    location: { pathname }
  } = props;
  const NewBookTypeList = useMemo(() => {
    return BookTypeList;
  }, []);
  const [currentValue, setCurrentValue] = useState("");
  //当路由变化之后 就把search隐藏
  useEffect(() => {
    setSearchSHow(false);
    setDown(false);
  }, [pathname]);
  return (
    <div>
      <div className="top-bar">
        <Link to="/" className="websit">
          {pathname === "/" ? (
            "粥神小说网"
          ) : (
            <div className="go-back">
              <Icon type="left" size={"lg"}></Icon>
              <span>首页</span>
            </div>
          )}
        </Link>
        <div>
          {pathname !== "/" ? (
            <Icon
              type={"search"}
              style={{ marginRight: "15px" }}
              onClick={() => {
                setSearchSHow(!searchShow);
              }}
            />
          ) : (
            ""
          )}
          <span
            className={
              "iconfont down-icon " + (isDown ? "icon-shanchu" : "icon-daohang")
            }
            onClick={() => setDown(!isDown)}
          ></span>
        </div>
      </div>
      <NewBookTypeList isDown={isDown} history={props.history} />
      {pathname === "/" || searchShow ? (
        <SearchBar
          placeholder="请输入书名或作者"
          size="lg"
          value={currentValue}
          onChange={value => {
            setCurrentValue(value);
          }}
          onSubmit={() => {
            props.history.push("/search/" + currentValue);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
export default withRouter(TopBar);
