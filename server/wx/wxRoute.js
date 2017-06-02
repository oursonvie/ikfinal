JsonRoutes.add('get', '/api/wx/login', function(req, res, next) {

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
            var status = 0
          } else {

            var status = WXAccounts.findOne({"meteorAccount.openid":sessionInfo.openid}).status
            var ifAdmin = WXAccounts.findOne({"meteorAccount.openid":sessionInfo.openid}).meteorAccount.ifAdmin
          }

          JsonRoutes.sendResult(res, {
              data: {
                openid: sessionInfo.openid,
                status: status,
                ifAdmin: ifAdmin
              }
          });

        } else {
          console.log('error')
        }
      }
    });

});

JsonRoutes.add('get', '/api/wx/accountbind', function(req, res, next) {

    var data = req.query

    // convert string to object
    data.userInfo = JSON.parse(data.userInfo)
    data.meteorAccount = JSON.parse(data.meteorAccount)
    data.status = 1

    console.log(data)

    if ( WXAccounts.find({"meteorAccount.openid":data.meteorAccount.openid}).count() == 0) {
      var id = WXAccounts.insert(data)
    }

    if (id) {
      JsonRoutes.sendResult(res, {
          data: {
            error: 0,
          }
      });
    } else {
      JsonRoutes.sendResult(res, {
          data: {
            error: 1,
          }
      });
    }

});

JsonRoutes.add('get', '/api/wx/program', function(req, res, next) {
    var data = req.query
    // program api should take no parameter
    console.log('GET /api/wx/program')

    // date process
    var currentDate = moment().format("YYYY-MM-DD")
    // the start date have to -1 to make sure the result is right
    var JSDate_start = moment(currentDate).add(1,'days').toDate()
    var JSDate_end = moment(currentDate).toDate()

    // project result without student enrolled
    var result = Programs.find({start_date:{$lte: JSDate_start},end_date:{$gte:JSDate_end}},{fields:{student:0}}).fetch()

    JsonRoutes.sendResult(res, {
        data: {
          programList : result
        }
    });
});
