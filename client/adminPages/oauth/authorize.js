// reactive vars for our UI.
var grantResult = new ReactiveVar(null);
var tokenResult = new ReactiveVar(null);
var getUserIdResult = new ReactiveVar(null);
var clientCount = new ReactiveVar(null);

Template.authorize.onCreated(function() {
    // subscribe to our authorization codes and refresh tokens.
    oAuth2Server.subscribeTo.authCode();
    oAuth2Server.subscribeTo.refreshTokens();

    // get teh client count.
    Meteor.call('clientCount', function(err, cnt) {
        clientCount.set(cnt);
    });
});

Template.authorize.helpers({
    clientCount: function() {
        return clientCount.get();
    }
});


Template.authorize.events({
    /**
     * CONFIG FLOW - Step C1.1
     * Create an authorized client.
     */
    'submit #addClientForm': function (){
        var newClient = {
            active: true,
            clientId: $('#addClientForm input[name="clientId"]').val(),
            redirectUri: $('#addClientForm input[name="redirectUri"]').val(),
            clientSecret: $('#addClientForm input[name="clientSecret"]').val(),
            clientName: $('#addClientForm input[name="clientName"]').val()
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
