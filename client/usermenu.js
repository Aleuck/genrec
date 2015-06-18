Template.usermenu.events({
  "click .sair": function () {
    Meteor.logout();
  }
});
Template.usermenu.helpers({
  temNivel: function (nivel) {
    var nivelUser = Meteor.user().profile.nivel;
    if (nivelUser === Nivel.ADMINISTRADOR) {
      return true;
    }
    else {
      return (nivel >= nivelUser);
    }
    return true;
  }
});