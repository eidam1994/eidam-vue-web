import { req } from './axios';

// 登录接口
export const login = (params) => { return req("post", "/api/login", params) };
// 退出接口
export const logout = () => { return req("post", "/api/logout") };
// 修改用户
export const updateUserInfo = (params) => {return req("post", "/api/user/update", params)}

