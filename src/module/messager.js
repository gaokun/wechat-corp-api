const net = require('../../util/net');

class Messager {
  constructor(token) {
    this.token = token;
  }

  sendText(text) {
    const data = {
      "touser": "GaoKun",
      // "toparty": " PartyID1 | PartyID2 ",
      // "totag": " TagID1 | TagID2 ",
      "msgtype": "text",
      "agentid": 1000002,
      "text": {
        "content": text
      },
      "safe": 0
    };
    return net.post(`/message/send?access_token=${this.token}`, data);
  }
}

module.exports = Messager;
