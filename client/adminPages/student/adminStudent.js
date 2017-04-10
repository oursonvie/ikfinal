Template.adminStudent.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('StudentsAll');
    });
    Session.set('studentDetail', false);
});


Template.adminStudent.helpers({
  students: function() {
    return Students.find({});
  },
  number: function(number) {
      return number + 1
  },
  importStudent: function() {
    if (Students.findOne({_id:this._id}).import != true) {
      return false
    } else {
      return true
    }
  }
});

Template.adminStudent.events({
  'click tr': function(template) {
    FlowRouter.go("/admin/student/" + this._id);
  },
  'click .btn-search': function() {
    var a = $('#searchCrit').val()
    console.log(a)
  }
});
