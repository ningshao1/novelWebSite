import React from "react";
import ReactDOM from "react-dom";
import AppRoute from "./route/index";
import { Provider } from "react-redux";
import store from "./store/index";
ReactDOM.render(
  <Provider store={store}>
    <AppRoute />
  </Provider>,
  document.getElementById("root")
);
