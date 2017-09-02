Template.adminProgramsList.onCreated(function() {
  this.editProgram = new ReactiveVar(false);
  this.showSurveyPanel = new ReactiveVar(false);
  this.showQuizPanel = new ReactiveVar(false);
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
    return Template.instance().showSurveyPanel.get();
  },
  showQuizPanel: function() {
    return Template.instance().showQuizPanel.get();
  },
  ifQuiz: function () {
    if (this.course) {
      return true
    } else {
      return false
    }
  }
});

Template.adminProgramsList.events({
  'click .btn-edit': function(event, template) {
    template.editProgram.set(!template.editProgram.get());
  },
  'click .btn-submit': function(event, template) {
    template.editProgram.set(false);
    template.showSurveyPanel.set(false);
    template.showQuizPanel.set(false);
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
  'click .btn-survey' (event, template) {
    template.showSurveyPanel.set(!template.showSurveyPanel.get())
    template.showQuizPanel.set(false)
  },
  'click .btn-quiz' (event, template) {
    template.showQuizPanel.set(!template.showQuizPanel.get())
    template.showSurveyPanel.set(false)
  },
  'click .btn_redirect_wj' () {
    PromiseMeteorCall('wjLogin').then(res => {
      window.open(res, '_blank')
    }).catch( err => {
      console.log(err)
    })
  }
});
