//function handleClick() {
// var newText = $('#greetingText').val
//  $(this).text($(this).next().val());----- makes buttons of similar use, the same
//};


function handleClick() {
  $('#greeting').text($('#greetingText').val());
};

$('#greeting').on('click', handleClick);

function onBtnHover() {
  $(this).css({"background-color" : "red" })
}

function btnHover() {
  $(this).css({"background-color" : "blue" })
}

$('#greeting').on("mouseenter", onBtnHover)
$('#greeting').on("mouseleave", btnHover)


var ToDo = [
  {id: Math.floor(Math.random()*100), title:"Git 'er Done" , date: "june 3rd"},
  {id: Math.floor(Math.random()*100), title:"do stuff" , date: "june 4th"},
  {id: Math.floor(Math.random()*100), title:"invent sweet stuff" , date: "june 5th"},
  {id: Math.floor(Math.random()*100), title:"get rich" , date: "june 6th"},
]


function ToDoAdder (arr) {
  for(var i=0; i<arr.length; i++) {
    $('#tableBody').append('<tr> <td>' + arr[i].title + '</td> <td>' + arr[i].date + '</td> <td> <button type="button" id="' + arr[i].id + '" class="btn btn-danger complete-button">complete</button> </td> </tr>');
  }
}
ToDoAdder(ToDo);

function markComplete() {
  console.log('running markComplete');
  $(this).closest('tr').remove();

  var id= $(this).attr('id');
  console.log(id);
  var ToDone = ToDo.filter(function(item) {
    return item.id == id;
  });
  console.log(ToDone);
  addToCompleteList(ToDone[0]);
}

function addToCompleteList(ToDo) {
  $('#tableBody2').append('<tr id="' + ToDo.id + '"> <td>' + ToDo.title + ' </td> <td>' + ToDo.date + '</td> <td><button type="button" id="' + ToDo.id + '" class="btn btn-danger complete-button">complete</button> </td> </tr>');
}





function createNewToDo (e) {
  e.preventDefault();
  $('#tableBody').append('<tr> <td>' + $('#ToDoInput').val() + '</td> <td>' + $('#toDoInputDate').val() + '</td> <td><button type="button" id="' + Math.floor(Math.random()*100) + '" class="btn btn-danger complete-button">complete</button> </td> </tr>')
  $(".complete-button").on( 'click', markComplete);
}

$(".submitToDo").on( 'click', createNewToDo);

$(".complete-button").on( 'click', markComplete);


function setupStorage() {
  if(!localStorage.toDos) {
    localStorage.toDos = JSON.stringify([]);
  }
  if(localStorage.completetoDos) {
    localStorage.completetoDos = JSON.stringify([]);
  }
}

function addTodoToStorage(todo) {
  var data = JSON.parse(localStorage.toDos);
  data.push(todo);
  localStorage.toDos = JSON.stringify(data);
}

function removeTodoFromStorage(todo) {
  var data = JSON.parse(localStorage.toDos);
  var new_data = data.filter(function (item) {
    return item.id != todo.id;
  });
  localStorage.toDos = JSON.stringify(new_data);
}

function clearStorage() {
  localStorage.toDos = JSON.stringify([]);
  localStorage.completeTodos = JSON.stringify([]);
}
function buildTodoHtml(item, buttonId) {
  st = '<tr><td>' + item.name + '</td><td>' + item.date +
       '</td><td><span class="label label-danger">' +
       item.status + '</span></td><td><button ';
  st += buttonId? 'id="' + item.id + '"' : '';
  st += 'class="btn btn-primary complete-todo">Complete</button></td>';
  return st;
}

function renderToDos () {
  console.log(localStorage.toDos);
  console.log(localStorage.completeTodos);
  var data = JSON.parse(localStorage.toDos);
  if (data.length > 0) {
    data.forEach(function (element) {
      $("#tdbody").append(buildTodoHtml(element, true));
    });
  }
  var data = JSON.parse(localStorage.completeTodos);
  data.pop();
  data.forEach(function (element) {
    $("#ctdbody").append(buildTodoHtml(element, false));
  });
}

renderToDos();

function markCompleted () {
  $(this).closest('tr').remove();

  var id = $(this).attr('id');
  console.log(id);
  var data = JSON.parse(localStorage.toDos);
  markedToDo = data.filter(function (item) {
    return item.id == id;
  });
  console.log(markedToDo);
  addToCompleted(markedToDo[0]);
}

function addToCompleted (todo) {
  removeTodoFromStorage(todo);
  var data = JSON.parse(localStorage.completeTodos);
  data.push(todo);
  localStorage.completeTodos = JSON.stringify(data);
  console.log(localStorage.completeTodos);
  $("#ctdbody").append(buildTodoHtml(todo, false));
}

$("#newTodoForm").submit(function (e) {
  e.preventDefault();
  var newToDo = {id: Math.floor(Math.random()*100),
                 name: $('#todoName').val(),
                 date: $('#todoDate').val(),
                 status: 'Complete'};
  addTodoToStorage(newToDo);
  console.log(newToDo);
  console.log(localStorage.toDos);
  $("#tdbody").append(buildTodoHtml(newToDo, true));
  $('.complete-todo').on('click', markCompleted);
})

$('.complete-todo').on('click', markCompleted);

$('#clrLS').on('click', clearStorage)
