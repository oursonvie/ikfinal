FlowRouter.route('/me', {
   name: 'me',
    action() {
        BlazeLayout.render('StudentLayout', {main: 'me'});
    }
});

FlowRouter.route('/redirectPage', {
   name: 'redirectPage',
    action() {
        BlazeLayout.render('StudentLayout', {main: 'redirectPage'});
    }
});
