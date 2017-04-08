Template.me.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('StudentOne', Meteor.userId());
  });
});


Template.me.helpers({
  profileNotExist: function() {
    if (Students.find().count() == 0) {
      return true
    }
    else {
      return false
    }
  },
  student: function() {
    return Students.findOne();
  }
});
