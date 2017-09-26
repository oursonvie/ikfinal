Template.loginLanding.onCreated(function() {
  console.log(window.location.href)
  var token = getParameterByName('token')
  var username = getParameterByName('userName')
  var lang = getParameterByName('lang')

  TAPi18n.setLanguage(this.code);
  accountsUIBootstrap3.setLanguage(this.code);
  Meteor.call('setLang', Meteor.userId(), this.code)

  // console.log(lang, username, token)
  //Session.set('loginInfo', {username:username, token:token, lang:lang})

  PromiseMeteorCall('validateIkcestUser', username, token).then(res => {
    if (res.code == 200 && username == res.userBaseInfo.userName) {
      LoginUser(res.userBaseInfo)
    }
  }).catch(err => {
    console.log(err)
  })

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

                window.location.href = '/'

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

              window.location.href = '/'

            }
        }});
    }

  })

}
