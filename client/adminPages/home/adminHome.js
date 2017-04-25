Template.adminHome.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('StudentsAll');
    self.subscribe('NewsAll');
    self.subscribe('ProgramsAll');
  });
});

Template.adminHome.helpers({
  studentCount: function() {
    return Students.find().count()
  },
  newsCount: function() {
    return News.find().count()
  },
  programCount: function() {
    return Programs.find().count()
  }
});
