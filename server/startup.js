Meteor.startup(function () {
  if(Users.find().count() === 0) {
    console.log('Adding in users...');
    var moe = _createUser({username:'moe',password:'secret',name:'Moe Howard',role:'staff'});
    var larry = _createUser({username:'larry',password:'secret',name:'Larry Fine',role:'staff'});
    var curly = _createUser({username:'curly',password:'secret',name:'Curly Howard',staff:[moe, larry],role:'manager'});
     
    console.log('Adding in tasks...');   
    _createTask({
      name:"Frozen Treat Machines",
      subtasks:[
        {order:1,status:"Y",name:"Install gaskets"},
        {order:2,status:"Y",name:"Install mixer blades"},
        {order:3,status:"Y",name:"Fill flavor units"},
        {order:4,status:"Y",name:"Turn on, check freezer unit"}
      ],
      manager: curly
    });
                                                                                                        
    _createTask({
      name:"Open Registers",
      subtasks:[
        {order:1,status:"Y",name:"Turn on all terminals"},
        {order:2,"status":"Y",name:"Balance out cash trays"},
        {order:3,"status":"Y",name:"Check in promo codes"},
        {order:4,"status":"Y",name:"Check register promo placards"}
      ],
      manager:curly,
      assigned:moe
    });
                                                    
    _createTask({
      name:"Freezer Area",
      subtasks:[
        {order:1,status:"Y",name:"Unlock freezer"},
        {order:2,status:"Y",name:"Check daily stock"},
        {order:3,status:"Y",name:"Rotate stock"}
      ],
      manager:curly
    });
                                                    
    _createTask({
      name:"Fryer Area",
      subtasks:[
        {order:1,status:"Y",name:"Check overnight maintenance status"},
        {order:2,status:"Y",name:"Check oil sump connections"},
        {order:3,status:"Y",name:"Turn on, set temperature"}
      ],
      manager:curly,
      assigned:moe
    });
                                                    
    _createTask({
      name:"Open Dining Room",
      subtasks:[
        {order:1,status:"Y",name:"Clean all tables"},
        {order:2,status:"Y",name:"Clean main floor"},
        {order:3,status:"Y",name:"Stock condiments"},
        {order:4,status:"Y",name:"Check / replenish trays"}
      ],
      manager:curly,
      assigned:larry
    });    
  }
});