var mongoose=require("mongoose")
var Schema=mongoose.Schema;
var QuestionSchema=new Schema({
    
    prompt:String,
    correct:String,

    answers:[String],
    

})

mongoose.model("Question", QuestionSchema);