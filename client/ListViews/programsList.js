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
  },
  enrolled: function() {
    var enrollmentList = Students.findOne().enrollment;
    return enrollmentList.includes(this._id);
  },
  numberEnrolled: function() {
    if (Programs.findOne({_id:this._id}).student == undefined) {
      return 0;
    } else {
      return Programs.findOne({_id:this._id}).student.length;
    }
  }
});

Template.programsList.events({
  'click .btn-edit': function(event, template) {
    template.editProgram.set(!template.editProgram.get());
  },
  'click .btn-enroll': function(event, template) {
    if (Meteor.user().emails[0].verified == true) {
      Meteor.call('enrollProgram', this._id, Meteor.userId(), function(err, res){
        if (res==1) {
          Bert.alert( 'You need to fill in your information before enroll in any program', 'danger', 'growl-top-right' );
        } else {
          Bert.alert('Program Enrolled', 'success', 'growl-top-right');
        }
      });
    } else {
      Bert.alert( 'You need to vertify yout email first', 'danger', 'growl-top-right' );
    }
  },
  "submit form": function(event, template) {
    template.editProgram.set(false);
  }
});
