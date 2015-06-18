Accounts.config({
  sendVerificationEmail: false,
  loginExpirationInDays: 3
});
Accounts.validateNewUser(function (currentUser) {
  if(Meteor.user().profile.nivel !== Nivel.ADMINISTRADOR) {
    return false;
  } else {
    //return true;
  }
  throw new Meteor.Error(403, "Username must have at least 3 characters");
});
(function () {
  if(!Meteor.users.findOne()) {
    Accounts.createUser({
      username: "admin",
      email: "admin@genrec",
      password: "admin",
      profile: {
        nome: "Administrador",
        nivel: 1,
        prioridade: 1
      }
    });
  }
})
