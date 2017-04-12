Template.singleStudent.onCreated(function() {
  Session.set('editMe', false);
});

Template.singleStudent.helpers({
  editMe: function() {
    return Session.get('editMe');
  }
});

Template.singleStudent.events({
  "click .btn-edit": function(event, template){
    Session.set('editMe', true);
  },
  "click .fa-times": function(event, template){
    Session.set('editMe', false);
  },
  "submit form": function(event, template) {
    Session.set('editMe', false);
  }
});
