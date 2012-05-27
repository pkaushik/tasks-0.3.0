Session = {
  ServerSessions: new Meteor.Collection("ServerSessions"),
  
  delete: function(key) {
    Session.ServerSessions.remove({key: key});
    return true;
  },
  
  // not public!
  create: function(data) {
    var key = Session.generateRandomKey();
    var expires = new Date();
    expires.setDate(expires.getDate()+5);
    Session.serverSession = Session.ServerSessions.insert({data: data, created: new Date(), key: key, expires: expires}); //Set expire time to now to check this works
    return key;
  },
  
  update: function(key, data) {
    var newkey = Session.generateRandomKey(); //Generate a random key to stop session fixation, client will need to update their copy.
    Session.serverSession = Session.ServerSessions.update({key: key}, {$set: {key: newkey, data: data}});
    return newkey;
  },
  
  set: function(data, key) {
    if(!key) {
      return Session.create(data);
    } else {
      return Session.create(data, key);
    }
  },
  
  get: function(key) {
    if(Session.serverSession = Session.ServerSessions.findOne({key: key})) {
      now = new Date();
      if(Session.serverSession.expires < now) {
        Session.garbageCollect();
        throw new Meteor.Error(401, 'Session timeout');
        return false;
      }
      return Session.serverSession;
    } else {
      throw new Meteor.Error(401, 'Invalid session');
      return false;
    }
  },
  
  garbageCollect: function() {
    now = new Date();
    Session.ServerSessions.remove({expires: {$lt: now}})
  },
  
  generateRandomKey: function() {
    return Crypto.SHA256(Math.random().toString());
  }
}

