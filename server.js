var Twig = require("twig"),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io  = require('socket.io').listen(server),
    http = require('http').Server(app),
    todos = [];
app.use('/static', express.static('public'))

    .use(function (req, res, next) {
        next();
    })

    .get('/', function (req, res) {
        res.render('index.twig', {
            todos: todos
        });
    })

    .use(function (req, res, next) {
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page introuvable !');
    });

io.sockets.on('connection', function (socket) {
    socket.emit('refreshTodos', todos);
    socket.on('addTodo', function(message){
        todos.push({'id': todos.length, 'message': message, 'completed':false});
        socket.broadcast.emit('refreshTodos', todos);
        socket.emit('refreshTodos', todos);
    });
    socket.on('deleteTodo', function(todoId){
        if(todoId != ""){
            todos.splice(todoId, 1);
        }
        socket.broadcast.emit('refreshTodos', todos);
        socket.emit('refreshTodos', todos);
    });
    socket.on('markCompleted', function(todoId){
        if(todoId != ""){
            todos[todoId].completed = true;
        }
        socket.broadcast.emit('refreshTodos', todos);
        socket.emit('refreshTodos', todos);
    })
});
server.listen(8080);