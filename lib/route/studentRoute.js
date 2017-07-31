FlowRouter.route('/me', {
   name: 'me',
    action() {
        BlazeLayout.render('StudentLayout', {main: 'me'});
    }
});

FlowRouter.route('/myprogram', {
   name: 'myProgram',
    action() {
        BlazeLayout.render('StudentLayout', {main: 'myProgram'});
    }
});

FlowRouter.route('/redirectPage', {
   name: 'redirectPage',
    action() {
        BlazeLayout.render('StudentLayout', {main: 'redirectPage'});
    }
});
