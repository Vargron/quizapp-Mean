var mongoose=require("mongoose")
var Schema=mongoose.Schema;
var GameSchema=new Schema({
    user:String,
    score:String,
    percentage:String,

})

mongoose.model("Game", GameSchema);