var crypto = require('crypto');

Meteor.methods({
  encrypt: function(key, iv, data) {
    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    var crypted = cipher.update(data, 'utf8', 'binary');
    crypted += cipher.final('binary');
    crypted = new Buffer(crypted, 'binary').toString('base64');
    console.log(crypted);
    return crypted;
  },
  decrypt: function(key, iv, crypted) {
      crypted = new Buffer(crypted, 'base64').toString('binary');
      var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
      var decoded = decipher.update(crypted, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      console.log(decoded);
      return decoded;
  }
});
