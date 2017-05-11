Template.home.onCreated(function(){
   var self = this;
    self.autorun(function() {
       self.subscribe('NewsAll');
       self.subscribe('ProgramsAll');
    });
});

Template.home.helpers({
  news: function() {
    return News.find({});
  },
  clean: function(content) {
    return content.replace(/<(?:.|\n)*?>/gm, '').substring(0,50) + ' ...';
  },
  newImg: function() {
    var myRegex = /<img[^>]+src="(http:\/\/[^">]+)"/g;
    var htmlContent = News.findOne({_id:this._id}).content
    var img = myRegex.exec(htmlContent)[0]
    return img+' class="img-thumbnail">';
  }
})
