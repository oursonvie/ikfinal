Template.adminMe.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('AdminOne', Meteor.userId());
  });
});


Template.adminMe.helpers({
  profileNotExist: function() {
    if (Admins.find().count() == 0) {
      return true
    }
    else {
      return false
    }
  },
  admin: function() {
    return Admins.findOne();
  }
});
