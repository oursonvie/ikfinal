Meteor.publish('variables', function(id) {
  if (Roles.userIsInRole(id, ['admin'])) {
    return Variables.find();
  }
});
