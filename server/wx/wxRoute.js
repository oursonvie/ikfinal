var randomChar = function ()
{
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 4; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

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

          // add time for session
          sessionInfo.updatedAt = new Date();

          // define WX user
          var wxUser = WXAccounts.findOne({openid:sessionInfo.openid})

          // only unique openid can be saved in DB
          if (wxUser == undefined) {
            // insert session into DB
            WXAccounts.insert({openid:sessionInfo.openid, session:sessionInfo, status:0});
          } else if (WXAccounts.findOne({openid:sessionInfo.openid}).session.session_key != sessionInfo.session_key){
            // else update session information
            WXAccounts.update({openid:sessionInfo.openid}, {$set:{session:sessionInfo}});
          }

          // return null bindInformation when doest not exist
          if (wxUser && wxUser.bindInformation) {
            var bindInformation = wxUser.bindInformation
          } else {
            var bindInformation = null
          }

          JsonRoutes.sendResult(res, {
              data: {
                meteorAccount: {
                  openid: sessionInfo.openid,
                  status: WXAccounts.findOne({openid:sessionInfo.openid}).status,
                  ifAdmin: WXAccounts.findOne({openid:sessionInfo.openid}).ifAdmin
                },
                bindInformation: bindInformation
              }
          });

        } else {
          console.log('error')
        }
      }
    });

});

JsonRoutes.add('get', '/api/wx/getUserInfo', function(req, res, next) {

    var data = req.query

    var openid = data.openid
    var userInfo = JSON.parse(data.userInfo)



    if (WXAccounts.findOne({openid:openid}).userInfo == undefined) {
      userInfo.updatedAt = new Date()
      WXAccounts.update({openid:openid},{$set:{userInfo:userInfo}})
    } else {
      // compare with local userInfo, after deleting updatedAt
      var localUserInfo = WXAccounts.findOne({openid:openid}).userInfo
      delete localUserInfo.updatedAt

      if (JSON.stringify(userInfo) != JSON.stringify(localUserInfo)) {
        userInfo.updatedAt = new Date()
        WXAccounts.update({openid:openid},{$set:{userInfo:userInfo}})
      }
    }




});

JsonRoutes.add('get', '/api/wx/accountbind', function(req, res, next) {

    var data = req.query
    var email = data.email
    var passPhase = randomChar()

    console.log('binding passphase: ' + passPhase)

    // push passphase to beary for testing
    var content = 'binding passphase: ' + passPhase

    Meteor.call('pushToChat', content)

    console.log(email)

    if (Students.find({email:email}).count() == 1) {
      var studentid = Students.findOne({email:email})._id
      var result = WXAccounts.update({openid:data.openid},{$set:{"bindInformation.email":email, "bindInformation.studentid":studentid, "bindInformation.passPhase":passPhase, "bindInformation.vertified":false, status:1}})

      JsonRoutes.sendResult(res, {
          data: {
            result : result
          }
      });
    } else {
      console.log('cannot find student')
    }




});

JsonRoutes.add('get', '/api/wx/emailVertify', function(req, res, next) {

    var data = req.query
    if (WXAccounts.findOne({openid:data.openid}).bindInformation.passPhase == data.passphase) {
      WXAccounts.update({openid:data.openid},{$set:{"bindInformation.vertified":true}})
      var result = {
        code: 200
      }
    } else {
      console.log('wrong passphase')
      var result = {
        error: 'wrong passphase'
      }
    }

    JsonRoutes.sendResult(res, {
        data: {
          result
        }
    });

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

JsonRoutes.add('get', '/api/wx/studentprogram', function(req, res, next) {
    var openid= req.query.openid
    // program api should take no parameter
    var studentid = WXAccounts.findOne({openid:openid}).bindInformation.studentid

    var enrollment = Students.findOne({_id:studentid}).enrollment

    // list student enrolled program
    var enrolledProgramIds = []

    // only return enrolled program, pending will be able to checkin
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

    // console.log('avaliabled program: ' + avaliableProgramList);

    // get avaliable for perticular student
    var resultPL = []

    _.forEach(enrolledProgramIds, function(program) {
      if (avaliableProgramList.includes(program)) {
        resultPL.push(program)
      }
    });


    // return only checkin avaliable course
    var result = Programs.find({_id:{$in:resultPL},"course.ifCheckin":true},{fields:{subject:1, start_date: 1, end_date: 1, "course.$":1 }}).fetch()

    var courseId = result[0].course[0].courseId

    if (WXAccounts.findOne({openid:openid,"checkin.courseId":courseId},{fields:{"checkin.$":1}})) {
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

    console.log('GET /api/wx/studentprogram')

});

JsonRoutes.add('get', '/api/wx/checkin', function(req, res, next) {

    var data = req.query


    var studentId = WXAccounts.findOne({openid:data.openid}).bindInformation.studentid

    var programId = Programs.findOne({"course.courseId":data.courseId})._id

    // console.log(studentId, programId)

    // check if checkin data existed in database
    if (WXAccounts.find({openid: data.openid, "checkin.programid": programId, "checkin.courseId": data.courseId}).count() == 1) {
      console.log('checkin infromation already exist')

      JsonRoutes.sendResult(res, {
          data: {
            toast: 'Success'
          }
      });

    } else if (Programs.findOne({"course.courseId":data.courseId},{fields:{"course.$":1}}).course[0].ifCheckin == true) {
      WXAccounts.update({openid:data.openid},{$addToSet:{checkin:
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
