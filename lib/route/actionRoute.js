// only redirect to admin page when landing page in at root, and logged in as admin

Accounts.onLogout(function() {
  FlowRouter.go('/');
});

// email vetification process

/*
FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    Accounts.verifyEmail( params.token, ( error ) =>{
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
        FlowRouter.go( '/program' );
      } else {
        FlowRouter.go( '/program' );
        Bert.alert( TAPi18n.__('bertwarning.email_vertified'), 'success', 'growl-top-right' );
      }
    });
  }
});
*/
