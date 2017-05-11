Meteor.methods({
  // process csv file for download
  download: function(programId) {
    return CSV.unparse(Students.find({'enrollment.programId':programId},{fields:{'_id':0, 'userId':0, 'enrollment':0, 'profile_image':0}}).fetch());
  }
});
