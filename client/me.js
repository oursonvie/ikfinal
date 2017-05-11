Template.me.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('StudentOne', Meteor.userId());
    self.subscribe('EnrolledProgram', Meteor.user().profile.studentId);
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
  },
  enrollment: function() {
    return Students.findOne().enrollment
  },
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
