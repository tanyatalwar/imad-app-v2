// library used like express morgan path to configure server
var express = require('express');
var morgan = require('morgan');
var path = require('path');

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

function createTemplate(data)
{
//making html template
//declaring variable here
var title = data.title;
var heading = data.heading;
var date = data.date;
var content = content.data;

var htmlTemplate =`
<html>
    <head>
    <title>
       Article One !~Tanya Talwar 
    </title>
    <meta name="viewport" content="width-device-width, intial-scale-1"/>
    <link href="/ui/style.css" rel="stylesheet" />
    <style>
       
    </style>
    </head>
    
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <!--horizontal line-->
        <hr/>
        <h1>${date}</h1>
        <h1>${heading}</h1>
        <h3>${title}</h3>
        <div>
        <p>${content}</p>
        </div>
        </div>
    </body>
</html>`;
return createTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  
});
// for getting the url configure
app.get('/article-one',function (req, res) {
   res.sendFile(createTemplate(ArticleOne));
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

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
