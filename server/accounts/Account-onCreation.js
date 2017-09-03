Accounts.onCreateUser(function (options, user) {
  // during the creation of new user, set email sent status to be false
  user.profile = { emailSent : false }

  return user;
});

Accounts.onLogin(function(user) {

  let currentUser = user.user

  // if the user doesnt get email for email vertification, send him/her one
  if (currentUser && currentUser.profile && currentUser.profile.emailSent == false) {
    Meteor.call('sendToUserLink', currentUser._id)
    Meteor.users.update({_id:currentUser._id},{$set:{"profile.emailSent":true}})
  }

});
