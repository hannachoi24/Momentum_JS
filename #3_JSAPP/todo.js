const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];



function deleteToDo(event) {
    const btn = event.target; //target은 어떤 버튼이 지워지는지 알 수 있게하는 함수
    const li = btn.parentNode; //부모가 누구인지
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){ //'cleanToDos', 'filter'은 'filterFn'이 체크가 된 아이템들의 array를 주는 것 
       return toDo.id !== parseInt(li.id); //parseInt는 string를 숫자로 바꿔줌
    }); 
    toDos = cleanToDos;
    saveToDos(); 
}

function saveToDos(){ //위에 toDos를 가져와서 로컬에 저장
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //js는 data를 string으로 저장하기 때문->obj를 string으로 바꿔줌
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn); //뭔가를 그의 father element안에 넣는 것, span을 li안에 넣음
    li.appendChild(span); // 버튼을 li안에 넣음
    li.id = newId; //버튼을 클릭했을 때 어떤 li를 지워야 하는지 알 수 있어서
    toDoList.appendChild(li); //li를 ul에다 넣음
    const toDoObj = {
        text: text,
        id: newId
    };
    //호출
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; //enter을 눌렀을 때 todo 생성하고 삭제원함
}

function loadToDos(){ //toDos를 가져옴
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
      const parsedToDos = JSON.parse(loadedToDos); //데이터를 전달 할 때, js가 그걸 다룰 수 있도록 obj로 바꿔주는 기능
      parsedToDos.forEach(function(toDo){ //forEach는 array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜줌
          paintToDo(toDo.text);
      }); 
    } 
}

function init() {
    loadToDos(); //뭔가를 load 해야하는데, 그건 로칼스토리지에서 온 것임
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
