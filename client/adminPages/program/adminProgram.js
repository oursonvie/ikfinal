Template.adminProgram.onCreated(function(){
   var self = this;
    self.autorun(function() {
       self.subscribe('ProgramsAll');
    });
    Session.set('newProgram', false);
});

Template.adminProgram.helpers({
  programs: function() {
    return Programs.find();
  }
});

Template.adminProgram.events({
    'click .new-program': function() {
        Session.set('newProgram', true);
    },
    'click .fa-close': function() {
        Session.set('newProgram', false);
    }
});
