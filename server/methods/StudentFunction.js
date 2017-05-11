Meteor.methods({
  insertProfileImage(studentId, userId) {
    var imageId = Meteor.users.findOne({_id:userId}).profile.image;
    Students.update({_id:studentId},{$set:{profile_image:imageId}});
  },
  batchInsertImages(studentId, imageId) {
    var imageId = imageId
    var email = Students.findOne({_id:studentId}).email
    Students.update({_id:studentId},{$set:{email:email, profile_image:imageId}});
  },
  fixMissingImage(imageId) {
    var list = Students.find({profile_image:undefined}).fetch()
    _.forEach(list, function(each) {
      var studentId = each._id;
      Students.update({_id:studentId},{$set:{email:email, profile_image:imageId}});

      console.log('inserting image: ' + Students.findOne({_id:studentId}).profile_image)
    })
  },
  changePendingStatus(studentId, programId) {
    // new way to update
      Students.update(
         { _id: studentId, "enrollment.programId": programId },
         { $set: { "enrollment.$.status" : 'Enrolled' } }
      )
    }
});
