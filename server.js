
const express= require ("express");
const app= express();
const bp= require("body-parser");
const path= require("path");
const session=require("express-session");
const port=8000;
app.use(express.static(path.join(__dirname,"./login-client/dist")));
app.use(bp.json());

app.use(session({secret:"string of choice "}))
require("./config/mongoose")
require("./config/routes")(app);


app.listen(port, function(){
    console.log("listening")
})