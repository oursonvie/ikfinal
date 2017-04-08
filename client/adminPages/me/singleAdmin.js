Template.singleAdmin.onCreated(function() {
  Session.set('editMode', false);
});

Template.singleAdmin.helpers({
  formatDate: function(date) {
    return moment().format('YYYY-MM-DD');
  },
  editMode: function() {
    return Session.get('editMode');
  }
});

Template.singleAdmin.events({
  "click .btn-edit": function(event, template){
    Session.set('editMode', true);
  },
  "click .fa-times": function(event, template){
    Session.set('editMode', false);
  },
  "submit form": function(event, template) {
    Session.set('editMode', false);
  }
});
