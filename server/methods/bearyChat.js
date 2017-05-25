Meteor.methods({
  pushChat: function(userId) {
    var tarList = ['p9Kfe7xor2Nn93zAb','4Xr7pbWgCMqbi3Mdc']

    if(tarList.includes(userId)) {
      var info = Meteor.users.findOne({_id:userId})


      // http post setting
      var request = require('request')
      var url = 'https://hook.bearychat.com/=bw6fh/incoming/e6d0ad620cac257bea3ed7189f6e3401'

      var postData = {
        "text": info.emails[0].address + '\n' + JSON.stringify(info.status)
      }

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
  }
});
