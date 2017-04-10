Template.adminStudent.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('StudentsAll');
    });
    Session.set('searchEmail', '');
});


Template.adminStudent.helpers({
  students: function() {
    var searchEmail = Session.get('searchEmail');
    if (searchEmail == '') {
      return Students.find({});
    } else {
      return Students.find({email:searchEmail})
    }
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
    var searchValue = $('#searchCrit').val()
    Session.set('searchEmail', searchValue);
  }
});
