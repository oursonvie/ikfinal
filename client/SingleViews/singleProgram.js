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
  },
  formatDate: function(date) {
    return moment(date).format('YYYY-MM-DD');
  },
  numberEnrolled: function() {
    if (Programs.findOne({_id:this._id}).student == undefined) {
      return 0;
    } else {
      return Programs.findOne({_id:this._id}).student.length;
    }
  }
});

Template.singleProgram.events({
  'click .fa-chevron-left': function() {
    window.history.back();
  }
})
