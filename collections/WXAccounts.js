WXAccounts = new Mongo.Collection("wxaccounts");

WXCheckinLocation = new Mongo.Collection("wxcheckinlocation");

WXAccounts.allow({
  update: function(userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  }
})
