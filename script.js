var input = document.querySelectorAll('input')
var form = document.querySelectorAll('form')
var taskList = document.querySelector('.task-list')
var todoList = document.querySelector('.todo-list')
var listTitle = document.querySelector('.list-title')
var tasks = document.querySelector('.tasks')
var taskCount = document.querySelector('.task-count')
var deleteStuff = document.querySelector('.delete-stuff')


taskCount.innerHTML = "0 tasks remaning"
var listName = ''
var listArray = {}
for (let i = 0; i < form.length; i++) {
    form[i].addEventListener('submit', function (event) {
        event.preventDefault();
        var val = input[i].value.trim();

        if (i == 0) {
            if (val) {
                addListElement({
                    text: val,
                })
            }
        } else {
            if (val) {
                addTodoElement({
                    text: val,
                })
            }
        }
        input[i].value = ''
    })
}


function addListElement(todo) {
    var li = document.createElement('li')
    listArray[todo.text] = []
    li.innerHTML = `
            <span>${todo.text}</span>
            <i class="fas fa-trash"></i > 
    `
    li.addEventListener('click', function () {
        var htmls = ''
        todoList.style.display = 'block'    
        listTitle.innerHTML = todo.text
        listName = todo.text
        var countTask = listArray[todo.text].length
        taskCount.innerHTML = `
                        ${countTask}
                        <span>tasks remaning</span>
        `
        if (countTask == 0) {
            htmls = ''
        } else {
            for (let i = 0; i < countTask; i++) {
                htmls += `
                <li>
                    <span>${listArray[listName][i]['name']}</span>
                    <button class="btn"><i class="fas fa-check-circle"></i></button>
                    <button class="btn"><i class="fas fa-trash"></i></button> 
                </li>  
                `
            }
        }
        tasks.innerHTML = htmls
        if (htmls != '') {
            var task = document.querySelectorAll('.tasks li')
            for (let i = 0; i < task.length; i++) {
                task[i].querySelectorAll('button')[0].addEventListener('click', function () {
                    task[i].classList.toggle('completed')

                })
                task[i].querySelectorAll('button')[1].addEventListener('click', function () {
                    // remove = true
                    var content = task[i].querySelector('span').innerHTML
                    listArray[listName].splice(listArray[listName].findIndex(a => a.name === content),1)
                    this.parentElement.remove()
                })
                if(listArray[listName][i]['status'] == 'completed'){
                    task[i].setAttribute('class','completed')
                }
            }
        }
    })
    li.querySelector('i').addEventListener('click', function () {
        this.parentElement.remove()
    })
    // console.log(listArray)
    taskList.appendChild(li)
}
function addTodoElement(todo) {
    var task = {
        'name': '',
        'status': ''
    }
    var li = document.createElement('li')
    li.innerHTML = `
            <span>${todo.text}</span>
            <button class='btn'><i class="fas fa-check-circle"></i></button>
            <button class='btn'><i class="fas fa-trash"></i></button> 
    `
    listArray[listName].push(task)
    var countTask = listArray[listName].length
    taskCount.innerHTML = `
                        ${countTask}
                        <span>tasks remaning</span>
    `
    task.name = todo.text
    li.querySelectorAll('button')[0].addEventListener('click', function () {
        li.classList.toggle('completed')
        if (li.classList.contains('completed')) {
            task.status = 'completed'
        } else {
            task.status = ''
        }
    })
    li.querySelectorAll('button')[1].addEventListener('click', function () {
        this.parentElement.remove()
        listArray[listName].splice(listArray[listName].findIndex(a => a.name === todo.text),1)
    })
    countTask++
    tasks.appendChild(li)
}
var btn = document.querySelector('.todo-header button').addEventListener('click', function () {
    todoList.style.display = 'none';
})
deleteStuff.querySelectorAll('button')[0].addEventListener('click',function(){
    var task = tasks.querySelectorAll('.tasks li')
    for(let i=0; i<task.length;i++){
        if(task[i].getAttribute('class') == 'completed'){
            task[i].setAttribute('class','uncompleted')
            listArray[listName][i]['status'] = ''
        }
    }
})
deleteStuff.querySelectorAll('button')[1].addEventListener('click', function () {
    listArray[listName] = []
    tasks.innerHTML = ""
})



