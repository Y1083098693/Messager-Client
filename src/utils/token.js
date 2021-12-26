import Cookies from "js-cookie";
const authorization = "authorization";

export const setCookie = token => {
  // 设置cookie
  Cookies.set(authorization, token);
};

export const getCookie = () => {
  // 获取cookie
  return Cookies.get(authorization);
};

export const removeCookie = () => {
  // 删除cookie
  return Cookies.remove(authorization);
};
