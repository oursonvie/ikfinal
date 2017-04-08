Meteor.publish('ProgramsAll', function() {
  return Programs.find({});
})

Meteor.publish('ProgramsOne', function(id) {
  return Programs.find({_id:id});
})
