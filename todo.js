var tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTasktoDOM(task){
const list=document.createElement('li');
list.innerHTML=`
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked':''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="trash-solid.svg" class="delete" data-id="${task.id}" />
`;
taskList.append(list);


}
function renderList () {
    taskList.innerHTML='';
    for(let i=0;i<tasks.length;i++)
    {
        addTasktoDOM(tasks[i]);
    }
}

function toggleTask (taskId) {
    let task=tasks.filter(task=>task.id===Number(taskId));
    if(task.length!=0){
        let currTask=task[0];
        currTask.completed=!currTask.completed;
        renderList();
        showNotification('Task Status changed');
        return;
    }
    showNotification('Task List is Empty');
    return;
}

function deleteTask (taskId) {
    if(tasks.length!=0){
        let newTasks=tasks.filter(function(task){
            return task.id !== Number(taskId);
        });
        tasks=newTasks;
        let counter=parseInt(tasksCounter.innerText);
        tasksCounter.innerText=counter-1;
        renderList();
        showNotification('Task deleted Successfully!');
        return;
    }
    showNotification('Tasks are empty! Please add one');
    return;
}

function addTask (task) {
    if(task)
    {

        //GET Request
        //fetch('https://jsonplaceholder.typicode.com/todos',{
        // method: 'POST', // or 'PUT'
        // headers: {
        //     'Content-Type': 'application/json',
        //  },
        //     body: JSON.stringify(data),
        // })
        // .then(function(response){
        //     return response.json();
        // })
        // .then(function(data){
        //     tasks.push(task);
        //showNotification('Task added Successfully');
        //let counter=parseInt(tasksCounter.innerText);
        //tasksCounter.innerText=counter+1;
        //renderList();
        // })
        // .catch(function(error){
        //     console.log('error:',error);
        // })
        tasks.push(task);
        showNotification('Task added Successfully');
        let counter=parseInt(tasksCounter.innerText);
        tasksCounter.innerText=counter+1;
        renderList();
        return;
    }
    showNotification('Task can not be Added!');
    return;
}

function showNotification(text) {
    alert(text);
}

function handlingKeyPressEvent(e){
    if(e.key==='Enter' || e.keyCode === 13)
    {
        const text=e.target.value;
        if(!text)
        {
            showNotification('Text Field cannot be empty');
            return;
        }

        const task={
            title:text,
            id: Date.now(),
            completed:false
        }
        e.target.value='';
        addTask(task);
    }
  


}


function handleClickEvent(e)
{
    const target=e.target;
    if(target.className==='delete')
    {
        deleteTask(target.dataset.id);
        return;
    }
    else if(target.className==='custom-checkbox')
    {
        toggleTask(target.id);
        return;
    }
}

async function fetchJson()
{
    //GET Request
    // fetch('https://jsonplaceholder.typicode.com/todos')
    // .then(function(response){
    //     return response.json();
    // })
    // .then(function(data){
    //     tasks=data.slice(0,10);
    //     renderList();
    // })
    // .catch(function(error){
    //     console.log('error:',error);
    // })
    try{
        const response=await fetch('https://jsonplaceholder.typicode.com/todos');
        const data=await response.json();
        tasks=data.slice(0,10);
        renderList();
    }
    catch(error)
    {
        console.log('error:',error);
    }

}
function initializeApp(){
    fetchJson();
    addTaskInput.addEventListener('keyup',handlingKeyPressEvent);
    document.addEventListener('click',handleClickEvent);
}

initializeApp();
