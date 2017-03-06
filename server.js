// library used like express morgan path to configure server
var express = require('express');
var morgan = require('morgan');
var path = require('path');
// creating pool
var Pool = require('pg').Pool;
// creating config
var config = {
    user: 'tanyatalwar',
    database: 'tanyatalwar',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};
var crypto = require('crypto');


var app = express();
app.use(morgan('combined'));
//making javascript object
// for multiple line use back quote
var ArticleOne = {
    title:'Article one|Tanya talwar',
    heading:'Article One',
    date: '12 feb',
    content: 'this is proper patola'
};

//init the counter with 0
var counter = 0;
app.get('/counter', function(req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});
//converted to a string format 
// function createTemplate(data)
// {
// //making html template
// //declaring variable here
// var title = data.title;
// var heading = data.heading;
// var date = data.date;
// var content = data.content;

// var htmlTemplate =`
// <html>
//     <head>
//     <title>
//       Article One !~Tanya Talwar 
//     </title>
//     <meta name="viewport" content="width-device-width, intial-scale-1"/>
//     <link href="/ui/style.css" rel="stylesheet" />
//     <style>
       
//     </style>
//     </head>
    
//     <body>
//         <div class="container">
//         <div>
//             <a href="/">Home</a>
//         </div>
//         <!--horizontal line-->
//         <hr/>
//         <h1>${date}</h1>
//         <h1>${heading}</h1>
//         <h3>${title}</h3>
//         <div>
//         <p>${content}</p>
//         </div>
//         </div>
//     </body>
// </html>
// return createTemplate;
// }


function hash(input,salt){
    //creating a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512,'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input',function(req,res){
    var hasedString = hash(req.params.input, 'this is some random string');
    res.send(hasedString);
});

app.get('/create-user',function(req,res){
    //take username and password and create entry table
    var salt = crypto.getRandomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username, dbString],function (err, result)
    {
       if(err){
          res.status(500).send(err.toString());
      }
      else
      {
          res.send("user sucessfully created" +username);
      } 
    });
});

// for database connection

var pool = new Pool(config);
app.get('/test-db', function(req,res){
    //make a select request
    //return the response with the result
    pool.query('SELECT * FROM test',function(err, result){
      if(err){
          res.status(500).send(err.toString());
      }
      else
      {
          res.send(JSON.stringify(result.rows));
      }
    });
});



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  
});

// for getting the url configure
app.get('/articles/:articleName',function (req, res) {
    var articleName = req.params.articleNames;
    
    pool.query("SELECT * FROM article WHERE title ='"+ req.params.articleNames+ "'", function(err, result)
    {
       if (err){
           res.status(500).send(err.toString());
       }
       else
       {
           if(result.rows.lenght === 0)
           {
               res.status(404).send('Article not found');
           }
           else
           {
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
           }
       }
       
       
    });
   
});

app.get('/article-two',function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three',function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
