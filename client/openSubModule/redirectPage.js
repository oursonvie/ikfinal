Template.redirectPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('StudentOne', Meteor.userId());
  });
  Session.set('linkPara', '');
});


Template.redirectPage.helpers({
  sessionValue: function() {
    return Session.get('linkPara')
  },
  urlValue: function() {
    var url = encodeURIComponent(Session.get('linkPara'))
    return url
  },
  strValue: function() {
    return Session.get('str')
  },
  student: function(){
     return Students.findOne();
  },
  password: function(){
    var fullname = Students.findOne().full_name;
    var email = Meteor.user().emails[0].address;
    var userId = Students.findOne()._id;

    var str = userId + ',' + email + ',' + fullname

    var key = '3dHu3Z3IU9olWRDL';
    var iv = 'mooc2017ikcestxj';

    console.log(str)

    Session.set('str', str);

    Meteor.call('encrypt', key, iv, str);
    Meteor.call('decrypt', key, iv, 'zjZAvh1/maZ5KSPl7u/vaZZLPpBc5X54wAq/rrxTDMlSaEJQrMQwyIlnDt3kJ56n');

    //pre.mooc2u.com/PublicService/LoginHandler.ashx?Method=ikcestlogin&u=

    Meteor.call('encrypt', key, iv, str, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        Session.set('linkPara', res)
      }
    });
  }
});
