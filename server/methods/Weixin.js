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
    },
    'wxAdmin': function(WXAccountsID, status) {
      if (Roles.userIsInRole(this.userId, ['admin']) == true) {
        WXAccounts.update(
          {_id: WXAccountsID},
          {$set: {"meteorAccount.ifAdmin":status}}
        )
      } else {
        console.log('err .wxAdmin provoked by ' + this.userId)
      }
    }
});
