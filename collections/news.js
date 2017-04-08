News = new Mongo.Collection('news');

News.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  },
  update: function(userId, doc) {
    return !!userId;
  }
})
