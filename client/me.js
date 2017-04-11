Template.me.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('StudentOne', Meteor.userId());
  });
});


Template.me.helpers({
  student: function() {
    return Students.findOne();
  },
  profileNotExist: function() {
    if (Students.findOne() == undefined) {
      return true
    } else {
      return false
    }
  }
});

Template.me.events({
  'submit form': function(event) {
    if (Students.findOne()) {
      var userId = Meteor.userId();
      var studentId = Students.findOne()._id
      var profile = {"profile.studentId": studentId};
      Meteor.users.update(userId, {$set: profile})
    }
  }
});
