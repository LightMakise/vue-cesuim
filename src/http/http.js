import axios from 'axios'
import qs from 'qs'
const downloadUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

// 请求时的拦截
axios.interceptors.request.use(function (config) {
    // 发送请求之前做一些处理
    return config;
}, function (error) {
    // 当请求异常时做一些处理
    return Promise.reject(error);
});
// 响应时拦截
axios.interceptors.response.use(function (res) {
  //下载请求处理
  if (res.headers && (res.headers['content-type'] === 'application/x-msdownload' || res.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'|| res.headers['content-type'] === 'application/zip')) {
    downloadUrl(res.request.responseURL)
    return
  }
    // 返回响应时做一些处理
    return res;
}, function (error) {
    // 当响应异常时做一些处理
    return Promise.reject(error);
});

function checkStatus (response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response
        // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
    console.log(res.data);
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status !== 200) {
        alert(res.message)
    }
    return res
}

export default {
    post (url, data) {
        return axios({
            method: 'post',
            baseURL: '',
            url,
            data: JSON.stringify(data),
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    get (url, params) {
        return axios({
            method: 'get',
            baseURL: '',
            url,
            params, // get 请求时带的参数
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}
