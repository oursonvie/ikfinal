Template.program.onCreated(function(){
   var self = this;
    self.autorun(function() {
       self.subscribe('ProgramsAll');
       self.subscribe('StudentOne', Meteor.userId());
    });
});

Template.program.helpers({
  programs: function() {
    return Programs.find({},{sort: {start_date: -1}});
  }
})
