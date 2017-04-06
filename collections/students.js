import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Students = new Mongo.Collection("student");

Students.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  }
})

Students.attachSchema(new SimpleSchema({
  lastname: {
    type: String,
    label: "*Last Name",
    autoform: {
      group: 'Basic Information'
    }
  },
  middlename: {
    type: String,
    label: "Middle Name",
    optional: true,
    autoform: {
      group: 'Basic Information'
    }
  },
  firstname: {
    type: String,
    label: "*First Name",
    autoform: {
      group: 'Basic Information'
    }
  },
  sex: {
    type: String,
    label: "Gender",
    autoform: {
      group: 'Basic Information',
      type: "select-radio",
      options: function() {return[{label:"Male",value:"Male"},{label:"Female",value:"Female"}]}
    }
  },
  email: {
    type: String,
    label: "Email",
    autoValue:function(){
      return Meteor.user().emails[0].address
    },
    autoform:{
      type: 'hidden'
    }
  },
  dob: {
    type: Date,
    label: "Date of Birth",
    autoform: {
      group: 'Basic Information'
    }
  },
  telephone: {
    type: String,
    label: "Telephone"
  },
  country_of_birth: {
    type: String,
    label: "Country of Birth",
    autoform: {
      type: "select",
      options: function(){return CountryList()}
    }
  },
  country_of_citizenship: {
    type: String,
    label: "Country of Citizenship",
    autoform: {
      type: "select",
      options: function(){return CountryList()}
    }
  },
  studentid: {
    type: String,
    label: "Student No."
  },
  passport: {
    type: String,
    label: "Passport No."
  },
  major: {
    type: String,
    label: "Major"
  },
  education_degree: {
    type: String,
    label: "Education Background",
    autoform: {
      type: "select",
      options: function(){return DegreeList()}
    }
  },
  education_name_of_school: {
    type: String,
    label: "Name of Institute"
  },
  occupation: {
    type: String,
    label: "Occupation",
    autoform: {
      type: "select",
      options: function(){return OccupationList()}
    }
  },
  graduationdate: {
    type: Date,
    label: "Expected Graduation Date"
  },
  degree: {
    type: String,
    label: "Current Degree"
  },
  university: {
    type: String,
    label: "University"
  },
  department: {
    type: String,
    label: "Department"
  },
  enrollment: {
      type: Array,
      optional: true,
      autoform: {
        type:"hidden"
      }
  },
  'enrollment.$': {
      type: String,
      autoform: {
          type:"hidden"
      }
  },
  userId: {
    type: String,
    autoValue:function(){
       return this.userId
     },
     autoform: {
       type: 'hidden'
     }
  }
}, { tracker: Tracker }));
