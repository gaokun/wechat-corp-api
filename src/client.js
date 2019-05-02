const net = require('../util/net');
const Messager = require('./module/messager');
const Contact = require('./module/contact');

/**
 * @Author Ken
 * @CreateDate 2019-04-26 15:40
 * @LastUpdateDate 2019-04-26 15:40
 * @desc 客户端
 * @params
 * @return
 */
class Client {
  constructor(corpId, appSecret, agentId) {
    this.corpId = corpId;
    this.appSecret = appSecret;
    this.agentId = agentId;

    this._keepAliveTimer = 0;

    this.life = 0; // token多久失效
    this.accessToken = '';

    this.initModules();
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

  // 自动续期 access_token
  keepAlive() {
    clearTimeout(this._keepAliveTimer);
    this._keepAliveTimer = setTimeout(() => {
      this.connect();
    }, this.life * 1000 * 0.3); // 保证一个周期可以重试3次
  }

  // client不用了后, 需要调用此方法
  close() {
    clearTimeout(this._keepAliveTimer);
  }

  initModules() {
    this.messager = new Messager(this.accessToken, this.agentId);
    this.contact = new Contact(this.accessToken);
  }

  dispatchToken() {
    this.messager.token = this.accessToken;
    this.contact.token = this.accessToken;
  }
}

module.exports = Client;
