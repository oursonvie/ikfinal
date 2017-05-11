Template.singleStudent.onCreated(function() {
  Session.set('editMe', false);
});

Template.singleStudent.helpers({
  editMe: function() {
    return Session.get('editMe');
  },
  enrolledPrograms: function() {
    return Programs.find()
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
  },
  status: function() {

    var programId = this._id
    var enrollmentObj = Students.findOne({}).enrollment;
    var arrayNo = lodash.findIndex(enrollmentObj, ['programId',programId]);
    var status = Students.findOne({}).enrollment[arrayNo].status;

    return status
  }
});

Template.singleStudent.events({
  "click .btn-edit": function(event, template){
    Session.set('editMe', true);
  },
  "click .fa-times": function(event, template){
    Session.set('editMe', false);
  },
  "submit form": function(event, template) {
    Session.set('editMe', false);
  }
});
