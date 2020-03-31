import React, { Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { WingBlank, Toast } from "antd-mobile";
import Footer from "./foot/index";
import TopBar from "../component/topBar";
import "../less/common.less";
export default () => (
  <div>
    <Router>
      <WingBlank size="lg">
        <TopBar />
        <Suspense fallback={<div>loading...</div>}>
          <Route
            path="/"
            exact
            component={React.lazy(() => import("./home/home"))}
          />
          <Route
            path="/chapter/:id"
            exact
            component={React.lazy(() => import("./chapter/index"))}
          ></Route>
          <Route
            path="/search/:query"
            exact
            component={React.lazy(() => import("./search"))}
          ></Route>
          <Route
            path="/catalog/:id/:title"
            exact
            component={React.lazy(() => import("./catalog"))}
          ></Route>
          <Route
            path="/classify/:classify"
            exact
            component={React.lazy(() => import("./classify"))}
          ></Route>
          <Route
            path="/detail/:id/:cataLog"
            exact
            component={React.lazy(() => import("./detail"))}
          ></Route>
          <Route
            path="/history"
            exact
            component={React.lazy(() => import("./history"))}
          ></Route>
          <Route
            path="/bookrack"
            exact
            component={React.lazy(() => import("./bookrack"))}
          ></Route>
          <Route
            path="/top"
            exact
            component={() => {
              Toast.info("排行模块暂未开发！", 2);
              return <div></div>;
            }}
          ></Route>
          <Route
            path="/over"
            exact
            component={() => {
              Toast.info("完本模块暂未开发！", 2);
              return <div></div>;
            }}
          ></Route>
          <Route
            path="/about"
            exact
            component={() => {
              return (
                <div
                  style={{
                    fontSize: "12px",
                    lineHeight: "25px",
                    padding: "0 20px"
                  }}
                >
                  为了学习React开发的网站，功能完善中。有意见可加V：zhoumaoning123
                  提意见。
                </div>
              );
            }}
          ></Route>
        </Suspense>
        <Footer />
      </WingBlank>
    </Router>
  </div>
);
