Meteor.publish('WeixinBinding', function(userId) {
  if (Roles.userIsInRole(userId, 'admin'))
    return WXAccounts.find({});
})
