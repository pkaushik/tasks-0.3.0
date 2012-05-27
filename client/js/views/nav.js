Template.nav.USERNAME = function() {
  return Session.get('username');
}

Template.nav.events =  {
  'click #logout-nav': 
    function(e) {
      Meteor.call('logout', SessionCookie.getKey(), Global.logoutCallback);
      return true; // so that the href works
    }
}