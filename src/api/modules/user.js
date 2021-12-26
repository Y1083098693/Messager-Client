import request from "@/utils/request";
import { API } from "./../index";

export default {
  login(data) {
    return request.post(`${API}/user/login`, data);
  },
  getCVCode() {
    // 获取验证码
    return request.get(`${API}/user/getcode`);
  },
  register(data) {
    // 注册
    return request.post(`${API}/user/register`, data);
  },
  getUserInfo(id) {
    // id获取用户详情
    return request.get(`${API}/user/userinfo?id=${id}`);
  },
  preFetchUser(data) {
    // 搜索用户
    let { type, q, page, pageSize } = data;
    return request.get(
      `${API}/user/prefetchuser?type=${type}&q=${q}&page=${page}&pageSize=${pageSize}`
    );
  },
  addNewFenzu(data) {
    // 添加分组
    return request.post(`${API}/user/addfenzu`, data);
  },
  modifyuserfenzu(data) {
    // 修改好友所在的分组
    return request.post(`${API}/user/modifyuserfenzu`, data);
  },
  modifyFriendBeizhu(data) {
    // 修改好友的备注
    return request.post(`${API}/user/modifyfriendbeizhu`, data);
  },
  deleteFenzu(data) {
    // 删除分组
    return request.post(`${API}/user/delfenzu`, data);
  },
  editFeznu(data) {
    // 编辑某项分组名称
    return request.post(`${API}/user/editfenzu`, data);
  }
};
