Template.bindingPage.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('WeixinBinding', Meteor.userId());
    });
});

Template.bindingPage.helpers({
  WXAccounts: function() {
    return WXAccounts.find({})
  },
  ifAdmin: function() {
    return this.ifAdmin
  }
})

Template.bindingPage.events({
  'click .btn-pending': function() {
    if (this.status == "1") {
      Meteor.call("WXStatus", 2, Meteor.userId(), this._id)
    }
  },
  'click .fa-wx-admin':function() {
    if (this.ifAdmin == undefined) {
      Meteor.call('wxAdmin', this._id, true)
    } else {
      Meteor.call('wxAdmin', this._id, !this.ifAdmin)
    }

  }
})
