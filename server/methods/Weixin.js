Meteor.methods({
    'WXStatus': function (status, userId, WXAccountsID){
      if (Roles.userIsInRole(this.userId, ['admin']) == true) {
        WXAccounts.update(
          {_id: WXAccountsID},
          {$set: {"status":status,"bindInformation.vertified":true}}
        )
      } else {
        console.log('err .WXStatus provoked by ' + this.userId)
      }
    },
    'wxAdmin': function(WXAccountsID, status) {
      if (Roles.userIsInRole(this.userId, ['admin']) == true) {
        WXAccounts.update(
          {_id: WXAccountsID},
          {$set: {"ifAdmin":status}}
        )
      } else {
        console.log('err .wxAdmin provoked by ' + this.userId)
      }
    },
    'startCheckin': function(courseId,status) {
      if (Roles.userIsInRole(this.userId, ['admin']) == true) {
        var courses = Programs.findOne({"course.courseId":courseId}).course

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
    }
});
