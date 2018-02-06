var mongoose=require("mongoose")// extabilishes mongoose operations
var user=mongoose.model("User")//note is replaced by desired variable establishes table equivalent
var session=require("express-session")
var question=mongoose.model("Question")
var game=mongoose.model("Game")

module.exports={
//each of these is a function that serves a route and will be called by said route
//     index:function(req,res){
//         console.log("hello");
//         return res.render("login-client/dist");
//         // test looks like this if you are not sure if your linked
//         // return res.json("index");
//    }
login:function(req,res){
user.find({}, (err,users)=>{
    // console.log(req.session.user)
    // console.log(users, users.length)
    // console.log(req.body)
    var ret={}
    let check=false;
    let tarindex=-1
    
    for (let i=0; i<users.length;i++){
        // console.log(users[i].username,req.body.username)
        if(users[i].username==req.body.username){
            
            check=true;
            ret=users[i]
            // console.log("flag", i)
        }
    }
    console.log(check)
    if (!check){
        // console.log("creating user")
        let bob=new user({username:req.body.username, likes:[]})
        bob.save()
        ret=bob
        

    }
    req.session.username=req.body.username
    req.session.user=ret
//     console.log(req.session.user)

//    console.log(session)
   
   res.json(ret)

})


},
checksession:function(req,res){
    // console.log("in controllers", req.session.username)
    // console.log(req.session.user)
    res.json(req.session.user)
},
clearsession:function(req,res){
    // console.log("in controllers")
    req.session.destroy();
    res.json("sucess")
},
getall:function(req,res){
    // console.log("hitting ucontol getall")
    user.find({}, (err,users)=>{
        // console.log("users",users)
        // console.log("req",req)
        res.json(users)
    })

    
},
delete:function(req,res){
    user.findOneAndRemove({_id:req.body.id}, (err, user)=>{
        // console.log(user)
        res.json(user)
    })
},
addquestion:function(req,res){
    question.create(req.body, (err,done)=>{
        if (err){
            res.json({failure:"fails"})
        }else{
            res.json({sucess:"sucess"})
        }
        
    })
    
},
getallquestions:function(req,res){
    console.log("hittng controler")
    question.find({},(err,questions)=>{
        console.log(questions)
        res.json(questions)
    })
},
postgame:function(req,res){
    game.create(req.body, (err,result)=>{
        if(err){
            res.json(err)
        }else{
            res.json({s:"sucess"})
        }
    })

    
},
allgames:function(req,res){
    console.log("allgames controller")
    game.find({}).sort({score:-1}).exec(
        (err,games)=>{
            console.log(games, "games")
            res.json(games)
        }
    )
}

//).sort({score:-1}).exec(





}