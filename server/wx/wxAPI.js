var randomChar = function ()
{
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 4; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

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


            // add time for session
            wxres.updatedAt = new Date();

            wxres.meteorId = CryptoJS.MD5(wxres.openid).toString()


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
                  meteorId: wxres.meteorId
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
    // console.log(data)

    // add time for student data
    userInfo.updatedAt = new Date();

    if (WXAccounts.findOne({"wxsession.meteorId": data.meteorId}).userInfo) {
      WXAccounts.update(
        {"wxsession.meteorId": data.session},
        {$set:{userInfo:userInfo}}
      )
    } else {
      WXAccounts.update(
        {"wxsession.meteorId": data.meteorId},
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

    var meteorId = req.query.meteorId

    console.log(req.query)

    current_account = WXAccounts.findOne({"wxsession.meteorId":meteorId})

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

JsonRoutes.add('get', '/api/wx/test/accountbind', function(req, res, next) {

    var data = req.query
    var email = data.email


    console.log(email)

    if (Students.find({email:email}).count() == 1) {

      // generate random char for vertifying
      var passPhase = randomChar()
      var content = 'binding passphase: ' + passPhase
      Meteor.call('pushToChat', content)

      // update bindInformation
      var studentid = Students.findOne({email:email})._id
      var result = WXAccounts.update({"wxsession.session":data.session},{$set:{"bindInformation.email":email, "bindInformation.studentid":studentid, "bindInformation.passPhase":passPhase, "bindInformation.vertified":false}})

      // return result to WX
      JsonRoutes.sendResult(res, {
          data: {
            result : result
          }
      });
    } else {
      console.log('cannot find student')
      JsonRoutes.sendResult(res, {
          data: {
            err : 'Student not found'
          }
      });
    }

});

JsonRoutes.add('get', '/api/wx/test/emailVertify', function(req, res, next) {

    var data = req.query

    console.log(data)

    if (WXAccounts.findOne({"wxsession.meteorId":data.meteorId}).bindInformation.passPhase == data.passphase) {
      WXAccounts.update({"wxsession.meteorId":data.meteorId},{$set:{"bindInformation.verified":true}})
      var result = {
        code: 200
      }
    } else {
      console.log('wrong passphase')
      var result = {
        err: 'wrong passphase'
      }
    }

    JsonRoutes.sendResult(res, {
        data: {
          result
        }
    });

});
