Template.news.onCreated(function(){
   var self = this;
    self.autorun(function() {
       self.subscribe('NewsAll');
    });
});

Template.news.helpers({
  blogs: function() {
    return News.find({},{sort: {createdAt: -1}});
  }
});
