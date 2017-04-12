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
    },
    importStudent: function() {
      if (Students.findOne({_id:this._id}).import != true) {
        return false
      } else {
        return true
      }
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
    },
    'change #hiddenUpload': function(event, template){
    var filesList = event.currentTarget.files;
    if (filesList.length) {
      var file = filesList[0];
      if (file.type === 'text/csv') {
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          var papaObject = CSV.parse(fileReader.result,{
            header: true,
            encoding: "UTF-8"
          });
          console.log('papaObject', papaObject);

          if (papaObject && papaObject.errors.length==0) {
            Meteor.call('importStudent', papaObject.data, FlowRouter.getParam('id'))
          } else {
            throw papaObject.errors
          }

          Session.set('uploadedData', papaObject);
        };
        fileReader.onerror = function (e) {
          throw 'Error reading CSV file';
        };
        fileReader.readAsText(file);
      }
    }
  },
  'click tr': function(template) {
    FlowRouter.go("/admin/student/" + this._id);
  }
})
