// reactive vars for our UI.
var grantResult = new ReactiveVar(null);
var tokenResult = new ReactiveVar(null);
var getUserIdResult = new ReactiveVar(null);
var clientCount = new ReactiveVar(null);

Template.oauthLogin.onCreated(function() {
    // subscribe to our authorization codes and refresh tokens.
    oAuth2Server.subscribeTo.authCode();
    oAuth2Server.subscribeTo.refreshTokens();

});

Template.oauthLogin.helpers({
  urlParams: function() {
        return getUrlParams();
    },
  isUrlParamsValid: function() {
        var params = getUrlParams();
        return !!params.client_id && !!params.redirect_uri && !!params.response_type;
    },
    grantResult: function() {
        return grantResult.get();
    }
})



Template.oauthLogin.events({
  'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar);
    },
    'click button.authorize': function() {
        console.log('Authorize button clicked.');
        var urlParams = getUrlParams();

        // create an authorization code for the provided client.
        oAuth2Server.callMethod.authCodeGrant(
            urlParams.client_id,
            urlParams.redirect_uri,
            urlParams.response_type,
            urlParams.scope && urlParams.scope.split(' '),
            urlParams.state,
            function(err, result) {
                console.log(err, result);

                // give the UI something to display.
                grantResult.set(result);
            }
        );
    }
});

function getUrlParams() {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    var urlParams = {};
    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }

    return urlParams;
}
