Template.users.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('allUsers',Meteor.userId());
    });
});

Template.users.helpers({
  users: function() {
    var searchEmail = Session.get('searchEmail');
    if (searchEmail == '') {
      return Meteor.users.find({});
    } else {
      return Meteor.users.find({"emails.address": searchEmail});
    }
  },
  number: function(number) {
      return number + 1
  },
  isAdmin: function() {
    if (Meteor.users.findOne({_id:this._id}).roles != undefined) {
      return Meteor.users.findOne({_id:this._id}).roles.includes('admin');
    } else {
      return false
    }
  }
})

Template.users.events({
  'click .btn-makeadmin': function(event, template) {
    Meteor.call('makeAdmin', this._id);
  },
  'click .btn-search': function() {
    var searchValue = $('#searchCrit').val()
    Session.set('searchEmail', searchValue);
  }
})
