Meteor.methods({
    'WXStatus': function (status, userId, WXAccountsID){
      if (Roles.userIsInRole(this.userId, ['admin']) == true) {
        WXAccounts.update(
          {_id: WXAccountsID},
          {$set: {"status":status}}
        )
      } else {
        console.log('err .WXStatus provoked by ' + this.userId)
      }
    }
});
