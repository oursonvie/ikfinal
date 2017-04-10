FlowRouter.route('/me', {
   name: 'me',
    action() {
        BlazeLayout.render('StudentLayout', {main: 'me'});
    }
});
