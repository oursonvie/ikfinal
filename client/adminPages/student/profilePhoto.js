Template.profilePhoto.onCreated(function() {
    var self = this;
    self.autorun(function() {
      var id = Students.findOne().profile_image;
      self.subscribe('images', id);
    });
});

Template.profilePhoto.helpers({
  profilePhoto: function() {
    return Images.findOne()
  }
})
