const express = require("express")

const app=express()
const {EventRecommender, User, Event}= require("./static_files/eventonica")
const bodyParser = require('body-parser');
const port =5000;

var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://postgres:thanhcaden@localhost:5433/eventonica');
// var db = pgp('postgres://tpl1219_12@localhost:5432/eventonica');
// const I_LOVE=require("./config");
// console.log("I love", I_LOVE)


// db.connect()
//     .then(obj => {
//         // Can check the server version here (pg-promise v10.1.0+):
//         // const serverVersion = obj.client.serverVersion;
//       console.log("happy")
//         // obj.done(); // success, release the connection;
//     })
//     .catch(error => {
//         console.log('ERROR:', error.message || error);
//     });

    // db.none('INSERT INTO users(user_name VALUES('kate')', ['John', true])
    // .then(() => {
    //     // success;
    // })
    // .catch(error => {
    //     // error;
    // });



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static("static_files"))

const eventRecommender = new EventRecommender(); 



app.post("/users", function(req,res){

  // console.log(`what is in the req ${(req.body.id)}`) 
  // console.log(`what is in the the user ${(req.body.user)}`) 
  // console.log(`what is in the body ${JSON.stringify(req.body)}`) 

 

    // eventRecommender.addUser(req.body.user,req.body.id);
      // let newUser=eventRecommender.users;
       //res.send(newUser)//{id: 3, newUser: 'eee'}

    // db.query("SELECT * FROM users")
    //   .then ((data)=>{
    //     console.log('>>>>> ',data)
    //     return data;
    //   })
    //   .catch(error =>{
    //         console.log("error: ", error)
    //   })
       
      
     // the response always empty, db.one and .then and .catech not woring
      //db.one('INSERT INTO users (user_name) VALUES($1,$2)', [req.body.id,req.body.user])
    //   //  db.none('INSERT INTO users (user_name) VALUES (${user})', req.body.user)
    //  // console.log("what is the req.body", req.body )
          // .then(() => {
          //         console.log(`in the database: ${res.rows}`)
          //     //     let newUser=eventRecommender.users;
          //     //  res.send(newUser)//{id: 3, newUser: 'eee'}
          //     })
          //     .catch(error => {
          //        console.log("Error", error)
          //   });
    
 //res.send(req.body.user)//{id: 3, newUser: 'eee'}
       db.none('INSERT INTO users (user_name) VALUES ($1)', [req.body.user])
       
       .then (()=>{
          console.log("success inserting data")
          //res.send("inserting data", data)
          //res.status(200).send(data)
          res.send("success inserting data")
      })
      .catch(error =>{
            console.log("fail inserting: ", error)
            
      })
      
 })
  



// delete user
app.delete("/deleteUser", function(req,res){
      // console.log(`deleteUser: ${req.body}`);
      //eventRecommender. deleteUser(req.body.deleteId);
      // let restOfTheUsers= eventRecommender.users;
      // res.send(restOfTheUsers)

      db.result(`DELETE FROM users WHERE id = $1`, [req.body.deleteId])
      .then (()=>{
        console.log("success deleting data")
        res.send("success deleting data")
    })
    .catch(error =>{
          console.log("fail deleting: ", error)
    })
 
   
})


//posting events
app.post("/events", function(req,res){

  // console.log(`what is in the req ${JSON.stringify(req.body)}`) 
  //eventRecommender.addEvent(req.body.event,req.body.id,req.body.date,req.body.category,req.body.keyword);
  // let addNewEvents=eventRecommender.events;
  // console.log(eventRecommender.events)
  // res.send(addNewEvents);
  let values=[
    req.body.event,
    req.body.date,
    req.body.category,
    req.body.keyword
  ]

  // db.query('INSERT INTO events (event_name,event_id,event_date,event_category,event_keyword) VALUES ($1,$2,$3,$4,$5)',values,(err,res)=>{
  //   console.log("success posting the events")
  //   console.log(res.rows);
  //   res.send(res.rows)
  // })
  db.none('INSERT INTO events (event_name,event_date,event_category,event_keyword) VALUES ($1,$2,$3,$4)',values)
      .then(() =>{
          console.log("successfully inserting event")
          res.send("successfully inserting event")
      })
      .catch(( error) =>{
          console.log("error", error)
      })
})

//deleting events
app.delete("/deleteEvent", function(req,res){

  // console.log(`deleteEvent: ${req.body}`);
  // eventRecommender.deleteEvent(req.body.deleteId);
  // let restOfTheEvent= eventRecommender.events;
  // res.send(restOfTheEvent)


  db.result(`DELETE FROM events WHERE id = $1`,[req.body.deleteId])
      .then (()=>{
        console.log("success deleting data")
        res.send("success deleting data")
    })
    .catch(error =>{
          console.log("fail deleting: ", error)
    })
})


// find keyword
app.get("/keyword", function(req,res){

  // console.log(`what is in the keyword ${JSON.stringify(req.body)}`) 

  //eventRecommender.addEvent(req.body.apiName,req.body.apiId,req.body.apiDate,req.body.apiCategory);
  // let addNewEvents=eventRecommender.events;
  // // console.log(`what is in the evetn ${JSON.stringify(addNewEvents)}`)
  // res.send(addNewEvents);

  db.any(`SELECT * FROM events WHERE event_keyword=$1`, [req.body.keyword])
   .then (()=>{
        console.log("Get events that is  matching the keyword")
      
      })
      .catch(error =>{
            console.log("error: ", error)
      })


})


//searching by date
app.get("/date", function(req,res){

  console.log(`searching by date ${req.body.searchByDate}`)
  //eventRecommender.findEventsByDate(req.body.searchByDate)
  
  // let restOfTheEvent= eventRecommender.events;
  // res.send(restOfTheEvent)

  db.one(`SELECT * FROM events WHERE event_date=$1`, [req.body.date])
   .then (()=>{
        console.log('Get events that is  matching the date',)
        
      })
      .catch(error =>{
            console.log("error: ", error)
      })

})

//searching by category
app.get("/category", function(req,res){

  console.log(`searching by category ${req.body.category}`)
  // eventRecommender.findEventsByDate(req.body.category)
  // let restOfTheEvent= eventRecommender.events;
  // res.send(restOfTheEvent)

  db.any(`SELECT * FROM events WHERE event_category=$1`, [req.body.category])
  .then (()=>{
    console.log('Get events that is  matching the category')

  })
  .catch(error =>{
        console.log("error: ", error)
  })
})


// saving personal event
app.post("/personalEvent", function(req,res){
  // console.log(`what is the return from /personalEvent ${JSON.stringify(req.body)}`)
  //eventRecommender.saveUserEvent(req.body.id,req.body.event);
  // const personalUser=new User();
  // console.log(personalUser.personalEvent)
  // res.send("success")
  db.query('INSERT INTO user_events (user_id,event_id) VALUES ($1,$2)', [req.body.id,req.body.event],(err,res)=>{
    console.log("success")
  
    res.send(res.rows)
  })

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


