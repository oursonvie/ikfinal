Template.singleProgram.onCreated(function(){
   var self = this;
    self.autorun(function() {
       var id = FlowRouter.getParam('id');
       self.subscribe('ProgramsOne', id);
    });
});

Template.singleProgram.helpers({
  program: function() {
    return Programs.findOne();
  }
});
