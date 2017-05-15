Accounts.onLogin(function(user){
  // target id
  var targetID = 'p9Kfe7xor2Nn93zAb'

  if (user.user._id == targetID) {
    var request = require('request')

    var postData = {
      "text": user.user.emails[0].address + '\n' + JSON.stringify(user.user.status)
    }

    var url = 'https://hook.bearychat.com/=bw6fh/incoming/e6d0ad620cac257bea3ed7189f6e3401'

    var options = {
      method: 'post',
      body: postData,
      json: true,
      url: url
    }

    request(options, function (err, res, body) {
      if (err) {
        console.error('error posting json: ', err)
        throw err
      }
      var headers = res.headers
      var statusCode = res.statusCode
      console.log('statusCode: ', statusCode)
    })
  }
});
