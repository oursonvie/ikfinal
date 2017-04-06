Template.singleNews.onCreated(function(){
   var self = this;
    self.autorun(function() {
       var id = FlowRouter.getParam('id');
       self.subscribe('NewsOne', id);
    });
});

Template.singleNews.helpers({
  news: function() {
    return News.findOne();
  }
});
