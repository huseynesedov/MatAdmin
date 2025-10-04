import axios from "axios";
import siteUrl from "./const";

const BASE_URL = siteUrl;

// Global dil alma
// const getLang = () => {
//   return localStorage.getItem("lang") || "az"; // default az
// };

// Config oluşturma
const createConfig = (params = {}, contentType) => {
  let token = localStorage.getItem("token");
//   let lang = getLang();

  let config = {
    // params: { lang, ...params }, // otomatik dil ekle
    headers: {
      "Content-Type": contentType || "application/json;charset=UTF-8",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

const createJsonConfig = (params) => createConfig(params, "application/json;charset=UTF-8");
const createFormDataConfig = (params) => createConfig(params, "multipart/form-data");

export const BaseApi = {
  get(url, params) {
    let fullUrl = `${BASE_URL}${url}`;
    let config = createJsonConfig(params);
    return axios.get(fullUrl, config).then((response) => response.data);
  },

  post(url, data, queryParams) {
    let fullUrl = `${BASE_URL}${url}`;
    let config = createJsonConfig(queryParams);
    return axios.post(fullUrl, data, config).then((response) => response.data);
  },

  postFormData(url, params, queryParams) {
    let fullUrl = `${BASE_URL}${url}`;
    let formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });
    let config = createFormDataConfig(queryParams);
    return axios.post(fullUrl, formData, config).then((response) => response.data);
  },

  postFormDataFile(url, params) {
    let fullUrl = `${BASE_URL}${url}`;
    let formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });
    let config = createFormDataConfig();
    return axios.post(fullUrl, formData, config).then((response) => response.data);
  },

  delete(url, params, queryParams) {
    let fullUrl = `${BASE_URL}${url}`;
    let config = createJsonConfig(queryParams);
    return axios.delete(fullUrl, { ...config, data: params }).then((response) => response.data);
  },

  deleteNew(url, params) {
    let fullUrl = `${BASE_URL}${url}`;
    let config = createJsonConfig();
    return axios.delete(fullUrl, { ...config, data: params }).then((response) => response.data);
  },

  put(url, params, queryParams) {
    let fullUrl = `${BASE_URL}${url}`;
    let config = createJsonConfig(queryParams);
    return axios.put(fullUrl, params, config).then((response) => response.data);
  },

  getBaseUrl() {
    return BASE_URL;
  },
};
