/*
Accounts.onLogin(function() {
  if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
    FlowRouter.go('/admin');
  }
  else {
    FlowRouter.go('/');
  }
});
*/


Accounts.onLogout(function() {
  FlowRouter.go('/');
});

// email vetification process
FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    Accounts.verifyEmail( params.token, ( error ) =>{
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
        FlowRouter.go( '/program' );
      } else {
        FlowRouter.go( '/program' );
        Bert.alert( 'Email verified! Thanks!', 'success', 'growl-top-right' );
      }
    });
  }
});
