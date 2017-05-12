Template.newsBlock.helpers({
  clean: function(content) {
    return content.replace(/<(?:.|\n)*?>/gm, '').substring(0,400) + ' ...';
  }
})

Template.newsBlock.events({
  'click .btn-delete': function() {
    Meteor.call('deleteNews', this._id)
  }
})
