Template.home.onCreated(function(){
   var self = this;
    self.autorun(function() {
       self.subscribe('NewsAll');
    });
});

Template.home.helpers({
  news: function() {
    return News.findOne()
  }
})
