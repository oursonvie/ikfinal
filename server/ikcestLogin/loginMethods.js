Meteor.methods({
  createIkcestUser: function(username, baseInfo) {
    var userId = Accounts.createUser({
			username: username,
      profile: {
        service: 'ikcest',
        baseInfo:baseInfo
      }
		});
    return userId
  },
  checkIkestUser: function(username) {
    if (Meteor.users.findOne({username:username})) {
      return true
    } else {
      return false
    }
  },
  validateIkcestUser: async function(username, token) {
    let result = await httpGetAsync('http://uc.silkroadst.ikcest.org/info',{params:{token:token}})
    return result.data
  }
});
