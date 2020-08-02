
class EventRecommender {
    constructor() {
  
    
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
  
  
     
      
    }
   
    deleteEvent(id) {
        let theRestOfTheEvent=this.events.filter(event=>event.id !==id);
        this.events=theRestOfTheEvent;

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

const user1=new User("Bob", "1");
// const user2=new User("kate");
let recommandation =new EventRecommender();
recommandation.addUser(user1);

console.log("all users: "+recommandation.users)



if (typeof module != 'undefined'){
    module.exports = { EventRecommender, User,  Event} 
}

