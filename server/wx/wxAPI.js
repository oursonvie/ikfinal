JsonRoutes.add('get', '/api/wx/test', function(req, res, next) {

    var data = req.query

    console.log(data)

    JsonRoutes.sendResult(res, {
        data: {
          code: 200
        }
    });


});

JsonRoutes.add('get', '/api/wx/test/login', function(req, res, next) {

    var jscode = req.query.code

    console.log(req.query)

    if (jscode) {
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
            var wxres = JSON.parse(result)

            // console.log('res: ' + res.session_key)

            // add time for session
            wxres.updatedAt = new Date();
            wxres.session = CryptoJS.MD5(wxres.session_key).toString()


            if (WXAccounts.findOne({"wxsession.openid":wxres.openid})) {
              var current_account = WXAccounts.findOne({"wxsession.openid":wxres.openid})

              // console.log(current_account)

              if (current_account.wxsession.session_key != wxres.session_key) {
                var result = WXAccounts.update(
                  {"wxsession.openid":wxres.openid},
                  {$set:{wxsession:wxres}}
                )
                console.log('record updated ' + current_account._id)
              }


            } else {

              var result = WXAccounts.insert({
                wxsession:wxres
              })

              console.log('new record added ' + WXAccounts.findOne({"wxsession.openid":wxres.openid})._id)
            }


            JsonRoutes.sendResult(res, {
                data: {
                  session: wxres.session
                }
            });

          } else {
            console.log('error')
          }
        }
      });

    } else {
      console.log('/api/wx/test/login error')
    }



});


JsonRoutes.add('get', '/api/wx/test/userInfo', function(req, res, next) {

    var data = req.query
    var userInfo = JSON.parse(data.userInfo)

    // add time for student data
    userInfo.userInfo.updatedAt = new Date();

    if (WXAccounts.findOne({"wxsession.session": data.session}).userInfo) {
      WXAccounts.update(
        {"wxsession.session": data.session},
        {$set:{userInfo:userInfo}}
      )
    } else {
      WXAccounts.update(
        {"wxsession.session": data.session},
        {$set:{userInfo:userInfo}}
      )
    }

    JsonRoutes.sendResult(res, {
        data: {
          code: 123
        }
    });

});

JsonRoutes.add('get', '/api/wx/test/bindInfo', function(req, res, next) {

    var session = req.query.session

    console.log(session)

    current_account = WXAccounts.findOne({"wxsession.session":session})

    // when bindInformation exist
    if (current_account.bindInformation) {
      if (current_account.bindInformation.vertified == true) {
        var bindInformation = current_account.bindInformation
        bindInformation.status = 2
      } else if (current_account.bindInformation.email) {
        var bindInformation = current_account.bindInformation
        bindInformation.status = 1
      }
    } else {
      // init bind information
      var bindInformation = {}
      bindInformation.status = 0
    }

    JsonRoutes.sendResult(res, {
        data: {
          bindInformation: bindInformation
        }
    });

});
