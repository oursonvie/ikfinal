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
    return Programs.find({},{sort: {createdAt: -1}, limit:4});
  },
  formatDate: function(date) {
      return moment(date).format('YYYY-MM-DD');
  },
  daoVoice: function() {
    if (Meteor.userId()) {
      daovoice('init', {
        app_id: "b8de9f2f",
        user_id: Meteor.userId(), // 必填: 该用户在您系统上的唯一ID
        email: Meteor.user().emails[0].address, // 选填:  该用户在您系统上的主邮箱
        name: Meteor.user().emails[0].address, // 选填: 用户名
        signed_up: new Date().getTime() // 选填: 用户的注册时间，用Unix时间戳表示
      });
      daovoice('update');
    } else {
      daovoice('init', {
        app_id: "b8de9f2f"
      });
      daovoice('update');
    }
  },
  newImg: function() {
    var myRegex = /<img[^>]+src="(http:\/\/[^">]+)"/g;
    var htmlContent = News.findOne({_id:this._id}).content
    var img = myRegex.exec(htmlContent)[0]
    return img+' class="img-thumbnail">';
  }
})
