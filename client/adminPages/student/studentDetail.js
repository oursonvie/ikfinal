Template.studentDetail.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('id');
        self.subscribe('StudentDetail', id);
        self.subscribe('EnrolledProgram', id);
    });
});

Template.studentDetail.helpers({
  student: function() {
    return Students.findOne();
  },
  enrollment: function() {
    return Students.findOne().enrollment
  },
  enrolledPrograms: function() {
    return Programs.find()
  },
  status: function() {

    var programId = this._id
    var enrollmentObj = Students.findOne({}).enrollment;
    var arrayNo = lodash.findIndex(enrollmentObj, ['programId',programId]);
    var status = Students.findOne({}).enrollment[arrayNo].status;

    return status
  },
  formatDate: function(date) {
    return moment(date).format('YYYY-MM-DD');
  },
  enrollCSS: function(status) {
    switch(status) {
      case 'Pending':
        return 'btn-info';
        break;
      case 'Enrolled':
        return 'btn-success';
        break;
      case 'Complete':
        return 'btn-default';
        break;
    }
  }
});

Template.studentDetail.events({
  "click .fa-chevron-left": function(event) {
     history.back()
  }
});
