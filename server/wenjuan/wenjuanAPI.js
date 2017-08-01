// basic config for wenjuan api
let config = require("./apiURLs.js");

const ObjConst = {
  wj_appkey: 'wj0d92fe7r7gfbsvu3',
  wj_appsecret: 'b61a19a3e992bda4850f19c3071a8f8d',
  wj_user: 'ikcesttest'
}

const wj_timestamp = () =>  Math.round(new Date().getTime()/1000)

// add different timestamp function
function addTimeStamp() {
  return new Promise(resolve => {
    let res = ObjConst
    res.wj_timestamp = wj_timestamp()
    resolve(res)
  });
}

// generate signature function
function getSignature(para, config) {
  return new Promise(resolve => {
    let res = ''
    _.forEach(para, function(key) {
      res += config[key]
    })
    res += ObjConst.wj_appsecret
    resolve(res)
  });
}

// generate url base on para needed
function getURL(para, baselink) {
  let ObjConfig = Promise.await(addTimeStamp())

  let url = ''

  _.forEach(para, function(key) {

    let value = ObjConfig[key]
    let string = `${key}=${value}&`
    url += string
  });

  signature = CryptoJS.MD5(Promise.await(getSignature(para,ObjConfig))).toString()

  let loginUrl = baselink + url + `wj_signature=${signature}`

  return loginUrl
}

Meteor.methods({
  'wjLogin' () {

    const para = ['wj_appkey', 'wj_user', 'wj_timestamp'].sort()
    let link = getURL(para, config.loginURL)
    console.log(link)
  }
});
