Meteor.startup(function() { 
  Global.initialize();
  
  Router = new Router();
  Backbone.history.start();
  
  if (!Session.get('username') && SessionCookie.getKey()) {
    console.log('Found session auth token. Calling sessionUser on server...');
    Meteor.call('sessionUser', SessionCookie.getKey(), Global.sessionLoginCallback);
  }
});


Global = {
  loginCallback: function(error, returnVal) {    
    if(!error) {
      SessionCookie.updateKey(returnVal.auth);
      Global.setUser(returnVal);
    } else {
      Global.errorHandler(error);
    }
  },

  sessionLoginCallback: function(error, returnVal) {
    if(!error) {
      Global.setUser(returnVal);
    } else {
      SessionCookie.updateKey(null);
      Global.errorHandler(error);
    }
  },
  
  setUser: function(args) {
    Session.set('name', args.name);
    Session.set('username', args.username);
    console.log('name and username set in session');
    Model.register('Tasks', Task);
    
    TaskSubscription = Meteor.subscribe('Tasks', args.username);
    
    
    if (args.staff) {
      Session.set('manager', true);
      console.log('manager set in session');
      
      StaffSubscription = Meteor.subscribe('Users', args.username);
      
      Router.navigateTo('managerMenu');
    } else {
      Router.navigateTo('staffTaskList');
    }
  },
    
  errorHandler: function(error) {
    if(error && error.error && error.error == 401) {
      Router.navigateTo('login');
      Global.alert('error', error.reason);
    } else {
      Global.alert('error', 'There was an error updating that');
    }
    return false;   
  },
  
  alert: function(type, message) {
    className = 'alert';
    if(type == 'warning' || type == 'info' || type == 'error') {
      className += ' alert-'+type
    }
    if(type == 'warning') {
      message = 'Warning: '+message;
    }
    alert = $('<div class="'+className+'">  <button class="close" data-dismiss="alert">×</button>  '+message+'</div>').alert();
    $('#page').prepend(alert);
  },
  
  initialize: function() {
    // Name of currently logged in user
    Session.set('name', 'Log In');

    // Username of currently logged in user
    Session.set('username', null);

    // Is currently logged in user a manager
    Session.set('manager', false);
    
    // Filter for task list
    Session.set('filter', null);
    
    // Show task
    Session.set('task_id', null);
  }
}


