const express = require("express")
const app=express()
const {EventRecommender, User, Event}= require("./eventonica")
const port =3000;


let user=new User("Kate", 123)



app.listen(port, function(){
    console.log(`app listening on port ${port}`)
})


