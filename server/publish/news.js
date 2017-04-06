Meteor.publish('NewsAll', function() {
  return News.find({});
})

Meteor.publish('NewsOne', function(id) {
  return News.find({_id:id});
})
