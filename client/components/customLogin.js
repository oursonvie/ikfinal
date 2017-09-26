Template.customLogin.events({
  'click .login': function() {
    console.log('login')

    window.location.href = "http://uc.silkroadst.ikcest.org/login?returnUrl=" + Meteor.absoluteUrl() + "loginLanding?lang=en"

  },
  'click .logout': function() {
    console.log('logout')

    Meteor.logout()
  }
})

Template.customLogin.helpers({
  username: function() {
    return Meteor.user().username
  }
})
