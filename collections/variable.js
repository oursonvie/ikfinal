Variables = new Mongo.Collection("variables");

Variables.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  }
})
