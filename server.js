var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: "kogam22",
    database: "kogam22",
    host: "db.imad.hasura-app.io",
    port: "5432",
    password: process.env.DB_PASSWORD
};



var app = express();
app.use(morgan('combined'));

var articles = {
     'article-one'   : {
    title: 'Article One - Shady Dude',
    heading: 'Article One',
    date: "Aug 5. 2017",
    content: `
            <p>
                    This is The Content For My First Article. Alrighty ? I'mma Copy This A Bunch Of Times So Don't Go Reading Everything Again And Again Till You Go Crazy. Wait, Have You Already Gone Crazy ? Uh . . . Huh I Don't Think So Righty ? Then . . . Bye Bye ! *Wave*  . . . . . . . . . 
            </p>
            
            <p>
                    This is The Content For My First Article. Alrighty ? I'mma Copy This A Bunch Of Times So Don't Go Reading Everything Again And Again Till You Go Crazy. Wait, Have You Already Gone Crazy ? Uh . . . Huh I Don't Think So Righty ? Then . . . Bye Bye ! *Wave*  . . . . . . . . . 
            </p>
            
            <p>
                    This is The Content For My First Article. Alrighty ? I'mma Copy This A Bunch Of Times So Don't Go Reading Everything Again And Again Till You Go Crazy. Wait, Have You Already Gone Crazy ? Uh . . . Huh I Don't Think So Righty ? Then . . . Bye Bye ! *Wave*  . . . . . . . . . 
            </p>`
                        },
     
     'article-two'   : {
    title: 'Article Two - Shady Dude',
    heading: 'Article Two',
    date: "Aug 5. 2017",
    content: `
            <p>
                    This is The Content For My Second Article. Alrighty ? I'mma Copy This A Bunch Of Times So Don't Go Reading Everything Again And Again Till You Go Crazy. Wait, Have You Already Gone Crazy ? Uh . . . Huh I Don't Think So Righty ? Then . . . Bye Bye ! *Wave*  . . . . . . . . . 
            </p>
            
            <p>
                    This is The Content For My Second Article. Alrighty ? I'mma Copy This A Bunch Of Times So Don't Go Reading Everything Again And Again Till You Go Crazy. Wait, Have You Already Gone Crazy ? Uh . . . Huh I Don't Think So Righty ? Then . . . Bye Bye ! *Wave*  . . . . . . . . . 
            </p>
            
            <p>
                    This is The Content For My Second Article. Alrighty ? I'mma Copy This A Bunch Of Times So Don't Go Reading Everything Again And Again Till You Go Crazy. Wait, Have You Already Gone Crazy ? Uh . . . Huh I Don't Think So Righty ? Then . . . Bye Bye ! *Wave*  . . . . . . . . . 
            </p>`
                        },
     
     'article-three' : {
    title: 'Article Three - Shady Dude',
    heading: 'Article Three',
    date: "Aug 5. 2017",
    content: `
            <p>
                    This is The Content For My Third Article. Alrighty ? I'mma Copy This A Bunch Of Times So Don't Go Reading Everything Again And Again Till You Go Crazy. Wait, Have You Already Gone Crazy ? Uh . . . Huh I Don't Think So Righty ? Then . . . Bye Bye ! *Wave*  . . . . . . . . . 
            </p>
            
            <p>
                    This is The Content For My Third Article. Alrighty ? I'mma Copy This A Bunch Of Times So Don't Go Reading Everything Again And Again Till You Go Crazy. Wait, Have You Already Gone Crazy ? Uh . . . Huh I Don't Think So Righty ? Then . . . Bye Bye ! *Wave*  . . . . . . . . . 
            </p>
            
            <p>
                    This is The Content For My Third Article. Alrighty ? I'mma Copy This A Bunch Of Times So Don't Go Reading Everything Again And Again Till You Go Crazy. Wait, Have You Already Gone Crazy ? Uh . . . Huh I Don't Think So Righty ? Then . . . Bye Bye ! *Wave*  . . . . . . . . . 
            </p>`
         
                        },
};

function createTemplate (data) {

    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `

<!DOCTYPE html>
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" consent="width=device-width, initial-scale=1" />
        <!--Above Line Is Used For Adjusting Width Of Screen According To Display-->
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    
    
    <body>
        <div class="container">
            <div>
                <a href='/'>Home</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date.toDateString()}
            </div>
            <div>
               ${content}
            </div>
        </div>
    </body>

</html>
                        `;
    return htmlTemplate;


}

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res){
   //make a select request
   //return a response with the results
   pool.query('SELECT *FROM test', function(err, result) 
       {
          if(err){
                    res.status(500).send(err.toString());
                 } 
          else   {
                    res.send(JSON.stringify(result));
                 }
        });
    
});



var counter = 0;
app.get('/counter', function (req, res) {
      counter = counter + 1;
      res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res) 
{   //URL : /submit-name?name=xxxxxx
    //Get The Names From Request Object
    var name = req.query.name;
    names.push(name);
    // JSON : JavaScript Object Notation
    res.send(JSON.stringify(names));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/articles/:articleName', function (req, res) 
{
    //articleName == article-one
    //articles[articleName] == {} content object for article
    
    pool.query("SELECT *FROM article WHERE title = '" + req.params.articleName + "'", function(err, result)
    {
        if(err) {
                    res.status(500).send(err.toString());
                }
        
        else if(result.rows.length === 0)   
                {
                    res.status(404).send("Article Not Found!");
                }    
        
         else   {
                    var articleData = result.rows[0];
                    res.send(createTemplate(articleData));
                }
    };           

	
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});