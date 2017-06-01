WXAccounts = new Mongo.Collection("wxaccounts");

WXAccounts.allow({
  update: function(userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  }
})
