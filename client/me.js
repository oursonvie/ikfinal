Template.me.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('StudentOne', Meteor.userId());
  });
});


Template.me.helpers({
  student: function() {
    return Students.findOne();
  }
});
