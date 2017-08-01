Template.adminProgramsList.onCreated(function() {
  this.editProgram = new ReactiveVar(false);
  this.showExamPanel = new ReactiveVar(false);
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
  },
  showExamPanel: function() {
    return Template.instance().showExamPanel.get();
  }
});

Template.adminProgramsList.events({
  'click .btn-edit': function(event, template) {
    template.editProgram.set(!template.editProgram.get());
  },
  'click .btn-submit': function(event, template) {
    template.editProgram.set(false);
    template.showExamPanel.set(false);
  },
  'click .btn-duplicate': function(event, template) {
    Meteor.call('duplicateProgram', this._id);
  },
  'click .btn-delete': function(event, template) {
    var deleteMessage = 'Delete program?'

    if (confirm(deleteMessage)) {
      Meteor.call('deleteProgram', this._id);
    } else {
      console.log('Program delete cancelled')
    }

  },
  'click .btn-exam' (event, template) {
    template.showExamPanel.set(!template.showExamPanel.get())
  },
  'click .btn_redirect_wj' () {
    PromiseMeteorCall('wjLogin').then(res => {
      window.open(res, '_blank')
    }).catch( err => {
      console.log(err)
    })
  }
});
