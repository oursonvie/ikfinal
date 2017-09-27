Meteor.methods({
  pushChat: function(err, input, message) {
    // http post setting
      var request = require('request')
      var url = 'https://hook.bearychat.com/=bw6fh/incoming/e6d0ad620cac257bea3ed7189f6e3401'

      var postData = {
        "text": err + ' \n' + input + ' \n' + JSON.stringify(message) + '\n'
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
        // console.log('statusCode: ', statusCode)
      })

  }
});
