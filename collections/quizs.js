Quizs = new Mongo.Collection("quizs");

Quizs.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  update: function(userId, doc) {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  }
})
