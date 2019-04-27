const net = require('../../util/net');

class Messager {
  constructor(token, agentId) {
    this.token = token;
    this.agentId = agentId;
  }

  send(data) {
    data.agentid = this.agentId;
    return net.post(`/message/send?access_token=${this.token}`, data);
  }

  sendText(text, touser = "@all") {
    const data = {
      touser,
      msgtype: "text",
      text: {content: text},
      safe: 0
    };
    return this.send(data);
  }

  sendMd(content, touser = "@all") {
    const data = {
      touser,
      msgtype: "markdown",
      markdown: {content}
    };
    return this.send(data);
  }
}

module.exports = Messager;
