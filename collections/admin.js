import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Admins = new Mongo.Collection("admin");

Admins.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  update: function(userId, doc) {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  }
})

Admins.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "*Name",
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
