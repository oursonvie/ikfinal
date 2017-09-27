if ( Meteor.users.find().count() === 0 ) {
    var id = Accounts.createUser({
        email: '183209713@qq.com',
        password: '3hJPOq^b!deWEas1Ru'
    });
    Roles.addUsersToRoles(id, ['admin'])
}
