Meteor.methods({
    'WXStatus': function (status, userId, WXAccountsID){
      if (Roles.userIsInRole(this.userId, ['admin']) == true) {
        WXAccounts.update(
          {_id: WXAccountsID},
          {$set: {"status":status,"bindInformation.vertified":true}}
        )
      } else {
        console.log('err .WXStatus provoked by ' + this.userId)
      }
    },
    'wxAdmin': function(WXAccountsID, status) {
      if (Roles.userIsInRole(this.userId, ['admin']) == true) {
        WXAccounts.update(
          {_id: WXAccountsID},
          {$set: {"ifAdmin":status}}
        )
      } else {
        console.log('err .wxAdmin provoked by ' + this.userId)
      }
    }
});
