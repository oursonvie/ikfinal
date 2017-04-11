Template.myForm.onCreated(function() {
    var self = this;
    self.autorun(function() {
      var id = Meteor.user().profile.image;
      self.subscribe('images', id);
    });
});

Template.myForm.helpers({
  profileImg: function() {
    return Images.findOne();
  },
  profileNotExist: function() {
    if (Images.findOne() == undefined) {
      return false
    }
    else {
      return true
    }
  },
})

Template.myForm.events({
  'change .myFileInput': function(event, template) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      Images.insert(files[i], function (err, fileObj) {
        if (err) {
          console.log(err);
        } else {
          var userId = Meteor.userId();
          var imagesURL = {"profile.image": fileObj._id};
          Meteor.users.update(userId, {$set: imagesURL});
          var studentId = Students.findOne()._id;
          Meteor.call('insertProfileImage', studentId, userId);
        }
      });
    }
  }
});
