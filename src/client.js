const net = require('../util/net');
const Messager = require('./module/messager');

/**
 * @Author Ken
 * @CreateDate 2019-04-26 15:40
 * @LastUpdateDate 2019-04-26 15:40
 * @desc 客户端
 * @params
 * @return
 */
class Client {
  constructor(corpId, appSecret) {
    this.corpId = corpId;
    this.appSecret = appSecret;
    this.life = 0; // token多久失效
    this.accessToken = '';
    // 用于保持access_token
    this._keepAliveTimer = 0;
    this.connect();
  }

  /**
   * {
      "errcode": 0,
      "errmsg": "ok",
      "access_token": "xxxxxx",
      "expires_in": 7200
    }
   * */
  connect() {
    const url = `/gettoken?corpid=${this.corpId}&corpsecret=${this.appSecret}`;
    this.initPromise = net.get(url).then(data => {
      this.life = data.expires_in;
      this.accessToken = data.access_token;
      this.dispatchToken();
      this.keepAlive();
      return data;
    }).catch(error => {
      console.error('App 获取token失败', error);
    });
  }

  keepAlive() {
    clearTimeout(this._keepAliveTimer);
    this._keepAliveTimer = setTimeout(() => {
      this.connect();
    }, this.life * 1000 / 2);
  }

  close() {
    clearTimeout(this._keepAliveTimer);
  }

  dispatchToken() {
    this.messager = new Messager(this.accessToken);
  }
}

module.exports = Client;
