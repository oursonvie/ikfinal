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
function getURL(ObjConfig, para, baselink) {

  let url = ''

  _.forEach(para, function(key) {

    let value = ObjConfig[key]
    let string = `${key}=${value}&`
    url += string
  });

  // console.log('before encrpt: '+ Promise.await(getSignature(para,ObjConfig)))

  signature = CryptoJS.MD5(Promise.await(getSignature(para,ObjConfig))).toString()

  let loginUrl = baselink + url + `wj_signature=${signature}`

  return loginUrl
}

Meteor.methods({
  'wjLogin' () {
    let timeAddedObj = Promise.await(addTimeStamp())
    const para = ['wj_appkey', 'wj_user', 'wj_timestamp'].sort()
    let link = getURL(timeAddedObj, para, config.loginURL)
    return link
  },
  'getProjList' () {
    let timeAddedObj = Promise.await(addTimeStamp())
    const para = ['wj_appkey', 'wj_timestamp'].sort()
    let link = getURL(timeAddedObj, para, config.projectListURL)
    try {
      const result = Promise.await(httpGetAsync(link,{}))
      return JSON.parse(result.content)
    } catch (err) {
      console.log(err)
    }
  },
  'wjContentUrl' (shortId, studentId, programId) {
    const respondent = `${studentId}_${programId}`
    let temp = ObjConst
    temp.wj_respondent = respondent

    const para = ['wj_appkey', 'wj_respondent'].sort()

    let params = getURL(temp, para, '')
    // short id is not included in the full para link, therefore
    let link = config.contentURL + shortId + '/?' + params
    return link
  },
  'wjDetailResult' (shortId) {
    let timeAddedObj = Promise.await(addTimeStamp())
    timeAddedObj.wj_short_id = shortId

    const para = ['wj_appkey', 'wj_user', 'wj_short_id', 'wj_timestamp'].sort()

    let link = getURL(timeAddedObj, para, config.surveyResultURL)
    console.log(link)

  }
});
