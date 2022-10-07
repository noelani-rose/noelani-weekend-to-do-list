console.log('in client.js');

$(document).ready(onReady);

function onReady() {
    $('.addBtn').on('click', addTask);

}

function addTask(){
    console.log('in add task function');
}