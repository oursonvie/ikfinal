Meteor.publish('ProgramsAll', function() {
  return Programs.find({});
})
