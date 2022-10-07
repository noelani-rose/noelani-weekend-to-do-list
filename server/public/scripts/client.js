
console.log('in client.js');

$(document).ready(onReady);

function onReady() {
    $('.addBtn').on('click', addTask);
    $('body').on('click', '.deleteBtn', deleteTask)
    $('body').on('click', '.checkboxBtn', completeTask)

    getTask();
}

let completed = 'FALSE';
function addTask(){
    // console.log('this is the priority level', $('#priority option:selected').val())
    // console.log('in add task function');

    let taskToAdd = {
        task: $('.textInput').val(),
        completed: completed,
        // priority: $('.priority').val()
    }

    $.ajax({
        method: 'POST',
        url: '/to-do/',
        data: taskToAdd
    })
        .then(function(response){
            // console.log('task added...');

            $('.textInput').val(''),
            getTask();
        })
        .catch((err) => {
            console.log('posting new task error', err);
        });
}

function getTask(){
    // console.log('getting task request');

    $.ajax({
        method: 'GET',
        url: '/to-do'
    })
    .then((response) => {
        // console.log('getting task response from server', response);
        const listOfTasks = response;

        render(response);
    })
    .catch((err) => {
        console.log('error in getting task response...', err);

    })
} // end of getTask


function deleteTask(){
    // console.log('in delete task function');
    let taskDelete = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: `/to-do/${taskDelete}`
    })
        .then(function(response) {
            // console.log('the task was deleted');
            getTask();
        })
        .catch((err) => {
            console.log('error deleting task...', err);
        })
} // end of deleteTask function


function completeTask(){
    let completeId = $(this).data('id')
    // console.log('completing the task with the id...', completeId);

    // let isComplete = $(this).is(":checked")
    let isComplete = $(this).data('check')
    // console.log('the task is complete...?', isComplete);


    console.log($(this).is(":checked"))
    

    $.ajax({
        method: 'PUT',
        url: `/to-do/${completeId}`,
        data: {completed: isComplete}
    })

    .then((res) => {
        // console.log('new value of task is', res)
        getTask();
        // render();
    })
    .catch((err) => {
        console.log('completing task failed', err)
    });
};


function render(listOfTasks){
    $('#taskTable').empty();
    for(let task of listOfTasks){

        // console.log('here are the completed tasks', task.complete);
        let strikeThrough;
        if (task.complete){
            strikeThrough = 'complete'
        } else {
            strikeThrough = 'not-complete'
        }
        // let priorityLevel = $('.priority').text();
        // console.log('the priority level is', $('.priority').text())
        // <li>${priorityLevel}</li>
        $('#taskTable').append(`
        <ul class = "taskItems">
            <li id = "taskItem" class = ${strikeThrough}>${task.task}</li>
            <label id = "checkLabel" for = "complete">Done!</label>
            <input type = "checkbox" class = "checkboxBtn" id = "checkboxBtn${task.id}" data-id = ${task.id} data-check = ${task.complete} />

            <button class = "deleteBtn" data-id = ${task.id}>Delete</button>

        </ul>`)
        if (task.complete){
            $(`#checkboxBtn${task.id}`).prop("checked", true)
        } 
    }

}