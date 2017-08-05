Meteor.methods({
  setLang: function(userId, lang) {
    if (userId) {
      Meteor.users.update({_id:userId},{$set:{"profile.lang":lang}})
    }
  },
  setStudentId: function(userId, studentId) {
    if (userId) {
      Meteor.users.update({_id:userId},{$set: {"profile.studentId":studentId}})
    }
  }
});
