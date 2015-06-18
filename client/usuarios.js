Meteor.subscribe("usuarios");

Template.usuarios.helpers({
  usuarios: function () {
    return Meteor.users.find({});
  }
});