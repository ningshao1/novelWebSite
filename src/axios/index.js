import axios from "axios";
import { Toast } from "antd-mobile";
const service = axios.create({
  baseURL: "/api/v1/", // api 的 base_url
  timeout: 5000 // 请求超时时间
});
//响应拦截器即异常处理
service.interceptors.response.use(
  ({ data }) => {
    if (data.code === 0) {
      if (data.chapterList) {
        return data;
      }
      return data.data;
    } else {
      return Promise.reject(data);
    }
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          Toast.info("参数错误", 1);
          break;
        case 401:
          console.log("未授权，请重新登录");
          break;
        case 403:
          console.log("拒绝访问");
          break;
        case 404:
          console.log("请求错误,未找到该资源");
          break;
        case 405:
          console.log("请求方法未允许");
          break;
        case 408:
          Toast.hide();
          Toast.info("对不起，请求超时!", 3);
          break;
        case 500:
          Toast.info("服务器报错", 3);
          break;
        case 501:
          console.log("网络未实现");
          break;
        case 502:
          console.log("网络错误");
          break;
        case 503:
          console.log("服务不可用");
          break;
        case 504:
          Toast.hide();
          Toast.info("网络超时，请再次请求", 3);
          break;
        case 505:
          console.log("http版本不支持该请求");
          break;
        default:
          console.log(`连接错误${err.response.status}`);
      }
    } else {
      console.log("连接到服务器失败");
    }
    return Promise.reject(err.response);
  }
);
export default service;
