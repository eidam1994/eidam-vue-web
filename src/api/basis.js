import { req } from "./axios";

/**
 * 软件管理
 **/
export const SoftwareList = () => { return req("get", "/api/software/all")};

export const deleteSoftware = (params) => {return req("post", "/api/software/delete", params)}
