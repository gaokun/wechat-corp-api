# 微信企业版 API

#### 目前只是实现了发应用消息, 普通文本与markdown

```js

const {Client} = require('wechat-corp-api');

// 需要填写的参数
const CORP_ID = "";
const CORP_SECRET = "";
const AGENT_ID = "";

// access_token 由client自动续期
const client = new Client(CORP_ID, CORP_SECRET, AGENT_ID);

// 因为这是示例, 所以需要promise, 正常项目不需要
client.initPromise.then(() => {
    client.messager.sendText('Hi Ken');
);

```
