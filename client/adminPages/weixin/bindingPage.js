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
    if (this.status == "1") {
      Meteor.call("WXStatus", 2, Meteor.userId(), this._id)
    }
  }
})
