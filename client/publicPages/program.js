Template.program.onCreated(function(){
   var self = this;
    self.autorun(function() {
       self.subscribe('ProgramsAll');
    });
});

Template.program.helpers({
  programs: function() {
    return Programs.find();
  }
})
