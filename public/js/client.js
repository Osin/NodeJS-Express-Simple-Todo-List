var socket = io.connect('http://localhost:8080');
socket.emit('hello');
socket.on('refreshTodos', function(todos){
  if(todos.length === 0){
    $('#todoList').html(
      '<div href="#" class="list-group-item">' +
        '<em>Il est temps d\'ecrire quelque chose...!</em>' +
      '</div>'
    );
  }else{
    $('#todoList').html('');
   todos.forEach(function(todo){
      if(todo.completed){
        var todoMark = '<i class="fa fa-check-square-o"></i>';
      }else{
        var todoMark = '<span onclick="socket.emit(\'markCompleted\', '+todo.id+');"><i class="fa fa-square-o"></i></span>';
      }
      $('#todoList').prepend('' +
        '<div href="#" class="list-group-item">' +
          '<div class="row">' +
            '<div class="col-xs-1">' + todoMark + '</div>' +
            '<div class="col-xs-10">' + todo.message + '</div>' +
            '<div class="col-xs-1">' +
              '<span onclick="socket.emit(\'deleteTodo\', '+todo.id+');"><i class="fa fa-trash-o"></i></span> ' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    });
  }
});
$('#addTodo').click(function(){
  var message = $('#message').val();
  socket.emit('addTodo', message);
  $('#message').val('');
});