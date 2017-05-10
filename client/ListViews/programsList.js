Template.programsList.onCreated(function() {
    this.editProgram = new ReactiveVar(false);
});

Template.programsList.helpers({
    formatDate: function(date) {
        return moment(date).format('YYYY-MM-DD');
    },
    enrolled: function() {
      if (Students.findOne() == undefined) {
        return false
      } else {
        var enrollmentList = Students.findOne().enrollment;
        return JSON.stringify(enrollmentList).includes(this._id);
      }
    },
    numberEnrolled: function() {
        if (Programs.findOne({
                _id: this._id
            }).student == undefined) {
            return 0;
        } else {
            return Programs.findOne({
                _id: this._id
            }).student.length;
        }
    },
    enrollStauts: function() {
      var enrollmentObj = Students.findOne().enrollment;
      var arrayNo = lodash.findIndex(enrollmentObj, ['programId',this._id])
      if ( arrayNo == -1 ) {
        return 'Enroll'
      } else {
        return Students.findOne().enrollment[arrayNo].status
      }
    },
    enrollCSS: function() {
      var enrollmentObj = Students.findOne().enrollment;
      var arrayNo = lodash.findIndex(enrollmentObj, ['programId',this._id])
      var status =  Students.findOne().enrollment[arrayNo].status
      switch(status) {
        case 'Pending':
          return 'btn-info';
          break;
        case 'Enrolled':
          return 'btn-success';
          break;
      }
    }
});

Template.programsList.events({
    'click .btn-enroll': function(event, template) {
        if (Meteor.user().emails[0].verified == true) {
            Meteor.call('enrollProgram', this._id, Meteor.userId(), function(err, res) {
                if (res == 1) {
                    Bert.alert('You need to fill in your information before enroll in any program', 'danger', 'growl-top-right');
                } else if (res == 2) {
                    Bert.alert('You need upload a profile photo', 'danger', 'growl-top-right');
                } else {
                    Bert.alert('Signup for program, please wait for enrollment confirmation', 'info', 'growl-top-right');
                }
            });
        } else {
            Bert.alert('You need to vertify yout email first', 'danger', 'growl-top-right');
        }
    }
});
