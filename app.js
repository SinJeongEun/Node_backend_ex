var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host     : 'localhost',
    port : 3306,
    user     : 'root',
    password : 'je134679###',
    database : 'jsman'
  })
  connection.connect()


app.listen(3000,function(){
    console.log("start! express server on port 3000");
});

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('veiw engine', 'ejs')

//url routing
app.get('/', function(req,res){
    //res.send("<h1>hi friend</h1>")
    res.sendFile(__dirname + "/public/main.html")
});

app.post('/email_post', function(req,res){
    //get : req.param('email')
    console.log(req.body) //객체{}로 넘어옴
    console.log(req.body.email)//abc@naver.com 만 넘어옴
    //res.send("<h1>welcom " + req.body.email + "!</h1>")
    res.render('email.ejs', {'email' : req.body.email})
});

app.post('/ajax_send_email', function(req, res){
    console.log(req.body.email);
    var responseData = {'result' : 'ok', 'email': req.body.email};
    res.json(responseData);
});