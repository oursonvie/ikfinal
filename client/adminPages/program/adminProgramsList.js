Template.adminProgramsList.onCreated(function() {
  this.editProgram = new ReactiveVar(false);
});

Template.adminProgramsList.helpers({
  formatDate: function(date) {
    return moment(date).format('YYYY-MM-DD');
  },
  editProgram: function() {
    return Template.instance().editProgram.get();
  },
  updateProgramId: function() {
    return this._id;
  },
  numberEnrolled: function() {
    if (Programs.findOne({_id:this._id}).student == undefined) {
      return 0;
    } else {
      return Programs.findOne({_id:this._id}).student.length;
    }
  }
});

Template.adminProgramsList.events({
  'click .btn-edit': function(event, template) {
    template.editProgram.set(!template.editProgram.get());
  },
  "submit form": function(event, template) {
    template.editProgram.set(false);
  }
});
