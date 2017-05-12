Meteor.methods({
  deleteNews: function(newsId) {
    if (Roles.userIsInRole(this.userId, ['admin']) == true) {
      News.remove({_id:newsId});
    } else {
      console.log('err .duplicateProgram provoked by ' + this.userId)
    }
  }
});
