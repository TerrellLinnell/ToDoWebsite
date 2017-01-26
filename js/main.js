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
