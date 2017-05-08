Template.singleProgram.onCreated(function(){
   var self = this;
    self.autorun(function() {
       var id = FlowRouter.getParam('id');
       self.subscribe('ProgramsOne', id);
    });
    Session.set('accordion', false)
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
  },
  ifAccordion: function() {
    return Session.get('accordion')
  }
});

Template.singleProgram.events({
  'click .fa-chevron-left': function() {
    window.history.back();
  },
  'click #accordion': function() {
    Session.set('accordion', !Session.get('accordion'))
  }
})
