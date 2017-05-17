Template.showStudent.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('ProgramsOne', id);
    self.subscribe('StudentsHasProgram', id);
    Session.set('selectedStudents',[])
  });
});


Template.showStudent.helpers({
  program: function() {
    return Programs.findOne();
  },
  profilePhoto: function() {
    if (Students.findOne({_id:this._id}).profile_image != undefined) {
      return true
    } else {
      return false
    }
  },
  students: function() {
    return Students.find({});
  },
  number: function(number) {
    return number + 1
  },
  importStudent: function() {
    if (Students.findOne({
        _id: this._id
      }).import != true) {
      return false
    } else {
      return true
    }
  },
  enrollStatus: function() {
    var programId = FlowRouter.getParam('id');
    var enrollmentObj = Students.findOne({_id:this._id}).enrollment;
    var arrayNo = lodash.findIndex(enrollmentObj, ['programId',programId])

    return Students.findOne({_id:this._id}).enrollment[arrayNo].status
  },
  ifEnrolled: function() {
    var programId = FlowRouter.getParam('id');
    var enrollmentObj = Students.findOne({_id:this._id}).enrollment;
    var arrayNo = lodash.findIndex(enrollmentObj, ['programId',programId]);
    var status = Students.findOne({_id:this._id}).enrollment[arrayNo].status;
    if (status == 'Pending') {
      return false
    } else {
      return true
    }
  },
  enrollCSS: function() {
    var programId = FlowRouter.getParam('id');
    var enrollmentObj = Students.findOne({_id:this._id}).enrollment;
    var arrayNo = lodash.findIndex(enrollmentObj, ['programId',programId]);
    var status = Students.findOne({_id:this._id}).enrollment[arrayNo].status;
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
  ifSelected: function() {
    if (Session.get('selectedStudents').length != 0) {
      return true
    } else {
      return false
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
  // import function
  'change #hiddenUpload': function(event, template) {
    var filesList = event.currentTarget.files;
    if (filesList.length) {
      var file = filesList[0];
      if (file.type === 'text/csv') {
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
          var papaObject = CSV.parse(fileReader.result, {
            header: true,
            encoding: "UTF-8"
          });
          console.log('papaObject', papaObject);

          if (papaObject && papaObject.errors.length == 0) {
            Meteor.call('importStudent', papaObject.data, FlowRouter.getParam('id'))
          } else {
            throw papaObject.errors
          }

          Session.set('uploadedData', papaObject);
        };
        fileReader.onerror = function(e) {
          throw 'Error reading CSV file';
        };
        fileReader.readAsText(file);
      }
    }
  },
  'change #photoUpload': function(event, template) {
    var files = event.target.files;
    var photoCount = 0;
    var counter = 0;
    var filesize = 0;

    // check all selection files compare with name in db
    _.forEach(files, function(file) {
      counter += 1;

      if (file.name.includes('+') || file.name.includes('-')) {
        if (file.name.includes('+')) {
          var nameHeader = file.name.split('+')[0]
        } else {
          var nameHeader = file.name.split('-')[0]
        }
      } else {
        var nameHeader = file.name.split('.')[0]
      }

      if (nameHeader.match(/^[0-9]+$/) != null) {

        var programNo = parseInt(nameHeader, 10)
        if (Students.findOne({"programNo": programNo}) != undefined) {
          photoCount += 1
        } else {
          console.log('missing no photo at:' + programNo)
        }
      } else {

        var name = file.name.split('.')[0].replace(/\s+$/, '');

        if (Students.findOne({"full_name": {$regex: new RegExp(name, "i")}      }) != undefined) {
          photoCount += 1;
          var studentId = Students.findOne({"full_name": {$regex: new RegExp(name, "i")}})._id;
        } else {
          console.log('missing: ' + name);
        }
      }


    })

    var resultText = 'Total Section: ' + counter + ', Uploading: ' + photoCount + ', Total Students: ' + Students.find().count()

    if (confirm(resultText)) {
      _.forEach(files, function(file) {

        if (file.name.includes('+') || file.name.includes('-')) {
          if (file.name.includes('+')) {
            var nameHeader = file.name.split('+')[0]
          } else {
            var nameHeader = file.name.split('-')[0]
          }
        } else {
          var nameHeader = file.name.split('.')[0]
        }

        var name = file.name.split('.')[0].replace(/\s+$/, '');

        if (nameHeader.match(/^[0-9]+$/) != null) {
          var programNo = parseInt(nameHeader, 10)

          if (Students.findOne({"programNo":programNo}) != undefined) {
            var studentId = Students.findOne({"programNo":programNo})._id
          }
        } else if (Students.findOne({"full_name": {$regex: new RegExp(name, "i")}}) != undefined) {
          var studentId = Students.findOne({"full_name": {$regex: new RegExp(name, "i")}})._id;
        } else {
          console.log('missing: ' + name);
        }

        // insert if studentId exists

        Images.insert(file, function(err, fileObj) {
            if (err) {
              console.log(err);
            } else {
              var imagesURL = {
                "profile.image": fileObj._id
              };
              var imageId = fileObj._id
              //console.log(fileObj._id);

              // update student info
              Meteor.call('batchInsertImages', studentId, imageId, function(err, res) {
                if (err) {
                  console.log(err)
                } else {
                  var uploaded = Students.find({profile_image:{$exists: true}}).count()
                  var uploadStat = uploaded + '/' + photoCount
                  console.log(uploadStat)
                }
              });
            }
          })


      })
    } else {
      console.log('upload cancelled')
    }
  },
  'click .btn-pending': function(template) {
    var programId = FlowRouter.getParam('id');
    Meteor.call('changeStatus',this._id, programId, 'enrolled');
  },
  'click #checkAll': function(event, template) {
    var result = document.getElementById('checkAll').checked;

    var checkList = Students.find({}).fetch();
    if (result == true) {
      _.forEach(checkList, function(each) {
        document.getElementById(each._id).checked = true
      })
    } else {
      _.forEach(checkList, function(each) {
        document.getElementById(each._id).checked = false
      })
    }
  },
  'click input': function() {
    var checkList = Students.find({}).fetch();
    var selectedList = []

    _.forEach(checkList, function(each) {
      if (document.getElementById(each._id).checked == true) {
        selectedList.push(each._id)
      }
    })

    Session.set('selectedStudents',selectedList)

  },
  'click #pending': function() {
    var programId = FlowRouter.getParam('id');
    var studentList = Session.get('selectedStudents')
    Meteor.call('batchStatusChanging',studentList, programId, 'pending');
  },
  'click #enrolled': function() {
    console.log('enrolled')
    var programId = FlowRouter.getParam('id');
    var studentList = Session.get('selectedStudents')
    Meteor.call('batchStatusChanging',studentList, programId, 'enrolled');
  },
  'click #completed': function() {
    console.log('completed')
    var programId = FlowRouter.getParam('id');
    var studentList = Session.get('selectedStudents');
    Meteor.call('batchStatusChanging',studentList, programId, 'completed');
  },
  'click .btn-delete': function() {
    var deleteMessage = 'Delete selected students in this program?'

    if (confirm(deleteMessage)) {
      var programId = FlowRouter.getParam('id');
      var studentList = Session.get('selectedStudents');
      Meteor.call('removeStudentFromProgram',studentList, programId);
    } else {
      console.log('Delete students cancelled')
    }
    
  }
})
