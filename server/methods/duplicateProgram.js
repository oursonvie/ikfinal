Meteor.methods({
  duplicateProgram(id) {
    var copy = Programs.findOne({_id:id},{fields:{_id:0, student:0}})
    Programs.insert(copy)
  }
});
