Meteor.publish('WeixinBinding', function(userId) {
  if (Roles.userIsInRole(userId, 'admin')) {
    return WXAccounts.find({});
  }
})

Meteor.publish('WXbindInformation', function(programId) {
  return WXAccounts.find({"checkin.programid":programId});
})
