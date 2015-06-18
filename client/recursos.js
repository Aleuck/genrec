Meteor.subscribe("recursos");

Template.recursos.helpers({
recursos: function () {
  return Recursos.find({});
}
});