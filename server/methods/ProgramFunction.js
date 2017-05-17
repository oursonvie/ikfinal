Meteor.methods({
  enrollProgram(programId, userId) {
    var studentInfo = Students.find({userId:userId}).count();

    if (studentInfo == 0) {
      return 1
    } else if (Students.findOne({userId:userId}).profile_image == undefined) {
      return 2
    } else {
      var studentId = Students.findOne({userId:userId})._id;
      //add program to student, not the otherway around
      resultStudents = Students.update({_id:studentId},{$addToSet:{enrollment:{programId:programId, status:'Pending'}}});
      // add student to program
      resultPrograms = Programs.update({_id:programId},{$addToSet:{student:studentId}});
      return 0
    }
  },
  importStudent(data, programId) {
    if (Roles.userIsInRole(this.userId, ['admin']) == true) {
      var insertHistory = [];
      var errorStop = false;

      for (i=0;i<data.length;i++){
        // init data and add import tag and enrollment status
        var extendStudent = data[i];
        extendStudent['import'] = true;
        extendStudent['enrollment'] = [{'programId':programId,'status':'Complete'}];

        extendStudent['date_of_birth']= moment(extendStudent.date_of_birth).format("YYYY-MM-DD")

        if (errorStop === true) {
          console.log(insertHistory, i);
          for (i=0;i<insertHistory.length;i++) {
            var result = Students.remove({_id:insertHistory[i]});
          }
          break;
        } else {
          var id = Students.insert(extendStudent, function(err,res) {
            if (err) {
              // to find out why something isn't working
              console.log(err);
              errorStop = true;
            }
            else {
              insertHistory.push(id);
            }
          });
        }
        resultPrograms = Programs.update({_id:programId},{$addToSet:{student:id}});
      }
    } else {
      console.log('err .importStudent provoked by ' + this.userId)
    }
  },
  duplicateProgram(id) {
    if (Roles.userIsInRole(this.userId, ['admin']) == true) {
      var copy = Programs.findOne({_id:id},{fields:{_id:0, student:0}})
      Programs.insert(copy)
    } else {
      console.log('err .duplicateProgram provoked by ' + this.userId)
    }
  },
  // use for check enroll stat on serverside?
  checkEnrollment(programId) {
    return Students.findOne({}, {fields:{enrollment:{$elemMatch:{programId:programId}}}}).enrollment
  },
  deleteProgram(programId) {
    if (Roles.userIsInRole(this.userId, ['admin']) == true) {
      return Programs.remove({_id:programId})
    } else {
      console.log('userId: ' + this.userId + 'trying to provoke deleteProgram on ' + programId)
    }
  },
  clearStudent(programId) {
    if (Roles.userIsInRole(this.userId, ['admin']) == true) {
      Programs.update({_id:programId},{$pull:{student:{$exists: true}}})
      return Students.remove({'enrollment.programId':programId})
    } else {
      console.log('userId: ' + this.userId + 'trying to provoke clearStudent on ' + programId)
    }
  },
  removeStudentFromProgram(studentList, programId) {
    if (Roles.userIsInRole(this.userId, ['admin']) == true) {
      _.forEach(studentList, function(studentId) {
        Students.update({_id:studentId},{$pull:{enrollment: {programId: programId}}})
        Programs.update({_id:programId},{$pull:{student:studentId}})
      })
    } else {
      console.log('err .removeStudentFromProgram provoked by ' + this.userId)
    }
  }
});
