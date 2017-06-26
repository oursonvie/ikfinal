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

JsonRoutes.add('get', '/api/wx/login', function(req, res, next) {

    var jscode = req.query.code

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
      console.log('/api/wx/login error')
    }

});


JsonRoutes.add('get', '/api/wx/userInfo', function(req, res, next) {

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

JsonRoutes.add('get', '/api/wx/bindInfo', function(req, res, next) {

    var meteorId = req.query.meteorId

    // console.log(req.query)

    current_account = WXAccounts.findOne({"wxsession.meteorId":meteorId})

    // when bindInformation exist
    if (current_account.bindInformation) {
      var bindInformation = current_account.bindInformation
    } else {
      // init bind information
      var bindInformation = {}
    }

    JsonRoutes.sendResult(res, {
        data: {
          bindInformation: bindInformation
        }
    });

});

JsonRoutes.add('get', '/api/wx/accountbind', function(req, res, next) {

    var data = req.query
    var email = data.email


    // console.log(email)

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

JsonRoutes.add('get', '/api/wx/emailVertify', function(req, res, next) {

    var data = req.query

    // console.log(data)

    if (WXAccounts.findOne({"wxsession.meteorId":data.meteorId}).bindInformation.passPhase == data.passphase) {
      WXAccounts.update({"wxsession.meteorId":data.meteorId},{$set:{"bindInformation.vertified":true}})
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


JsonRoutes.add('get', '/api/wx/studentprogram', function(req, res, next) {

    var meteorId= req.query.meteorId

    // console.log(req.query)

    // program api should take no parameter
    var studentid = WXAccounts.findOne({"wxsession.meteorId":meteorId}).bindInformation.studentid

    // console.log(meteorId,studentid)

    var enrollment = Students.findOne({_id:studentid}).enrollment

    // list student enrolled program
    var enrolledProgramIds = []


    // only return enrolled program, pending will not be able to checkin
    _.forEach(enrollment, function(item) {
      if (Students.findOne({"enrollment.programId":item.programId},{fields:{"enrollment.$":1}}).enrollment[0].status == 'Enrolled') {
        enrolledProgramIds.push(item.programId)
      }

    });

    // console.log('enrolled: ' + enrolledProgramIds);

    // define time range of avaliable courses
    // get today's date
    var currentDate = moment().format("YYYY-MM-DD")
    // the start date have to -1 to make sure the result is right
    var start = moment(currentDate).add(1,'days').toDate()
    var end = moment(currentDate).toDate()

    var avaliableProgram = Programs.find({start_date:{$lte: start},end_date:{$gte:end}},{fields:{student:0}}).fetch()

    // list for avaliable programs
    var avaliableProgramList = []

    _.forEach(avaliableProgram, function(course) {
      avaliableProgramList.push(course._id)
    });

    // console.log(avaliableProgramList)

    // get avaliable for perticular student

    var resultPL = []

    _.forEach(enrolledProgramIds, function(program) {
      if (avaliableProgramList.includes(program)) {
        resultPL.push(program)
      }
    });

    // console.log(resultPL)

    // when student have no course to checkin, return an error
    if (resultPL.length == 0) {

      JsonRoutes.sendResult(res, {
          data: {
            err: 'The course you enrolled does not enable checkin yet'
          }
      });

    } else {

      // return only checkin avaliable course
      var result = Programs.find({_id:{$in:resultPL},"course.ifCheckin":true},{fields:{subject:1, start_date: 1, end_date: 1, "course.$": 1 }}).fetch()

      // enabled course but no avaliable checkin
      if(result.length == 0) {
        JsonRoutes.sendResult(res, {
            data: {
              err: 'no avaliable checkin'
            }
        });
      } else {

        var courseId = result[0].course[0].courseId

        if (WXAccounts.findOne({"wxsession.meteorId":meteorId,"checkin.courseId":courseId},{fields:{"checkin.$":1}})) {
          var checked = true
        } else {
          var checked = false
        }

        JsonRoutes.sendResult(res, {
            data: {
              programs: result,
              checked: checked
            }
        });

      }

      // console.log('GET /api/wx/studentprogram')

    }

});

JsonRoutes.add('get', '/api/wx/checkin', function(req, res, next) {

    var data = req.query

    var studentId = WXAccounts.findOne({'wxsession.meteorId':data.meteorId}).bindInformation.studentid

    var programId = Programs.findOne({"course.courseId":data.courseId})._id

    // check if checkin data existed in database
    if (WXAccounts.find({'wxsession.meteorId':data.meteorId, "checkin.programid": programId, "checkin.courseId": data.courseId}).count() == 1) {

      console.log('checkin infromation already exist')

      JsonRoutes.sendResult(res, {
          data: {
            toast: 'Success'
          }
      });

    } else if (Programs.findOne({"course.courseId":data.courseId},{fields:{"course.$":1}}).course[0].ifCheckin == true) {
      WXAccounts.update({'wxsession.meteorId':data.meteorId},{$addToSet:{checkin:
        {
          programid: programId,
          courseId: data.courseId,
          location: data.location,
          createdAt: new Date
        }
      }});

      //
      JsonRoutes.sendResult(res, {
          data: {
            code: 200,
            toast: 'Success'
          }
      });
    } else {
      console.log('checkin forbidden')
      //
      JsonRoutes.sendResult(res, {
          data: {
            code: 200,
            error: 'checkin not avaliable'
          }
      });
    }

});
