const net = require('../util/net');
const Client = require('./client');

// 模块放在这里, 模块必须有setToken方法

let client;

function init(corpId, corpSecret) {
  client = new Client(corpId, corpSecret);
  return client.initPromise;
}

const App = {
  init
};

module.exports = App;
