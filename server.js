const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mysql = require('mysql');
// create connections
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodemysql"
})
//connect to mysql
db.connect(err =>{
    if(err){
        throw err;
    }
    console.log('Mysql connected');
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('css'));
app.use(express.static('img'));

// create data base
app.get("/createdb",(req,res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql,err =>{
        if(err){
            throw err;
        }
        res.send('Database created');
    })
})

// create table
app.get("/createstudent",(req,res)=>{
    let sql = 'CREATE TABLE student(id int AUTO_INCREMENT primary key, stdid varchar(255), fname varchar(255), lname varchar(255), password varchar(255))'
    db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send('Student table created');
    })
})
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
    pass = JSON.parse(JSON.stringify(pass));
    let sql = `select password from student where stdid = \'${id}\'`;
    var arr = [];
    // let query = db.query(sql, (err, result) => {
    //     if (err) {
    //         throw err;
    //     }
    //     for (var i of result)
    //         arr.push(i);
    //     for(var j=0; j<arr.length; j++){
    //         if (pass == arr[j].password){
               
    //         }
    //     }
    // })
    res.redirect("/user");
})
app.get("/insert",(req,res)=>{
    
    
})
app.post("/signup",function(req,res){
    var id = req.body.stdid;
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var pass = req.body.passwd;
    var cpass = req.body.cpasswd;
    if(pass==cpass){
        let obj = {
            stdid: id,
            fname: firstName,
            lname: lastName,
            password: pass
        }
        let sql = 'INSERT INTO student set ?';
        let query = db.query(sql,obj, err => {
            if (err) {
                throw err;
            }
        })
    }
    res.redirect("/user")
})

app.post("/adminlogin", function(req,res){
    var id = req.body.adid;
    var pass = req.body.adpasswd;
    res.redirect("/admin");
})
app.listen(3000,function(){console.log("Server running at port 3000.")})