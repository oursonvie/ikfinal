Meteor.publish('StudentOne', function(id) {
  return Students.find({userId:id});
});

Meteor.publish('StudentsAll', function() {
  return Students.find({});
});

Meteor.publish('StudentsHasProgram', function(programId) {
  // this program should be unique to specific student
  return Students.find({'enrollment.programId':programId})
});

Meteor.publish('StudentDetail', function(id) {
  return Students.find({_id:id});
});
