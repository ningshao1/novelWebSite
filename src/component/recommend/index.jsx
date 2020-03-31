import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Grid, SegmentedControl } from "antd-mobile";
import "../../less/recommend.less";
function RowBookItem(props) {
  const { data } = props;
  if (!data.length) {
    return (
      <div style={{ marginTop: "10px", marginLeft: "10px" }}>暂无数据</div>
    );
  }
  return (
    <Grid
      data={data}
      square={false}
      className="not-square-grid"
      columnNum={6}
      hasLine={false}
      renderItem={dataItem => (
        <Link to={"/chapter/" + dataItem.id} className="book-item">
          <div className="book-cover">
            <img
              src={dataItem.cover}
              alt=""
              style={{ width: "100%", height: "100%" }}
              onError={e => {
                e.currentTarget.src = require("../../asset/cover.png");
              }}
            />
          </div>
          <div className="book-title">{dataItem.title}</div>
          <div className="book-auth">{dataItem.auth}</div>
        </Link>
      )}
    />
  );
}
function ColumnBookItem(props) {
  const { data } = props;
  if (!data.length) {
    return (
      <div style={{ marginTop: "10px", marginLeft: "10px" }}>暂无数据</div>
    );
  }
  return (
    <div style={{ marginTop: "15px" }} className="column-book">
      {data.map((item, i) => {
        const { cover, introduction, id, title, auth } = item;
        return (
          <div key={i}>
            <Link to={"/chapter/" + id} className="column-Book-item">
              <div className="columnBookItem-left">
                <img
                  src={cover}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                  onError={e => {
                    e.currentTarget.src = require("../../asset/cover.png");
                  }}
                />
              </div>
              <div className="columnBookItem-right">
                <h4>{title}</h4>
                <p>{introduction}</p>
                <div>作者：{auth}</div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
export default function Recommend(props) {
  const {
    data,
    title,
    path,
    type,
    style,
    control,
    onValueChange,
    loadingStatus,
    extra,
    headerExtra
  } = props;
  const [controlIndex, setIndex] = useState(0);
  const Children = props.children ? (
    props.children
  ) : type === "row" ? (
    <RowBookItem data={data} />
  ) : (
    <ColumnBookItem data={data} />
  );
  return (
    <Card className="recommend" style={style}>
      <Card.Header
        title={title || "标题"}
        extra={
          headerExtra && (
            <Link to={path || "/"}>
              {extra || "更多"}
              <Icon type="right" style={{ verticalAlign: "bottom" }} />
            </Link>
          )
        }
      />
      <Card.Body>
        {control && (
          <SegmentedControl
            values={["仙侠", "玄幻", "都市", "科幻"]}
            tintColor="#ed424b"
            className="sz-control"
            selectedIndex={controlIndex}
            onChange={e => {
              setIndex(e.nativeEvent.selectedSegmentIndex);
              onValueChange(e.nativeEvent.value);
            }}
          />
        )}

        <div className="list-parent">
          {loadingStatus && (
            <div
              className="loading-parent"
              style={{
                textAlign: "center"
              }}
            >
              <Icon type={"loading"} style={{ marginTop: "50px" }} />
            </div>
          )}
          {Children}
        </div>
      </Card.Body>
    </Card>
  );
}
