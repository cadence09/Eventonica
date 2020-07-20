
class EventRecommender {
    constructor() {
    // All main properties should go here.
    
    this.events =[];
    this.users = [];
    }

    addEvent(eventName,id,date,category) {
      let addEventToList=new Event(eventName,id,date,category)
      this.events.push(addEventToList);
    }

    addUser(newUser,id) {
        let addToThisUser=new User(newUser,id)
       
        this.users.push(addToThisUser);
    }
   
    saveUserEvent(user, eventId){
       
       user.addPersonEvent(event)

       // Allow users to save events to a personal Events array.
    }

    deleteUser(id) {
      let theRestOfTheUsers=this.users.filter(user =>user.id !==id);
      this.users=theRestOfTheUsers;
  
//         // console.log(event.users, )
//         console.log(`before splicing: :${JSON.stringify(this.users)}`);
//       this.users.splice(this.users.indexOf(user),1);
//       console.log(`after splicing: ${JSON.stringify(this.users)}`);
//   return this.users
  
     
      
    }
   
    deleteEvent(id) {
        let theRestOfTheEvent=this.events.filter(event=>event.id !==id);
        this.events=theRestOfTheEvent;
//         this.events.splice(this.events.indexOf(event),1);
//   return this.events
    }

    findEventsByDate(dates){
        
      let eliEvent=[]
       for (let i=0; i<this.events.length; i++){
          if(dates===this.events[i].date){
              eliEvent.push(this.events[i].eventName)
          }
       }return eliEvent;
      
    }
    
    findEventsbyCategory(category){
       let matchCategory=[]
       for (let i=0; i<this.events.length; i++){
          if(category===this.events[i].category){
              matchCategory.push(this.events[i].eventName)
          }
       }return matchCategory;
    }
}

class User{
    constructor(newUser,id){
       this.newUser=newUser;
        this.id=id;
        this.personalEvent=[]
    }
    addPersonEvent(event){
        this.personalEvent.push(event);
    }
    
}
class Event{
    constructor (eventName,id,date,category){
        this.eventName=eventName;
        this.id=id;
         this.date=date;
         this.category=category;
    }  
    
}

// const value1 = "Hello"
// const value2 = 2
// const value3 = new Date();
// const foo = [];



// const event1= new Event("happy Hour After Work","Tuesday", "happy hour");
// const event2 =new Event("Weekend Pinic","Sunday", "happy weekend");
const user1=new User("Bob", "1");
// const user2=new User("kate");
let recommandation =new EventRecommender();
recommandation.addUser(user1);
// recommandation.addUser(user2);
// recommandation.addEvent(event1);
// recommandation.addEvent(event2);
// user1.addPersonEvent("Studying");
// recommandation.deleteUser(user1)
console.log("all users: "+recommandation.users)



//all the events that is under the EventRecommender
// console.log(recommandation.events)
// console.log(recommandation.users[0])
// console.log(`recommandation.deleteUser(user1): ${JSON.stringify(recommandation.deleteUser(user1))}`);
// testing to see if search by date and category works
// console.log(recommandation.events);
// console.log(recommandation.users);
// console.log(recommandation.findEventsByDate("Tuesday"));
// console.log(recommandation.findEventsbyCategory("happy weekend"));

if (typeof module != 'undefined'){
    module.exports = { EventRecommender, User,  Event} 
}

