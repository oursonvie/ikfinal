Template.users.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('allUsers',Meteor.userId());
    });
    Session.set('searchEmail','');
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
    if (this.roles != undefined) {
      return this.roles.includes('admin');
    } else {
      return false
    }
  },
  ifOnline: function() {
    if (this.status != undefined) {
      return this.status.online;
    } else {
      return false;
    }
  }
})

Template.users.events({
  'click .fa-user-circle-add': function(event, template) {
    Meteor.call('makeAdmin', this._id);
  },
  'click .fa-user-circle-remove': function(event, template) {
    Meteor.call('removeAdmin', this._id);
  },
  'click .btn-search': function() {
    var searchValue = $('#searchCrit').val()
    Session.set('searchEmail', searchValue);
  }
})
