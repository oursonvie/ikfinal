Meteor.methods({
  studentsCount:function() {
     return Students.find().count()
  },
  newsCount:function() {
    return News.find().count()
  },
  programCount:function() {
    return Programs.find().count()
  }
});
