Template.nav.USERNAME = function() {
  return Session.get('username');
}

Template.nav.events =  {
  'click #logout-nav': 
    function(e) {
      Meteor.call('logout', SessionCookie.getKey());
      SessionCookie.updateKey(null);
      Global.initialize();
      return true; // so that the href works
    }
}