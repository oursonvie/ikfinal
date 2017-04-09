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
    },
    'click .btn-import': function() {
      console.log(123);
    },
    'change #hiddenUpload': function(event, template){
    var filesList = event.currentTarget.files;
    if (filesList.length) {
      console.log('filesList', filesList);

      var file = filesList[0];
      console.log('file', file);

      if (file.type === 'text/csv') {
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          var papaObject = CSV.parse(fileReader.result,{header: true});
          console.log('papaObject', papaObject);

          if (papaObject.data) {
            Meteor.call('insertStudents'){

            }
            var data = papaObject.data;
            for (i=0;i<data.length;i++) {
              var id = Students.insert(data[i]);
              console.log(id);
              var programId = FlowRouter.getParam('id');
          }

          Session.set('uploadedData', papaObject);
        };
        fileReader.onerror = function (e) {
          throw 'Error reading CSV file';
        };
        fileReader.readAsText(file);
      }
    }
  }
})
