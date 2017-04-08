Meteor.methods({
  enrollProgram(programId, userId) {
    var studentInfo = Students.find({userId:userId}).count();

    if (studentInfo == 0) {
      return 1
    }
    else {
      var studentId = Students.findOne({userId:userId})._id;
      //add program to student, not the otherway around
      resultStudents = Students.update({_id:studentId},{$addToSet:{enrollment:programId}})
      return 0
    }
  }
});
