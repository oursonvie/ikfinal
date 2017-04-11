Meteor.methods({
  makeAdmin: function(userId) {
    Roles.addUsersToRoles(userId, ['admin']);
  }
});
