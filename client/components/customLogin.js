Template.customLogin.events({
  'click .login': function() {
    window.location.href = Meteor.settings.public.ikcestAuthServer + "login?returnUrl=" + Meteor.absoluteUrl() + "loginLanding?lang=en"

  },
  'click .logout': function() {
    Meteor.logout()
    window.location.href = Meteor.settings.public.ikcestAuthServer + 'logout'
  }
})

Template.customLogin.helpers({
  username: function() {
    return Meteor.user().username
  }
})
