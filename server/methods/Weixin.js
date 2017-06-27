Meteor.methods({
    'WXStatus': function (userId, WXAccountsID){
      if (Roles.userIsInRole(this.userId, ['admin']) == true) {
        WXAccounts.update(
          {_id: WXAccountsID},
          {$set: {"bindInformation.vertified":true}}
        )
      } else {
        console.log('err .WXStatus provoked by ' + this.userId)
      }
    },
    'startCheckin': function(courseId) {
      if (Roles.userIsInRole(this.userId, ['admin']) == true) {
        var courses = Programs.findOne({"course.courseId":courseId}).course

        var status = !Programs.findOne({'course.courseId':courseId},{fields:{"course.$":1}}).course[0].ifCheckin

        if (status == true) {
          _.forEach(courses, function(course) {
            if (course.courseId == courseId) {
              status = true
            } else {
              status = false
            }

            Programs.update(
              { "course.courseId": course.courseId },
              { $set: { "course.$.ifCheckin" : status } }
            )

          });
        } else {
          _.forEach(courses, function(course) {
            Programs.update(
              { "course.courseId": course.courseId },
              { $set: { "course.$.ifCheckin" : false } }
            )
          });
        }

      } else {
        console.log('err .startCheckin provoked by ' + this.userId)
      }
    },
    'wxStartCheckin': function(courseId) {

      var courses = Programs.findOne({"course.courseId":courseId}).course

      var status = !Programs.findOne({'course.courseId':courseId},{fields:{"course.$":1}}).course[0].ifCheckin

      if (status == true) {
        _.forEach(courses, function(course) {
          if (course.courseId == courseId) {
            status = true
          } else {
            status = false
          }

          Programs.update(
            { "course.courseId": course.courseId },
            { $set: { "course.$.ifCheckin" : status } }
          )

        });
      } else {
        _.forEach(courses, function(course) {
          Programs.update(
            { "course.courseId": course.courseId },
            { $set: { "course.$.ifCheckin" : false } }
          )
        });
      }

    }
});
