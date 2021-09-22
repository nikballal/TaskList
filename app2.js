const form = document.querySelector('#task-form')
const taskInput = document.querySelector('#task')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.getElementById('filter')

//load all event listeners

loadEventListeners()

function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  //add task
  form.addEventListener('submit', addTask)
  //remove task
  taskList.addEventListener('click', removeTask)
  //clear task
  clearBtn.addEventListener('click', clearTasks)
  //filter tasks
  filter.addEventListener('keyup', filterTasks)
}

//get tasks from ls
function getTasks() {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function (task) {
    //create list element
    const li = document.createElement('li')
    //add class
    li.className = 'collection-item'
    //append the value to the item
    li.appendChild(document.createTextNode(task))
    //create link element
    const link = document.createElement('a')
    //add class
    link.className = 'delete-item secondary-content'
    //add the font awesome icon code as value for a href
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //append the a href to the li element
    li.appendChild(link)
    //append li element to the collection
    taskList.appendChild(li)
  })
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Please add task')
  }

  //create list element
  const li = document.createElement('li')
  //add class
  li.className = 'collection-item'
  //append the value to the item
  li.appendChild(document.createTextNode(taskInput.value))
  //create link element
  const link = document.createElement('a')
  //add class
  link.className = 'delete-item secondary-content'
  //add the font awesome icon code as value for a href
  link.innerHTML = '<i class="fa fa-remove"></i>'
  //append the a href to the li element
  li.appendChild(link)
  //append li element to the collection
  taskList.appendChild(li)
  //store in LS
  storeTaskInLocalStorage(taskInput.value)
  //reset the value of input
  taskInput.value = ''
  e.preventDefault()
}

function storeTaskInLocalStorage(task) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove()
    }
  }

  removeTaskFromLocalStorage(e.target.parentElement.parentElement) //pass in the <li> item
}

//remove task from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')) //.e.g tasks = ["task 1", "task 2"]
  }

  tasks.forEach(function (task, index) {
    //looping through local storage array, here taskItem is the <li>
    if (taskItem.textContent === task) {
      tasks.splice(index, 1) //remove the item from array
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//clear tasks
function clearTasks() {
  // if (confirm('Are you sure?')) {
  //   taskList.innerHTML = ''
  // }

  //faster method
  while (taskList.firstChild) {
    console.log(taskList.firstChild)
    taskList.removeChild(taskList.firstChild)
  }

  clearTasksFromLocalStorage()
}

function clearTasksFromLocalStorage() {
  localStorage.clear()
}

//filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase()
  document.querySelectorAll('.collection-item').forEach(function (task) {
    //task is each <li>
    const item = task.firstChild.textContent
    if (item.toLowerCase().indexOf(text) != -1) {
      //e.g task1.indexOf(s)
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}
