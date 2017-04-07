Meteor.publish('StudentOne', function(id) {
  return Students.find({userId:id});
})

Meteor.publish('StudentsAll', function() {
  return Students.find({});
})
