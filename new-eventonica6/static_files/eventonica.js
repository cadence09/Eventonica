
class EventRecommender {
    constructor() {
    // All main properties should go here.
    
    this.events =[];
    this.users = [];
    }

    addEvent(eventName,id,date,category,keyword) {
      let addEventToList=new Event(eventName,id,date,category,keyword)
      this.events.push(addEventToList);
    }

    addUser(newUser,id) {
        let addToThisUser=new User(newUser,id)
       
        this.users.push(addToThisUser);
    }
   
    saveUserEvent(userId, eventId){
        let findEvent;
        let saveUser=this.users.find(data=>data.id===userId)
       
        let saveEvent=this.events.find((data)=>{
            if (data.id === eventId){
                findEvent=data.eventName
            }
            return findEvent;
        })
        saveUser.addPersonEvent(findEvent)
        
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
    constructor (eventName,id,date,category,keyword){
        this.eventName=eventName;
        this.id=id;
         this.date=date;
         this.category=category;
         this.keyword=keyword;
    }  
    
}



if (typeof module != 'undefined'){
    module.exports = { EventRecommender, User,  Event} 
}

