Template.bindingPage.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('WeixinBinding', Meteor.userId());
    });
});

Template.bindingPage.helpers({
  bindingInfomration: function() {
    return WXAccounts.find({})
  }
})

Template.bindingPage.events({
  'click .btn-pending': function() {
    var openid = this.meteorAccount.openid
    if (this.status == "Pending") {
      Meteor.call("WXStatus", 'Pass', Meteor.userId(), this._id)
    } else {
      Meteor.call("WXStatus", 'Pending', Meteor.userId(), this._id)
    }
  }
})
