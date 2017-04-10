Meteor.publish('allUsers', function(id) {
  if (Roles.userIsInRole(id, ['admin'])) {
    return Meteor.users.find({});
  }
});
