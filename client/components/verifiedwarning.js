Template.verifiedwarning.onCreated(function() {
    var self = this;
    self.autorun(function() {
      self.subscribe('StudentOne', Meteor.userId());
    });
    Session.set('time', 0);
});

Template.verifiedwarning.events({
    'click .uploadRedirect' () {
      document.getElementById('photoUpload').click()
    }
});

Template.verifiedwarning.helpers({
    getCountdown: function() {
        return Session.get('time');
    },
    inProgress: function() {
      if (Session.get('time') != 0) {
        return true;
      }
    },
    ifProfile: function() {
      return Students.findOne() != undefined;
    },
    ProfileImage: function() {
      return Students.findOne().profile_image != undefined;
    },
    allDone: function() {
      return Students.findOne() != undefined && Students.findOne().profile_image != undefined
    }
});
