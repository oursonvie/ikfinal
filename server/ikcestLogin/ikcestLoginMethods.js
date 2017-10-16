Meteor.methods({
  createIkcestUser: function(username, baseInfo) {
    var userId = Accounts.createUser({
			username: username,
      email: baseInfo.email,
      profile: {
        service: 'ikcest',
        baseInfo:baseInfo
      }
		});
    Roles.addUsersToRoles(userId, ['ikcest'])

    PromiseMeteorCall('pushChat', 'createUser', 'validateIkcestUser', baseInfo)

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
    let result = await httpGetAsync( Meteor.settings.public.ikcestAuthServer + 'info',{params:{token:token}})
    return result.data
  }
});
