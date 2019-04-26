const axios = require('axios');
const _ = require('lodash');
const WechatError = require('./error_handler');
const {API_URL} = require('../config/config');

// config
const wechatAxios = axios.create({
  baseURL: API_URL,
  timeout: 10 * 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

// Add a response interceptor
wechatAxios.interceptors.response.use(function (response) {
  const { data } = response;
  const errcode = _.get(data, 'errcode');
  const errmsg = _.get(data, 'errmsg');
  let ret = data;
  if (errcode !== 0) {
    ret = Promise.reject(new WechatError(errcode, errmsg));
  }
  return ret;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

module.exports = wechatAxios;
