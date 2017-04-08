Meteor.publish('AdminOne', function(id) {
  return Admins.find({userId:id});
})
