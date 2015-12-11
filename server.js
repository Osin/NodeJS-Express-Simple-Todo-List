var Twig = require("twig"),
    express = require('express'),
    session = require('cookie-session'),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({extended: false}),
    app = express();

app.use(session({secret: 'NodeJS-Express-Simple-Todo-List'}))

    .use('/static', express.static('public'))

    .use(function (req, res, next) {
        if (typeof req.session.todos == 'undefined') {
            req.session.todos = [];
        }
        next();
    })

    .get('/', function (req, res) {
        res.render('index.twig', {
            todos: req.session.todos
        });
    })
    .post('/add', urlencodedParser, function (req, res) {
        req.session.todos.push({'id': req.session.todos.length, 'message': req.body.message, 'completed':false});
        res.render('index.twig', {
            todos: req.session.todos
        });
    })
    .get('/delete/:id', function (req, res) {
        if(req.params.id != ""){
            req.session.todos.splice(req.params.id, 1);
        }
        res.redirect('/');
    })
    .get('/mark-completed/:id', function (req, res) {
        if(req.params.id != ""){
            req.session.todos[req.params.id].completed = true;
        }
        res.redirect('/');
    })
    .use(function (req, res, next) {
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page introuvable !');
    });
app.listen(8080);