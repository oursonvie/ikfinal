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
  last_name: {
    type: String,
    label: "*Last Name",
    autoform: {
      group: 'Basic Information'
    }
  },
  middle_name: {
    type: String,
    label: "Middle Name",
    optional: true,
    autoform: {
      group: 'Basic Information'
    }
  },
  first_name: {
    type: String,
    label: "*First Name",
    autoform: {
      group: 'Basic Information'
    }
  },
  print_name: {
    type: String,
    label: "*Print Name on Passport",
    autoform: {
      group: 'Basic Information'
    }
  },
  gender: {
    type: String,
    label: "*Gender",
    autoform: {
      group: 'Basic Information',
      type: "select-radio-inline",
      options: function() {return[{label:"Male",value:"Male"},{label:"Female",value:"Female"}]}
    }
  },
  date_of_birth: {
    type: Date,
    label: "*Date of Birth",
    autoform: {
      group: 'Basic Information'
    }
  },
  telephone: {
    type: String,
    label: "*Telephone",
    autoform: {
      group: 'Basic Information'
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
  country_of_birth: {
    type: String,
    label: "*Country of Birth",
    autoform: {
      group: 'Citizenship',
      type: "select",
      options: function(){return CountryList()}
    }
  },
  country_of_citizenship: {
    type: String,
    label: "*Country of Citizenship",
    autoform: {
      group: 'Citizenship',
      type: "select",
      options: function(){return CountryList()}
    }
  },
  passport: {
    type: String,
    label: "*Passport No.",
    autoform: {
      group: 'Citizenship'
    }
  },
  highest_education: {
    type: String,
    label: "*Highest Education",
    autoform: {
      group: 'Education History',
      type: "select",
      options: function(){return HEList()}
    }
  },
  area_of_study: {
    type: String,
    label: "*Area of Study",
    autoform: {
      group: 'Education History',
      type: "select",
      options: function(){return AreaOfStudyList()}
    }
  },
  name_of_institute: {
    type: String,
    label: "Name of Institute",
    optional: true,
    autoform: {
      group: 'Education History'
    }
  },
  university_name: {
    type: String,
    label: "*University Name",
    autoform: {
      group: 'Current Study'
    }
  },
  studentid: {
    type: String,
    label: "*Student No.",
    autoform: {
      group: 'Current Study'
    }
  },
  degree: {
    type: String,
    label: "*Degree",
    autoform: {
      group: 'Current Study',
      type: "select",
      options: function(){return DegreeList()}
    }
  },
  major: {
    type: String,
    label: "*Major",
    autoform: {
      group: 'Current Study',
      type: "select",
      options: function(){return AreaOfStudyList()}
    }
  },
  occupation: {
    type: String,
    label: "Occupation",
    optional: true,
    autoform: {
      group: 'Other',
      type: "select",
      options: function(){return OccupationList()}
    }
  },
  source: {
    type: String,
    label: "Where did you find us?",
    optional: true,
    autoform: {

      group: 'Other',
      type: "select-radio-inline",
      options: function(){return WhereHeardUsList()}
    }
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
  },
  createdAt: {
    type: Date,
    autoValue:function(){
       return new Date
     },
     autoform: {
       type: 'hidden'
     }
  }
}, { tracker: Tracker }));
