Template.me.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('StudentOne', this.userId);
  });
});
