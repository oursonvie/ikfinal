FlowRouter.route('/admin', {
   name: 'adminHome',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'adminHome'});
    }
});


FlowRouter.route('/admin/news', {
   name: 'adminNews',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'adminNews'});
    }
});

FlowRouter.route('/admin/program', {
   name: 'adminProgram',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'adminProgram'});
    }
});

FlowRouter.route('/admin/me', {
   name: 'adminMe',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'adminMe'});
    }
});
