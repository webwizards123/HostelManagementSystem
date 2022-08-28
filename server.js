const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('css'));
app.use(express.static('img'));

app.get("/",function(req,res){
    res.sendFile(__dirname+'/landingpage.html');
})

app.get("/login",function(req,res){
    res.sendFile(__dirname+'/firstpage.html');
})
app.get("/signup",function(req,res){
    res.sendFile(__dirname+'/registration.html');
})
app.get("/user",function(req,res){
    res.sendFile(__dirname+'/dashboard.html');
})

app.get("/adminlogin",function(req,res){
    res.sendFile(__dirname+'/AdminLogin.html');
})
app.get("/raise",function(req,res){
    res.sendFile(__dirname+"/3rdpage.html");
})
app.post("/", function(req,res){
    var whoami = req.body.who;
    if(whoami == "std"){
        res.redirect("/login");
    }
    else if(whoami == "adm"){
        res.redirect("/adminlogin");
    }
})

app.post("/login",function(req,res){
    var id = req.body.stdid;
    var pass = req.body.passwd;
    res.redirect("/user");
    
})
app.post("/signup",function(req,res){
    var id = req.body.stdid;
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var pass = req.body.passwd;
    var cpass = req.body.cpasswd;
    res.redirect("/user")
})
app.post("/adminlogin", function(req,res){
    var id = req.body.adid;
    var pass = req.body.adpasswd;
    res.redirect("/admin");
})
app.listen(3000,function(){console.log("Server running at port 3000.")})