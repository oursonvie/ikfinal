// reactive vars for our UI.
var clientCount = new ReactiveVar(null);

Template.oauthhome.onCreated(function() {
    // subscribe to our authorization codes and refresh tokens.
    oAuth2Server.subscribeTo.authCode();
    oAuth2Server.subscribeTo.refreshTokens();

    // get the client count.
    Meteor.call('clientCount', function(err, cnt) {
        clientCount.set(cnt);
    });
});

Template.oauthhome.helpers({
    clientCount: function() {
        return clientCount.get();
    }
});


Template.oauthhome.events({
    'click .btn-add': function (){
        var newClient = {
            active: true,
            clientId: $('#clientId').val(),
            redirectUri: $('#redirectUri').val(),
            clientSecret: $('#clientSecret').val(),
            clientName: $('#clientName').val()
        };

        Meteor.call('addClient', newClient, function() {
            Meteor.call('clientCount', function(err, cnt) {
                clientCount.set(cnt);
            });
        });

        return false;
    },
    'click button.deleteAllClients': function() {
        Meteor.call('deleteAllClients', function() {
            Meteor.call('clientCount', function(err, cnt) {
                clientCount.set(cnt);
            });
        });
    }
  });
