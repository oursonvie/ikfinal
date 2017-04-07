Template.singleStudent.onCreated(function() {
  Session.set('editMode', false);
});

Template.singleStudent.helpers({
  formatDate: function(date) {
    return moment().format('YYYY-MM-DD');
  },
  editMode: function() {
    return Session.get('editMode');
  }
});

Template.singleStudent.events({
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
