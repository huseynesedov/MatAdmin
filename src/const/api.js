import axios from "axios";
import siteUrl from "./const";
const BASE_URL = siteUrl

const createConfig = (params, contentType) => {
    let token = localStorage.getItem('token')

    let config = {};
    if (params) {
        config["params"] = params;
    }
    if (token) {
        config["headers"] = {"Content-Type": contentType, "Authorization": `Bearer ${token}`};
    }
    return config;
}

const createJsonConfig = (params) => {
    return createConfig(params, "application/json;charset=UTF-8");
}

const createFormDataConfig = (params) => {
    return createConfig(params, "multipart/form-data");
}

export const BaseApi = {
    get(url, params) {

        let fullUrl = `${BASE_URL}${url}`;
        let config = createJsonConfig(params)

        return axios.get(fullUrl, config).then(response => response.data);
    },
    post(url, params , queryParams) {
        let fullUrl = `${BASE_URL}${url}`;
        let config = createJsonConfig(queryParams);

        return axios.post(fullUrl, params, config).then(response => response.data);
    },
    postFormData(url, params , queryParams) {

        let fullUrl = `${BASE_URL}${url}`;

        let formData = new FormData();
        Object.keys(params).forEach(key => {
            let value = params[key];
            formData.append(key, value);
        });
        let config = createFormDataConfig();
        return axios.post(fullUrl, formData, config).then(response => response.data);
    },
    postFormDataFile(url, params) {

        let fullUrl = `${BASE_URL}${url}`;

        let formData = new FormData();
        Object.keys(params).forEach(key => {
            let value = params[key];
            formData.append(key, value);
        });
        /* formData.delete('files');
         for(let i = 0; i < params.files.length; i++) {
             formData.append(`files[${i}]`, params.files[i]);
         }*/
        let config = createFormDataConfig();
        return axios.post(fullUrl, formData, config).then(response => response.data);
    },
    delete(url, params) {
        let fullUrl = `${BASE_URL}${url}`;
        let config = createJsonConfig(params);

        return axios.delete(fullUrl, config).then(response => response.data);
    },
    deleteNew(url, params) {
        let fullUrl = `${BASE_URL}${url}`;
        let config = createJsonConfig();
        return axios.delete(fullUrl , {
            ...config,
            data: params
        }).then(response => response.data);
    },
    put(url, params) {

        let fullUrl = `${BASE_URL}${url}`;
        let config = createJsonConfig();

        return axios.put(fullUrl, params, config).then(response => response.data);
    },
    getBaseUrl() {
        return BASE_URL;
    }
};

