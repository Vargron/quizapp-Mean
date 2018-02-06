var mongoose=require("mongoose")
var Schema=mongoose.Schema;
var UserSchema=new Schema({
    username:String,

})

mongoose.model("User", UserSchema);