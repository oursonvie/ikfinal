// moo2u login url
var baseURL = 'http://pre.mooc2u.com/PublicService/LoginHandler.ashx?Method=ikcestlogin&u='

// import crypto to do the AES-128
var crypto = require('crypto');

// local var for AES encryption
var key = '3dHu3Z3IU9olWRDL';
var iv = 'mooc2017ikcestxj';

function encrypt(data) {
  var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  var crypted = cipher.update(data, 'utf8', 'binary');
  crypted += cipher.final('binary');
  crypted = new Buffer(crypted, 'binary').toString('base64');
  console.log(crypted);
  return crypted;
}

function decrypt(data) {
  crypted = new Buffer(crypted, 'base64').toString('binary');
  var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  var decoded = decipher.update(crypted, 'binary', 'utf8');
  decoded += decipher.final('utf8');
  console.log(decoded);
  return decoded;
}

Meteor.methods({
  redirctToMooc: function() {
    var userId = this.userId;
    var studentId = Meteor.users.findOne({_id:userId}).profile.studentId;
    var email = Meteor.users.findOne({_id:userId}).emails[0].address;
    var fullname = Students.findOne({userId:userId}).full_name;

    var str = studentId + ',' + email + ',' + fullname;

    var encryptedURL = baseURL + encodeURIComponent(encrypt(str))

    console.log(encryptedURL);
    return encryptedURL
  }
});
