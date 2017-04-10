FlowRouter.route('/me', {
   name: 'adminNews',
    action() {
        BlazeLayout.render('StudentLayout', {main: 'me'});
    }
});
