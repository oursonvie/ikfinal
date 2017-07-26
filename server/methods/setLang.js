Meteor.methods({
  setLang: function(userId, lang) {
    if (userId) {
      Meteor.users.update({_id:userId},{$set:{profile:{lang:lang}}})
    }    
  }
});
