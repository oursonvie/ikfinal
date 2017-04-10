Template.myForm.helpers({
  profileImg: function() {
    return Meteor.user().profile.image;
  }
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
          var imagesURL = {"profile.image":"/cfs/files/images/" + fileObj._id}
        }
        Meteor.users.update(userId, {$set: imagesURL});
      });
    }
  }
});
