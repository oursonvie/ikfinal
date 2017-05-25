// only redirect to admin page when landing page in at root, and logged in as admin

if (Meteor.isClient) {
  Accounts.onLogin(function() {
    var path = FlowRouter.current().path

    if (Roles.userIsInRole(Meteor.userId(), ['admin']) && path === '/') {
      FlowRouter.go('adminHome');
    }
  });
}





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
