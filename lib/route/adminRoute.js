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
   name: 'adminProgramList',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'adminProgram'});
    }
});

FlowRouter.route('/admin/program/:id', {
   name: 'adminProgram',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'adminProgramPage'});
    }
});

FlowRouter.route('/admin/program/showstudents/:id', {
   name: 'adminProgramStudent',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'showStudent'});
    }
});

FlowRouter.route('/admin/student/page/:page', {
   name: 'adminStudent',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'adminStudent'});
    }
});

FlowRouter.route('/admin/student/:id', {
   name: 'singleStudent',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'studentDetail'});
    }
});

FlowRouter.route('/admin/users', {
   name: 'users',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'users'});
    }
});

FlowRouter.route('/admin/me', {
   name: 'adminMe',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'adminMe'});
    }
});

FlowRouter.route('/admin/oauth', {
   name: 'oauthHome',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'oauthhome'});
    }
});
