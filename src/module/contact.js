const net = require('../../util/net');

class Contact {
  constructor(token) {
    this.token = token;
  }

  getUserInfo(userId) {
    return net.get(`user/get?access_token=${this.token}&userid=${userId}`);
  }
}

module.exports = Contact;

