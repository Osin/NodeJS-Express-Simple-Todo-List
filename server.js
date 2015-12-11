var Twig = require("twig"),
    express = require('express'),
    app = express();
app.use('/static', express.static('public'))
    .get('/', function (req, res) {
        res.render('index.twig', {
            message : "Hello World"
        });
    })
    .get('/add', function(req, res){

    })
    .use(function (req, res, next) {
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page introuvable !');
    });
app.listen(8080);