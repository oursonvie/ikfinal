Template.studentDetail.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('id');
        self.subscribe('StudentDetail', id);
    });
    Session.set('studentDetail', false);
});

Template.studentDetail.helpers({
  student: function() {
    return Students.findOne();
  },
  showDetail: function() {
    return Session.get('studentDetail');
  },
  formatDate: function(date) {
    return moment().format('YYYY-MM-DD');
  }
});

Template.studentDetail.events({
  "click .fa-chevron-left": function(event) {
     history.back()
  },
  'click .btn-detail': function(event) {
    Session.set('studentDetail', !Session.get('studentDetail'))
  }
});
