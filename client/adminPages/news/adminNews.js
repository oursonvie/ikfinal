Template.adminNews.onCreated(function(){
   var self = this;
    self.autorun(function() {
       self.subscribe('NewsAll');
    });
    Session.set('newNews', false);
});

Template.adminNews.helpers({
  news: function() {
    return News.find({},{sort: {createdAt: -1}});
  }
});

Template.adminNews.events({
    'click .new-blog': function() {
        Session.set('newNews', !Session.get('newNews'));
    },
    'submit form': function() {
      Session.set('newNews', false);
    }
});
