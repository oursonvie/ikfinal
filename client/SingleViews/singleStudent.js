Template.singleStudent.onCreated(function() {
  Session.set('editMe', false);
});

Template.singleStudent.helpers({
  formatDate: function(date) {
    return moment().format('YYYY-MM-DD');
  },
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
