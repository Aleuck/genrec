Template.login.events({
  "submit form": function (event) {
    Meteor.loginWithPassword(
      event.target.matricula.value,
      event.target.senha.value, 
      function (err) {
        console.log(err);
        alert(err.reason);
        event.target.reset();
      });
    return false;
  }
});