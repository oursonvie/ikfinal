Meteor.publish('StudentOne', function(id) {
  return Students.find({userId:id});
});

Meteor.publish('StudentsAll', function() {
  return Students.find({});
});

Meteor.publish('StudentsHasProgram', function(programId) {
  return Students.find({enrollment:programId});
});
