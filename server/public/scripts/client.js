console.log('in client.js');

$(document).ready(onReady);

function onReady() {
    $('.addBtn').on('click', addTask);
    $('body').on('click', '.deleteBtn', deleteTask)
    $('body').on('click', '#complete', completeTask)

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


function deleteTask(){
    console.log('in delete task function');
    let taskDelete = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: `/to-do/${taskDelete}`
    })
        .then(function(response) {
            console.log('the task was deleted');
            getTask();
        })
        .catch((err) => {
            console.log('error deleting task...', err);
        })
} // end of deleteTask function


function completeTask(){
    let completeId = $(this).data('id')
    console.log('completing the task with the id...', completeId);

    let isComplete = $(this).data('check')
    console.log('the task is complete...?', isComplete);

    $.ajax({
        method: 'PUT',
        url: `/to-do/${completeId}`,
        data: {completed: isComplete}
    })
    .then((res) => {
        console.log('mark as complete', isComplete);
    })
    .catch((err) => {
        console.log('completing task failed', err)
    });
};


function render(listOfTasks){
    $('#taskTable').empty();
    for(let task of listOfTasks){
        $('#taskTable').append(`
        <ul>
            <li>${task.task}<button class = "deleteBtn" data-id = ${task.id}>Delete</button>
            <input type = "checkbox" id = "complete" data-id = ${task.id} data-check = ${task.complete}/>
            <label for = "complete">Done</label></li>
        </ul>`)
    }

}