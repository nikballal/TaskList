//define UI variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//Load all event listeners
loadEventListeners()

//Load all event listeners
function loadEventListeners() {
  //DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks)
  //Add task event
  form.addEventListener('submit', addTask)
  //remove task event
  taskList.addEventListener('click', removeTask)
  //clear task
  clearBtn.addEventListener('click', clearTasks)
  //filter tasks
  filter.addEventListener('keyup', filterTasks)
}

//Get tasks from LS
function getTasks() {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function (task) {
    // create li element
    const li = document.createElement('li')
    //add class
    li.className = 'collection-item'
    //create text node and append to li
    li.appendChild(document.createTextNode(task))
    //create new link element
    const link = document.createElement('a')
    //add class
    link.className = 'delete-item secondary-content'
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //append the link to li
    li.appendChild(link)
    //append li to ul
    taskList.appendChild(li)
  })
}

//Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task')
  }

  // create li element
  const li = document.createElement('li')
  //add class
  li.className = 'collection-item'
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value))
  //create new link element
  const link = document.createElement('a')
  //add class
  link.className = 'delete-item secondary-content'
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>'
  //append the link to li
  li.appendChild(link)
  //append li to ul
  taskList.appendChild(li)

  //Store in LS
  storeTaskInLocalStorage(taskInput.value)

  //clear input
  taskInput.value = ''
  e.preventDefault()
}
//
//store task
function storeTaskInLocalStorage(task) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')) //since L.S stores only strings
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove() //e.target is the 'x' icon which is '<i class .. >'
      //remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')) //since L.S stores only strings
    console.log(task)
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1) //at position of 'index' remove 1 item
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//clear tasks
function clearTasks() {
  // taskList.innerHTML = ''

  //faster method
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }

  clearTasksFromLocalStorage()
}

//clear task from LS
function clearTasksFromLocalStorage() {
  localStorage.clear()
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase()
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}

// const form = document.querySelector('form')
// const taskInput = document.getElementById('task')
// const heading = document.querySelector('h5')
// form.addEventListener('submit', runEvent)

//clear input
// taskInput.value = ''

//add event listener
// taskInput.addEventListener('keydown', runEvent)

// const card = document.querySelector('.card')
// const heading = document.querySelector('h5')

//blur
// taskInput.addEventListener('blur', runEvent)

//event bubbling
// document.querySelector('.card-title').addEventListener('click', function () {
//   console.log('card-title')
// })
// document.querySelector('.card-content').addEventListener('click', function () {
//   console.log('card-content')
// })
// document.querySelector('.card').addEventListener('click', function () {
//   console.log('card')
// })
// document.querySelector('.col').addEventListener('click', function () {
//   console.log('col')
// })

//delegation
// document.body.addEventListener('click', deleteItem)

// function deleteItem(e) {
//   if (e.target.parentElement.classList.contains('delete-item')) {
//     console.log('delete item')
//     e.target.parentElement.parentElement.remove()
//   }
// }

//Click
// clearBtn.addEventListener('click', runEvent)
//Double Click
// clearBtn.addEventListener('dblclick', runEvent)
//mousedown
// clearBtn.addEventListener('mouseover', runEvent)
// clearBtn.addEventListener('mouseout', runEvent)
// clearBtn.addEventListener('mouseenter', runEvent)
// clearBtn.addEventListener('mouseleave', runEvent)
// clearBtn.addEventListener('mousemove', runEvent)

//Event handler
// function runEvent(e) {
//   console.log(`EVENT TYPE: ${e.type}`)
//   console.log(e.target.value)
//   e.preventDefault()
//   heading.textContent = e.target.value
//   // heading.textContent = `MouseX: ${e.offsetX} MouseY: ${e.offsetY}`
//   // document.body.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 40)`
// }

// document.querySelector('.clear-tasks').addEventListener('click', onClick)

// function onClick(e) {
//   // console.log('Clicked')
//   let val
//   val = e
//   //event target element
//   val = e.target
//   // val = e.target.id
//   // val = e.target.className
//   val = e.target.classList
//   // val = e.target.innerText = 'Hello'

//   //Event Type (i.e the type of event, e.g click)
//   val = e.type

//   //timestamp
//   val = e.timeStamp

//   //co-ordinates of the event
//   val = e.clientX
//   // console.log(val)
// }

//set local storage item
// localStorage.setItem('name', 'John')
// localStorage.setItem('age', 30)

// //set session storage item
// sessionStorage.setItem('name', 'Beth')

//remove from storage
// localStorage.removeItem('name')

//get from storage

// const name = localStorage.getItem('name')
// const age = localStorage.getItem('age')

//clear local storage
// localStorage.clear()
// console.log(name, age)

//local storage
// document.querySelector('form').addEventListener('submit', function (e) {
//   const task = document.getElementById('task').value

//   let tasks

//   if (localStorage.getItem('tasks') === null) {
//     tasks = []
//   } else {
//     tasks = JSON.parse(localStorage.getItem('tasks'))
//   }

//   tasks.push(task)
//   console.log(task)

//   localStorage.setItem('tasks', JSON.stringify(tasks))
//   alert('task saved')

//   e.preventDefault()
// })
