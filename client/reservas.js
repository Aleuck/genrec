Meteor.subscribe("reservas");

Template.reservas.helpers({
  reservas: function () {
    return reservas.find({});
  }
});