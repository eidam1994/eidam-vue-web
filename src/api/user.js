import axios from 'axios';
import { req } from './axios';

// 登录接口
export const login = (params) => { return req("post", "/api/login", params) };
// 获取用户菜单
export const menu = (params) => { return axios.get("/api/menu?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 退出接口
export const logout = () => { return req("post", "/api/logout") };

