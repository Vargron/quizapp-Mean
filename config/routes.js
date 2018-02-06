var mongoose=require("mongoose")
var users = require(".././controllers/users.js");
var path=require('path')
//this imports the controller that will serve the pages
module.exports=function(app){



    app.post("/login", function(req,res){
        // console.log("hitting login")
        users.login(req,res)
        
    })
    app.get("/session",function(req,res){
        // console.log("hitting routes in express")
        users.checksession(req,res)
    })
    app.get("/clearsession",function(req,res){
        // console.log("hitting routes in express")
        users.clearsession(req,res)
    })
    app.get("/getusers", function(req,res){
        // console.log("hitting /get users route")
        users.getall(req,res);
    })
    app.post("/deleteuser", function(req,res){
        // console.log("hitting delete", req.body)
        users.delete(req,res)
    })
    app.post("/addquestion", function(req,res){
        users.addquestion(req,res)
    })
    app.get("/allquestions", function(req,res){
        console.log("hitting routes")
        users.getallquestions(req,res)
    })
    app.post("/postgame", function(req,res){
        console.log("in post game")
        users.postgame(req,res)
    })
    app.get("/allgames", function(req,res){
        console.log("in all games")
        users.allgames(res,res)
    })

    app.get("**", function(req,res){
        res.redirect("/")
    })

}