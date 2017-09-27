Template.loginLanding.onCreated(function() {
  var token = getParameterByName('token')
  var username = getParameterByName('userName')
  var lang = getParameterByName('lang')

  TAPi18n.setLanguage(this.code);
  accountsUIBootstrap3.setLanguage(this.code);
  Meteor.call('setLang', Meteor.userId(), this.code)

  // console.log(lang, username, token)
  //Session.set('loginInfo', {username:username, token:token, lang:lang})

  if (username && token) {
    PromiseMeteorCall('validateIkcestUser', username, token).then(res => {
      if (res.code == 200 && username == res.userBaseInfo.userName) {
        LoginUser(res.userBaseInfo)
      } else {
        PromiseMeteorCall('pushChat', 'validateIkcestUser', window.location.href ,res)

        FlowRouter.go('/');
      }
    }).catch(err => {
      console.log(err)
    })
  } else {
    console.log('no login info')
    FlowRouter.go('/');
  }



});

function LoginUser(baseInfo) {
  let username = baseInfo.userName
  // console.log(username)

  let loginRequest = {username: username, baseInfo:baseInfo}

  PromiseMeteorCall('checkIkestUser', username).then(res => {
    if(!res) {

      PromiseMeteorCall('createIkcestUser', username, baseInfo).then(res => {
        // console.log(res)

        // login user after creation
        Accounts.callLoginMethod({
          methodArguments: [loginRequest],
          userCallback: function (err) {
              if (err) {
                console.log(err)
              } else {
                console.log('logged in')

                FlowRouter.go('/')

              }
          }});

      })

    } else {
      Accounts.callLoginMethod({
        methodArguments: [loginRequest],
        userCallback: function (err) {
            if (err) {
              console.log(err)
            } else {
              console.log('logged in')

              console.log(Roles.userIsInRole(Meteor.userId(), ['admin']))

              FlowRouter.go('adminHome')

            }
        }});
    }

  })

}
