const userLanguage = () => {
  // If the user is logged in, retrieve their saved language, other defalut language for any user is en
  if (Meteor.user() && !Roles.userIsInRole(Meteor.userId(), 'admin')) {
    if ( Meteor.user().profile && Meteor.user().profile.lang ) {
      return Meteor.user().profile.lang;
    }
  } else if (LocalStore.get('lang')){
    return LocalStore.get('lang')
  }
};

if (Meteor.isClient) {
  Meteor.startup(() => {
    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      Tracker.autorun(() => {
        let lang;

        // URL Language takes priority
        const urlLang = FlowRouter.getQueryParam('lang');

        LocalStore.set('lang', urlLang)

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
