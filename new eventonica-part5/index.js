const express = require("express")
const app=express()
const {EventRecommender, User, Event}= require("./static_files/eventonica")
const bodyParser = require('body-parser');
const port =3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static("static_files"))

const eventRecommender = new EventRecommender(); 
app.post("/users", function(req,res){
  console.log(`what is in the req ${(req.body.id)}`) 
  console.log(`what is in the the user ${(req.body.user)}`) 
  console.log(`what is in the body ${JSON.stringify(req.body)}`) 

  // let newUsers=req.body;
    eventRecommender.addUser(req.body.user,req.body.id);
    //  console.log(eventRecommender.users)
    let newUser=eventRecommender.users;
   
      // console.log('eventRecommender.users ', eventRecommender.users)
 res.send(newUser) //{id: 3, newUser: 'eee'}
})

// delete user
app.delete("/deleteUser", function(req,res){
      console.log(`deleteUser: ${req.body}`);
      eventRecommender. deleteUser(req.body.deleteId);
      let restOfTheUsers= eventRecommender.users;
      res.send(restOfTheUsers)
})

//posting events
app.post("/events", function(req,res){
  console.log(`what is in the req ${JSON.stringify(req.body)}`) 
  eventRecommender.addEvent(req.body.event,req.body.id,req.body.date,req.body.category,req.body.keyword);
  let addNewEvents=eventRecommender.events;
  console.log(eventRecommender.events)
  res.send(addNewEvents);
})

//deleting events
app.delete("/deleteEvent", function(req,res){
  console.log(`deleteEvent: ${req.body}`);
  eventRecommender.deleteEvent(req.body.deleteId);
  let restOfTheEvent= eventRecommender.events;
  res.send(restOfTheEvent)
})


// find keyword
app.post("/keyword", function(req,res){
  console.log(`what is in the keyword ${JSON.stringify(req.body)}`) 

  eventRecommender.addEvent(req.body.apiName,req.body.apiId,req.body.apiDate,req.body.apiCategory);
  let addNewEvents=eventRecommender.events;
  // console.log(`what is in the evetn ${JSON.stringify(addNewEvents)}`)
  res.send(addNewEvents);
})


//searching by date
app.get("/date", function(req,res){
  console.log(`searching by date ${req.body.searchByDate}`)
  eventRecommender.findEventsByDate(req.body.searchByDate)
  let restOfTheEvent= eventRecommender.events;
  res.send(restOfTheEvent)
})

//searching by category
app.get("/category", function(req,res){
  console.log(`searching by category ${req.body.category}`)
  eventRecommender.findEventsByDate(req.body.category)
  let restOfTheEvent= eventRecommender.events;
  res.send(restOfTheEvent)
})

app.post("/personalEvent", function(req,res){
   console.log(`what is the return from /personalEvent ${JSON.stringify(req.body)}`)
  eventRecommender.saveUserEvent(req.body.id,req.body.event);
  const personalUser=new User();
  console.log(personalUser.personalEvent)
  res.send("success")

})
//testing
// app.get("/", (req,res)=>res.send("Hello hooo"))
// app.listen(port, ()=> console.log(`Example app listening on port ${port}`));aa

// app.post("/", (req,res)=>{
//     res.send('success')
// })

// app.put("/", function(req,res){
//     res.send("send")
// })


// app.use(express.static("/eventonica-part5"))
// let recommender=new EventRecommender();
// recommender.addUser("Kate", 123)
// console.log(recommender.users)

// app.get("/users", function(req,res){
//     res.send(recommender.users)
// })





app.listen(port, function(){
    console.log(`app listening on port ${port}`)
})


