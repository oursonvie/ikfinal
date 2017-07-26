Accounts.emailTemplates.siteName = "ikcest.xjtudlc.com";
Accounts.emailTemplates.from = "yunclass@xjtudlc.com";

Accounts.emailTemplates.verifyEmail.subject = (user) => {
  if (user.profile.lang) {
    return TAPi18n.__('emailcontent.subject',{lng:user.profile.lang})
  } else {
    return TAPi18n.__('emailcontent.subject',{lang:'en'})
  }
}

Accounts.emailTemplates.verifyEmail.text = (user, url) => {
  let emailAddress = user.emails[0].address,
    urlWithoutHash = url.replace('#/', ''),
    supportEmail = "yunclass@xjtudlc.com"

  if (user.profile.lang) {
    let lang = user.profile.lang
    if (lang == 'en') {
      let emailBody = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`
      return emailBody
    } else if (lang == 'ru') {
       let emailBody = `Чтобы подтвердить свой адрес электронной почты (${emailAddress}) Посетите следующую ссылку:\n\n${urlWithoutHash}\n\n Если вы не запросили эту проверку, пожалуйста, проигнорируйте это письмо. Если вы чувствуете, что что-то не так, обратитесь в нашу службу поддержки: ${supportEmail}.`
       return emailBody
    }
  } else {
    // default reply is in English
    let emailBody = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`
    return emailBody
  }

}
