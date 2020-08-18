import axios from 'axios';
import qs from 'qs';

// 导入NProgress, 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let instance  = axios.create({
//  baseURL: 'http://localhost:9100',
  baseURL: process.env.BASE_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
 //   'Content-Type': 'application/json;charset=utf-8'
    
  },
//   transformRequest: [function (data) {
//     let newData = '';
//     for (let k in data) {
//       if (data.hasOwnProperty(k) === true) {
//         newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
//       }
//     }
//     return newData;
//   }]
});


// 在request 拦截器中, 展示进度条 NProgress.start()
// 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use(config => {
    NProgress.start()
 //    console.log("axios.interceptors.request.use config",config)
    // 为请求头对象，添加token验证的Authorization字段
 //   config.headers.Authorization = window.sessionStorage.getItem('token')
    // 在最后必须 return config
    return config
  })
  // response 拦截器中,  隐藏进度条NProgress.done()
axios.interceptors.response.use(config => {
    NProgress.done()
    return config
  })

  export default instance;

  /**
 * 封装所有请求
 * @param methed
 * @param url
 * @param data 
 * @param headers
 * @returns {Promise}
 */
export function request(methed,url, data = {},headers) {
    return new Promise((resolve, reject) => {
        instance({
            method: methed || 'post',
            url:url,
            params: methed === 'get' ? data :'',
            data: methed !== 'get' ?  data :'',
            headers: headers || {'Content-Type':'application/json'},
        })
        .then(response => {
            //对接口错误码做处理
            resolve(response.data);
        })
        .catch(err => {
            reject(err)
        })
    })
}


export function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    response(res);
  }).catch(function (err) { 
    response(err);
  })
}


/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.post(url, qs.stringify(data)).then(response => {
//  instance.post(url, JSON.stringify(data)).then(response => {
            //对接口错误码做处理
            resolve(response.data);
        }, err => {
            reject(err);
        })
    })
}

/**
 * get 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params: data
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err)
        })
    })
}

// export function get (url, params, response) {
//     return new Promise((resolve,reject) => {
//         return apiAxios('GET', url, params, response)
//     })
  
// }
// export function post(url, params, response) {
//     return new Promise((resolve,reject) => {
//          apiAxios('POST', url, params, response)
//         })
// }

// export function put(url, params, response) {
//     return new Promise((resolve,reject) => {
//         return apiAxios('PUT', url, params, response)
//         })
// }

// export function delete(url, params, response) {
//     return new Promise((resolve,reject) => {
//         apiAxios('DELETE', url, params, response)
//     })
// }


