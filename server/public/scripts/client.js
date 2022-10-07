console.log('in client.js');

$(document).ready(onReady);

function onReady() {
    $('.addBtn').on('click', addTask);

    getTask();
}

let completed = 'FALSE';
function addTask(){
    console.log('in add task function');

    let taskToAdd = {
        task: $('.textInput').val(),
        completed: completed
    }

    $.ajax({
        method: 'POST',
        url: '/to-do/',
        data: taskToAdd
    })
        .then(function(response){
            console.log('task added...');

            $('.textInput').val(''),
            getTask();
        })
        .catch((err) => {
            console.log('posting new task error', err);
        });
}

function getTask(){
    console.log('getting task request');

    $.ajax({
        method: 'GET',
        url: '/to-do'
    })
    .then((response) => {
        console.log('getting task response from server', response);
        const listOfTasks = response;

        render(response);
    })
    .catch((err) => {
        console.log('error in getting task response...', err);

    })
} // end of getTask








function render(listOfTasks){
    $('#taskTable').empty();
    for(let task of listOfTasks){
        $('#taskTable').append(`
        <ul>
            <li>${task.task}<button id = "deleteBtn" data-id = ${task.id}>Delete</button>
            <input type = "checkbox" id = "complete"/>
            <label for = "complete">Done</label></li>
        </ul>`)
    }

}