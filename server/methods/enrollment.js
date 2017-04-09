Meteor.methods({
  enrollProgram(programId, userId) {
    var studentInfo = Students.find({userId:userId}).count();

    if (studentInfo == 0) {
      return 1
    }
    else {
      var studentId = Students.findOne({userId:userId})._id;
      //add program to student, not the otherway around
      resultStudents = Students.update({_id:studentId},{$addToSet:{enrollment:programId}});
      // add student to program
      resultPrograms = Programs.update({_id:programId},{$addToSet:{student:studentId}});
      return 0
    }
  },
  importStudent(data, programId) {
      for (i=0;i<data.length;i++){
        var extendStudent = data[i];
        // add import tag and enrollment status
        extendStudent['import'] = true;
        extendStudent['enrollment'] = [programId];
        var id = Students.insert(extendStudent);
        console.log(id);
        resultPrograms = Programs.update({_id:programId},{$addToSet:{student:id}});
      }
  },
});
