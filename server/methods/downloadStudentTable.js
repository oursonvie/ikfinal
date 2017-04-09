Meteor.methods({
  // process csv file for download
  download: function(programId) {
    return CSV.unparse(Students.find( {enrollment: {$in: [programId]}}, {fields:{'userId':0, 'enrollment':0}} ).fetch());
  }
});
