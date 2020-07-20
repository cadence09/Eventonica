var supertest =require("supertest");
var should =require("should");

var server =supertest.agent("http://localhost:5000")

describe("display eventonica ", function(){
   it("should return home page", function(){
       server
            .get("/date")
            .data({searchByDate:"tuesday"})
            .expect(200)
            
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.data.should.equal(" ");
            })
   })
})

describe("get some data ", function(){
    it("should return some data", function(){
        server
             .post("/users")
             .send({user :"andy", id:1})
            
             .expect(200)
             .end(function(err,res){
                 
                res.status.should.equal(200);
                
                res.body.data.should.equal({newUser:"andy", id:1});
                 done();
             })
    })
 })