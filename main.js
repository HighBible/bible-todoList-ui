//유저가 값을 입력한다
//+ 버튼을 누르면 할일이 추가된다
//delete 버튼을 누르면, 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. check 버튼을 클릭하는 순간 true false
//2. true이면 끝난 걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면 언더바가 이동
//끝남탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById('task-input')
let addButton = document.getElementById('add-button')
let underBar = document.getElementById('under-line')
let tabs = document.querySelectorAll('.task-tabs div')
let taskList = []
let mode = 'all'
let filterList = []

addButton.addEventListener('click', addTask)

for(let i = 1; i<tabs.length; i++) {
  tabs[i].addEventListener('click', function(event){filter(event)})
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  }
  if(taskInput.value == '') {
    alert('할 일을 입력해주세요!! :-)')
  } else {
    taskList.push(task)
    render() 
    taskInput.value = ''
  }
}

function render() {
  //1. 내가 선택한 탭에 따라서 리스트를 달리 보여준다.
  let list  = [];
  if(mode === 'all') {
    //all taskList
    list = taskList;
  } else if (mode === 'ongoing' || mode === 'done' ) {
      //ongoing, done  filterList
    list = filterList

  } 

  let resultHTML = '';

  for(let i =0; i<list.length; i++){
    if(list[i].isComplete == true) {
      resultHTML += `<div class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div class="btn_area">
        <button class="btn_undo" onclick="toggleComplete('${list[i].id}')">
          <img src="./images/undo.png">
        </button>
        <button class="btn_delete" onclick="deleteTask('${list[i].id}')"></button>
      </div>
    </div>`
    } else {
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div class="btn_area">
        <button  class="btn_check" onclick="toggleComplete('${list[i].id}')">
          <img src="./images/done.png">
        </button>
        <button class="btn_delete" onclick="deleteTask('${list[i].id}')"></button>
      </div>
    </div>`
    }
  }

  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id) {
  // console.log('id: ', id);
  for(let i=0; i<taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter()
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
  for(let i=0; i < taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter()
}

function filter(event) {
  if(event) {
    mode = event.target.id;
    underBar.style.width = event.target.offsetWidth + 'px'
    underBar.style.left = event.target.offsetLeft + 'px'
    underBar.style.top = event.target.offsetTop +(event.target.offsetHeight - 4) + 'px'
  }
  filterList = [];
  
  if (mode === 'ongoing') {
    // 진행중인 아이템을 보여준다
    //task.isComplete = false
    for(let i = 0; i < taskList.length; i++) {
      if(taskList[i].isComplete === false) {
        filterList.push(taskList[i])
      }
    }
  } else if (mode === 'done') {
    //끝난 케이스
    //task.isComplete = true
    for(let i = 0; i < taskList.length; i++) {
      if(taskList[i].isComplete === true) {
        filterList.push(taskList[i])
      }
    }
  }
  render()
} 

function enterKey() {
  if(window.event.keyCode == 13) {
    addTask()
  }
}