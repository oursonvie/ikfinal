Template.showStudent.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('id');
        self.subscribe('ProgramsOne', id);
        self.subscribe('StudentsHasProgram', id);
    });
});


Template.showStudent.helpers({
    program: function() {
        return Programs.findOne();
    },
    students: function() {
        return Students.find({});
    },
    number: function(number) {
        return number + 1
    }
});

Template.showStudent.events({
    'click .btn-download': function() {
        var programId = this._id;

        var nameFile = 'fileDownload.csv'
        Meteor.call('download', programId, function(err, fileContent) {
            if (fileContent) {
                var blob = new Blob([fileContent], {
                    type: "text/plain;charset=utf-8"
                });
                saveAs(blob, nameFile);
            }
        });
    }
})
