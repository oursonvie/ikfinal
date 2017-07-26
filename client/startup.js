const userLanguage = () => {
  // If the user is logged in, retrieve their saved language
  if (Meteor.user() && !Roles.userIsInRole(Meteor.userId(), 'admin')) return Meteor.user().profile.lang;
};

if (Meteor.isClient) {
  Meteor.startup(() => {
    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      Tracker.autorun(() => {
        let lang;

        // URL Language takes priority
        const urlLang = FlowRouter.getQueryParam('lang');
        if (urlLang) {
          lang = urlLang;
        } else if (userLanguage()) {
          // User language is set if no url lang
          lang = userLanguage();
        } else {
          // If no user language, try setting by browser (default en)
          const localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
          let locale = 'en';

          if (localeFromBrowser.match(/en/)) locale = 'en';
          if (localeFromBrowser.match(/de/)) locale = 'de';
          if (localeFromBrowser.match(/fr/)) locale = 'fr';

          lang = locale;
        }
        TAPi18n.setLanguage(lang);
        accountsUIBootstrap3.setLanguage(lang);
      });
    }
  });
}
