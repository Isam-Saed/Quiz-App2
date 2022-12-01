

let countSpan = document.querySelector(".count span");
let bulletSpanContainer = document.querySelector('.bullets .spans')
let quizArea = document.querySelector('.quiz-area');
let answerArea= document.querySelector('.answer-area')
let bullets = document.querySelector('.bullets');
let submitButton = document.querySelector('.btn');
let result = document.querySelector('.result');
let countDown = document.querySelector('.countDown');
let Student = prompt(`Welcome in Quiz App .. Please Enter Your Name.`);

currentIndex=0

function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function(){

       if(this.readyState === 4 && this.status === 200){
let questionObject = JSON.parse(this.responseText);
let QCount = questionObject.length;
createBullets(QCount);
console.log()
       } 
       
    }



    myRequest.open("GET","htmlQ2.json",true)
    myRequest.send();
}
getQuestions();


function createBullets(num){
    countSpan.innerHTML=num;
    for( let i = 0; i<num;i++){
        let theBullet = document.createElement('span');
        let numberQspan = document.createTextNode(`${i+1}`)
        theBullet.appendChild(numberQspan);
        bulletSpanContainer.appendChild(theBullet);
        if(i === 0){theBullet.className='on';}
    }
}
