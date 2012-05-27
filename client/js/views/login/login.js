Template.login.events = {
  'click #login-button': 
    function (e) { 
      //e.preventDefault();
      console.log('#login-button clicked');
      Meteor.call('login', $('#login-username').val(), $('#login-password').val(), Async.loginCallback);
      return false;
    }
}

Template.login.render = function() {
  $('#page').html(Template.login());
}