const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

  
const USER_LS = "currentUser",  
    SHOWING_CN = "showing";

function saveName(text) { //사용자의 이름을 기억하게 하기위함
    localStorage.setItem(USER_LS, text);
}    

function handleSubmit(event){
    event.preventDefault(); //event 기본동작 막기-> 제출이 안됨
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}    

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
      askForName();
       //user is not
    } else{
      paintGreeting(currentUser); 
      //user is

    }   
}

function init(){
    loadName();
}
 
init()