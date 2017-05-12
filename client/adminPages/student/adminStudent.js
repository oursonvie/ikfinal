Template.adminStudent.onCreated(function() {
    var self = this;
    self.autorun(function() {
        // pageNumber = FlowRouter.getParam('page');
        self.subscribe('StudentsAll');
    });
    Session.set('searchEmail', '');
});

Template.adminStudent.helpers({
  totalPageNumber: function() {
    var totalStudentNumber = Students.find().count();
    var pageNumber = Math.ceil(totalStudentNumber/20);

    var pageIndex = [];
    for (var i = 1; i <= pageNumber; i++) {
        pageIndex.push(i);
    }

    return pageIndex
  },
  currentPage: function() {
    return FlowRouter.getParam('page');
  },
  nextPage: function() {
    var totalStudentNumber = Students.find().count();
    var pageNumber = Math.ceil(totalStudentNumber/20);

    if (FlowRouter.getParam('page') == pageNumber) {
      return pageNumber
    } else {
      return parseInt(FlowRouter.getParam('page')) + 1;
    }
  },
  prevPage: function() {
    if (FlowRouter.getParam('page') == 1) {
      return 1
    } else {
      return parseInt(FlowRouter.getParam('page')) - 1;
    }
  },
  students: function() {
    var searchEmail = Session.get('searchEmail');
    if (searchEmail == '') {
      var pageIndex = FlowRouter.getParam('page') - 1;
      return Students.find({},{sort: {createdAt: -1},skip: pageIndex*20, limit: 20});
    } else {
      return Students.find({email:searchEmail},{sort: {createdAt: -1}})
    }
  },
  number: function(number) {
      return (FlowRouter.getParam('page') - 1)  * 20 + number + 1
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
  'click .btn-search': function() {
    var searchValue = $('#searchCrit').val()
    Session.set('searchEmail', searchValue);
  }
});
