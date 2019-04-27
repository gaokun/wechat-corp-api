const {CORP_ID, CORP_SECRET, AGENT_ID} = require('./config_dev');
const {Client} = require('../index');

// !!!!看这里!!!! 需要自己把这三个常量设置好
const client = new Client(CORP_ID, CORP_SECRET, AGENT_ID);

client.initPromise.then(() => {

  const content = `您的会议室已经预定,稍后会同步到\`邮箱\`
> **事项详情**
> 事 项 <font color="info">开会</font>
> 
> 会议室:<font color="info">广州TIT 1楼 301</font>
  > 日 期:<font color="warning">2018年5月18日</font>
  > 时 间:<font color="comment">上午9:00-11:00</font>
  > 
  > 请准时参加会议.
> 
> 如需修改会议信息,请点击:[修改会议信息](https://work.weixin.qq.com)`;

  client.messager.sendText(content);

  client.messager.sendMd(content)
    .then(d => {
      console.log(111, d);
    })
    .catch(e => {
      console.log(e);
    });
}).catch(e => {
  console.log(e);
});
