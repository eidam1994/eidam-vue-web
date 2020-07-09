import axios from 'axios';
import { req } from "./axios";

/**
 * 商品管理
 **/
// 商品管理-获取商品管理列表
export const GoodsList = (params) => { return req("post", "/api/Goods/list", params) };
// 商品管理-保存商品管理
export const GoodsSave = (params) => { return req("post", "/api/Goods/save", params) };
// 商品管理-删除商品管理
export const GoodsDelete = (params) => { return axios.delete("/api/Goods/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 软件管理
 **/
export const SoftwareList = () => { return req("get", "/api/software/all")};

export const deleteSoftware = (params) => {return req("post", "/api/software/delete", params)}
