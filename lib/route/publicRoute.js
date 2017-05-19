FlowRouter.notFound = {
    action: function() {
      BlazeLayout.render('errorLayout', {main: 'notFound'});
    }
};

FlowRouter.route('/', {
   name: 'home',
    action() {
        BlazeLayout.render('MainLayout', {main: 'home'});
    }
});

FlowRouter.route('/news', {
   name: 'news',
    action() {
        BlazeLayout.render('MainLayout', {main: 'news'});
    }
});

FlowRouter.route('/news/:id', {
   name: 'singleNews',
    action() {
        BlazeLayout.render('MainLayout', {main: 'singleNews'});
    }
});

FlowRouter.route('/program', {
   name: 'program',
    action() {
        BlazeLayout.render('MainLayout', {main: 'program'});
    }
});

FlowRouter.route('/program/:id', {
   name: 'singleProgram',
    action() {
        BlazeLayout.render('MainLayout', {main: 'singleProgram'});
    }
});

FlowRouter.route('/oauthLogin', {
   name: 'oauthLogin',
    action() {
        BlazeLayout.render('PlainLayout', {main: 'oauthLogin'});
    }
});
