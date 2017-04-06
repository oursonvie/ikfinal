FlowRouter.route('/admin/news', {
   name: 'adminNews',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'adminNews'});
    }
});
