Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  },
  sendToUserLink(userId) {
    return Accounts.sendVerificationEmail( userId );
  }
});
