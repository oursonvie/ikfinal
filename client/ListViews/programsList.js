Template.programsList.onCreated(function() {
  this.editProgram = new ReactiveVar(false);
});

Template.programsList.helpers({
  formatDate: function(date) {
    return moment().format('YYYY-MM-DD');
  },
  editProgram: function() {
    return Template.instance().editProgram.get();
  },
  updateProgramId: function() {
    return this._id;
  }
});

Template.programsList.events({
  'click .btn-edit': function(event, template) {
    template.editProgram.set(!template.editProgram.get());
  },
  'click .btn-enroll': function(event, template) {
    console.log(this._id);
  },
  "submit form": function(event, template) {
    template.editProgram.set(false);
  }
});
