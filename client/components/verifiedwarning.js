Template.verifiedwarning.onCreated(function() {
    var self = this;
    self.autorun(function() {
      self.subscribe('StudentOne', Meteor.userId());
    });
    Session.set('time', 0);
});

Template.verifiedwarning.events({
    'click .resend-verification-link' (event, template) {
        Meteor.call('sendVerificationLink', (error, response) => {
            if (error) {
                Bert.alert(error.reason, 'danger', 'growl-top-right');
            } else {
                let email = Meteor.user().emails[0].address;
                Bert.alert(`Verification sent to ${ email }!`, 'success', 'growl-top-right');
            }
        });
    },
    'click .btn-send': function() {
      //set countdown timer to 30s, between each send
      Session.set('time', 30);
      var clock = Session.get('time');
        var timeLeft = function() {
            if (clock > 0) {
                clock--;
                Session.set('time', clock);
            } else {
                return Meteor.clearInterval(interval);
            }
        };
      var interval = Meteor.setInterval(timeLeft, 1000);
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
      return Students.findOne() != undefined && Students.findOne().profile_image != undefined && Meteor.users.findOne().emails[0].verified
    }
});
