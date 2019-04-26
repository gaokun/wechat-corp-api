const {CORP_ID, CORP_SECRET} = require('../config/config_dev');
const { Client } = require('../index');

const client = new Client(CORP_ID, CORP_SECRET);

client.initPromise.then(() => {
  client.messager.sendText('hiiii');
});
