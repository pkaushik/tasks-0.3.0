Template.managerMenu.NAME = function() {
  return Session.get('name');
}

Template.managerMenu.render = function() {
  $('#page').html(Meteor.ui.render(Template.managerMenu));
}