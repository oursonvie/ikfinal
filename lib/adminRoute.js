FlowRouter.route('/admin', {
   name: 'adminHome',
    action() {
        BlazeLayout.render('AdminLayoutFloat', {main: 'adminHome'});
    }
});


FlowRouter.route('/admin/news', {
   name: 'adminNews',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'adminNews'});
    }
});
