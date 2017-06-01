JsonRoutes.add('get', '/login', function(req, res, next) {

    var jscode = req.query.code

    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code'

    HTTP.call( 'GET', 'https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        "appid" : wx.appId,
        "secret" : wx.secret,
        "js_code" : jscode,
        "grant_type" : "authorization_code"
      }
    }, function( error, response ) {
      if ( error ) {
        console.log( error );
      } else {
        if (response.statusCode == 200) {
          var result = response.content
          // convert session return information to object
          var sessionInfo = JSON.parse(result)
          console.log('sessionKey: ' + JSON.stringify(sessionInfo))

          if ( WXAccounts.find({"meteorAccount.openid":sessionInfo.openid}).count() == 0) {
            var ifBind = false
          } else {
            var ifBind = true
          }

          console.log(ifBind)

          JsonRoutes.sendResult(res, {
              data: {
                openid: sessionInfo.openid,
                ifBind: false
              }
          });

        } else {
          console.log('error')
        }
      }
    });

});

JsonRoutes.add('get', '/accountbind', function(req, res, next) {

    var data = req.query

    // convert string to object
    data.userInfo = JSON.parse(data.userInfo)
    data.meteorAccount = JSON.parse(data.meteorAccount)
    data.status = 'Pending'

    console.log(data)

    WXAccounts.insert(data)

});
