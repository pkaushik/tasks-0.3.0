Template.login.events = {
  'click #login-button': 
    function (e) { 
      e.preventDefault();
      Meteor.call('login', $('#login-username').val(), $('#login-password').val(), Global.loginCallback);
      return false;
    }
}

Template.login.render = function() {
  $('#page').html(Meteor.ui.render(Template.login));
}