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
  changePendingStatus(studentId, arrayNo) {
    // for some reason i can only hard coding the update methods
    switch(arrayNo) {
      case 0:
        Students.update({_id:studentId},{$set:{"enrollment.0.status":'Enrolled'}})
        break;
      case 1:
        Students.update({_id:studentId},{$set:{"enrollment.1.status":'Enrolled'}})
        break;
      case 2:
        Students.update({_id:studentId},{$set:{"enrollment.2.status":'Enrolled'}})
        break;
      case 3:
        Students.update({_id:studentId},{$set:{"enrollment.3.status":'Enrolled'}})
        break;
      case 4:
        Students.update({_id:studentId},{$set:{"enrollment.4.status":'Enrolled'}})
        break;
      case 5:
        Students.update({_id:studentId},{$set:{"enrollment.5.status":'Enrolled'}})
        break;
    }
  }
});
