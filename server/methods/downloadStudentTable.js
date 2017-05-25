Meteor.methods({
  // process csv file for download
  download: function(programId) {
    return CSV.unparse(Students.find({'enrollment.programId':programId}).fetch())
  }
});
