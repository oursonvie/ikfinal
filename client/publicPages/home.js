Template.home.onCreated(function(){
   var self = this;
    self.autorun(function() {
       self.subscribe('NewsAll');
       self.subscribe('ProgramsAll');
    });
});

Template.home.helpers({
  news: function() {
    return News.find({},{sort: {createdAt: -1}, limit:4});
  },
  clean: function(content) {
    return content.replace(/<(?:.|\n)*?>/gm, '').substring(0,50) + ' ...';
  },
  programs: function() {
    return Programs.find({},{sort: {startDate: -1}, limit:4});
  },
  formatDate: function(date) {
      return moment(date).format('YYYY-MM-DD');
  },
  newImg: function() {
    var myRegex = /<img[^>]+src="(http:\/\/[^">]+)"/g;
    var htmlContent = News.findOne({_id:this._id}).content
    var img = myRegex.exec(htmlContent)[0]
    return img+' class="img-thumbnail">';
  }
})
