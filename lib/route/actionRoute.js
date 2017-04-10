/*
Accounts.onLogin(function() {
  if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
    FlowRouter.go('/admin');
  }
  else {
    FlowRouter.go('/');
  }

});
*/

Accounts.onLogout(function() {
  FlowRouter.go('/');
});
