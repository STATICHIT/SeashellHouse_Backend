import axios from 'axios'
// import qs from 'qs';
import store from '../store/index.js'

let baseURL = 'http://localhost:80/'
let config = {
  baseURL: baseURL,
  timeout: 30000    //设置最大请求时间
}
const _axios = axios.create(config);


// Promise 是异步编程的一种解决方案：
//从语法上讲，promise是一个对象，从它可以获取异步操作的消息；
//从本意上讲，它是承诺，承诺它过一段时间会给你一个结果。
//promise有三种状态： pending(等待态)，fulfiled(成功态)，rejected(失败态)；
//状态一旦改变，就不会再变。创造promise实例后，它会立即执行。
// 封装post,get,post,delete方法
const http = {
  get(url = '', params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        params,
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'token': store.state.token},
        method: 'GET'
      }).then(res => {
        //resolve ：异步操作执行成功后的回调函数
        resolve(res.data)
        return res
      }).catch(err => {
        //reject：异步操作执行失败后的回调函数
        reject(err)
      })
    })
  },
  post(url = '', params = {}) {

    return new Promise((resolve, reject) => {
      _axios({
        url,
        data: params,
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'token': store.state.token },
        method: 'POST'
      }).then(res => {
        resolve(res.data)
        return res.data
      }).catch(error => {
        reject(error)
      })
    })
  },
  put(url = '', params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        data: params,
        params: params,
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'token': store.state.token},
        method: 'PUT'
      }).then(res => {
        resolve(res.data)
        return res.data
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete(url = '', params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        data: params,
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'token': store.state.token},
        method: 'DELETE'
      }).then(res => {
        resolve(res.data)
        return res.data
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default http