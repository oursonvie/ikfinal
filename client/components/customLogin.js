Template.customLogin.events({
  'click .login': function() {
    window.location.href = "http://uc.silkroadst.ikcest.org/login?returnUrl=" + Meteor.absoluteUrl() + "loginLanding?lang=en"

  },
  'click .logout': function() {
    Meteor.logout()
    window.location.href = 'http://uc.silkroadst.ikcest.org/logout'
  }
})

Template.customLogin.helpers({
  username: function() {
    return Meteor.user().username
  }
})
