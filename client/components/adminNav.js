Template.adminNav.onCreated(function() {
  Session.set('dashboard', true);
});

Template.adminNav.helpers({
  dashboard: function() {
    return Session.get('dashboard');
  }
});

Template.adminNav.events({
  'click .changeView': function() {
    Session.set('dashboard', !(Session.get('dashboard')));
  }
});
