Template.cadastrousuario.events({
  "submit form": function (event) {
    Accounts.createUser({
      username: event.target.matricula.value,
      email: event.target.email.value,
      password: event.target.senha.value,
      profile: {
        nome: event.target.nome.value,
        nivel: parseInt(event.target.nivel.value, 10),
        prioridade: parseInt(event.target.prioridade.value, 10)
      }
    }, function (err) {
      if (!err) {
        event.target.reset();
      }
    });
    Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.email': "admin@genrec" }} );
    return false;
  }
})