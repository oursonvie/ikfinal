Template.singleAdmin.onCreated(function() {
  Session.set('editAdminMe', false);
});

Template.singleAdmin.helpers({
  formatDate: function(date) {
    return moment().format('YYYY-MM-DD');
  },
  editAdminMe: function() {
    return Session.get('editAdminMe');
  }
});

Template.singleAdmin.events({
  "click .btn-edit": function(event, template){
    Session.set('editAdminMe', true);
  },
  "click .fa-times": function(event, template){
    Session.set('editAdminMe', false);
  },
  "submit form": function(event, template) {
    Session.set('editAdminMe', false);
  }
});
