

let countSpan = document.querySelector(".count span");
let bulletSpanContainer = document.querySelector('.bullets .spans')
let quizArea = document.querySelector('.quiz-area');
let answerArea= document.querySelector('.answer-area')
let bullets = document.querySelector('.bullets');
let submitButton = document.querySelector('.btn');
let result = document.querySelector('.result');
let countDown = document.querySelector('.countDown');
let Student = prompt(`Welcome in Quiz App .. Please Enter Your Name.`);

let currentIndex=0;
let rightAnswer =0;
let countDownInterval = function(){
    
}

function getQuestions(){
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function(){
       if(this.readyState === 4 && this.status === 200){
        let questionObject = JSON.parse(this.responseText);
        let QCount = questionObject.length;
        createBullets(QCount);
        addQuestionsData(questionObject[currentIndex],QCount);
        countDownfun(15,QCount);
        submitButton.onclick=()=>{
            let theRightAnswer = questionObject[currentIndex].right_answer;
            currentIndex++;
            checkAnswer(theRightAnswer,QCount);

            quizArea.innerHTML   ='';
            answerArea.innerHTML ='';
            addQuestionsData(questionObject[currentIndex],QCount);
            handelBullet();

        }
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

// To add Question and ansewer 
function addQuestionsData(obj,countQ){
if(currentIndex < countQ){
    let questionTitle = document.createElement('h2');
    questionTitle.className='wow flipInY';
    let questionTExt =document.createTextNode(obj["title"]);
    questionTitle.appendChild(questionTExt);
    quizArea.appendChild(questionTitle);

    for(let i = 1 ; i<=4; i ++){
let mainDiv = document.createElement('div');
mainDiv.className='answer  wow fadeInDown';
let radioInput = document.createElement('input');
radioInput.name='question';
radioInput.type='radio';
radioInput.id=`answer_${i}`;
radioInput.dataset.answer = obj[`answer_${i}`];
if(i === 1 ){radioInput.checked=true}

let theLabel = document.createElement('label');
let TheLableText =document.createTextNode(obj[`answer_${i}`])
theLabel.htmlFor =`answer_${i}`;
theLabel.appendChild(TheLableText);
mainDiv.appendChild(radioInput)
mainDiv.appendChild(theLabel);
answerArea.appendChild(mainDiv)
    }
}
}

function countDownfun(duration,count4){
if(currentIndex < count4 ){
    let minutes,secunds;
let countDownInterval= setInterval(function(){
    minutes=parseInt(duration / 60);
    secunds=parseInt(duration % 60);

    minutes =minutes<10 ?`0${minutes}`: minutes;
    secunds =secunds<10 ?`0${secunds}`: secunds;

    countDown.innerHTML=`${minutes}:${secunds}`
    if(--duration < 0){
        clearInterval(countDownInterval);
        submitButton.click();
    }
} ,1000)
}
}

function checkAnswer(rAnswer,count2){
let answers = document.getElementsByName('question');
let theChoosenAnswer ;
for(var i =0 ; i < answers.length ; i++){
if(answers[i].checked){theChoosenAnswer = answers[i].dataset.answer}
}
if(theChoosenAnswer === rAnswer){
    rightAnswer++;
    console.log(`Good Answer isam the right Answer is ${rAnswer}`)
}
}

function handelBullet(){
    let bullitSpans3= document.querySelectorAll('.bullets .spans span');
    let ArrayOfSpans = Array.from(bullitSpans3);
    ArrayOfSpans.forEach((span,index)=>{
        if(currentIndex === index){
            span.className='on'
        }
    })

}
