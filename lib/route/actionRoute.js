// by only setting if admin route, the page wont jump back when you try to enter from normal view to admin view
Accounts.onLogin(function() {
  if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
    FlowRouter.go('adminHome');
  }
});

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
