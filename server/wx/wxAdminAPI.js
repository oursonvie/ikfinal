JsonRoutes.add('get', '/api/wx/admin/program', function(req, res, next) {

  console.log(req.query)

  var data = req.query

  // vertify admin

  var userId = WXAccounts.findOne({'wxsession.meteorId':data.meteorId}).bindInformation.userId

  if (Roles.userIsInRole(userId, ['admin'])) {

    // if admin return avaliable courses
    // get today's date
    var currentDate = moment().format("YYYY-MM-DD")
    // the start date have to -1 to make sure the result is right
    var start = moment(currentDate).add(1,'days').toDate()
    var end = moment(currentDate).toDate()

    var programList = Programs.find({start_date:{$lte: start},end_date:{$gte:end}},{fields:{student:0}}).fetch()

    result = {
      programs: programList
    }

  } else {
    result = {
      err: 'premission denied'
    }
  }

  JsonRoutes.sendResult(res, {
      data: result
  });

});


JsonRoutes.add('get', '/api/wx/admin/wxCourseSelect', function(req, res, next) {

  console.log(req.query)

  var data = req.query

  // vertify admin

  var userId = WXAccounts.findOne({'wxsession.meteorId':data.meteorId}).bindInformation.userId

  if (Roles.userIsInRole(userId, ['admin'])) {

    // this might need to send meteorId to server side for validation
    Meteor.call('wxStartCheckin', data.courseId)

    result = {
      sucess: 1
    }

  } else {
    result = {
      err: 'premission denied'
    }
  }

  JsonRoutes.sendResult(res, {
      data: result
  });

});
