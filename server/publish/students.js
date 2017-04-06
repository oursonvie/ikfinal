Meteor.publish('StudentOne', function(id) {
  return Students.find({userId:id});
})
