Template.adminNews.onCreated(function(){
   var self = this;
    self.autorun(function() {
       self.subscribe('NewsAll');
    });
});

Template.adminNews.helpers({
  blogs: function() {
    return News.find();
  }
});

Template.adminNews.events({
    'click .new-blog': function() {
        Session.set('newBlog', true);
    },
    'click .fa-close': function() {
        Session.set('newBlog', false);
    }
});
