Template.managerMenu.NAME = function() {
  return Session.get('name');
}

Template.managerMenu.render = function() {
  // use Meteor.ui.render since the template has not yet been injected into the DOM
  $('#page').html(Meteor.ui.render(Template.managerMenu));
}