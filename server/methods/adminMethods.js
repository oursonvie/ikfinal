Meteor.methods({
  makeAdmin: function(userId) {
    Roles.addUsersToRoles(userId, ['admin']);
  },
  removeAdmin: function(userId) {
    Roles.removeUsersFromRoles(userId, ['admin']);
  }
});
