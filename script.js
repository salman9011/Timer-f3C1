const setBtn=document.querySelector(".btn"),
hours=document.querySelector("#hour"),
minutes=document.querySelector("#minute"),
seconds=document.querySelector("#second"),
currentTimers=document.querySelector(".currentTimers"),
audio=document.querySelector("audio");

let count=1;

setBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    //let's calculate the total Time...  
    document.getElementById("pick").style.display="none";
    
    if(!hours.value && !minutes.value && !seconds.value){
        alert("Enter the Time Please!!!");
        return;
    }
    let totalTime=0;
    if(hours.value)totalTime+=parseInt(hours.value)*60*60;
    if(minutes.value)totalTime+=parseInt(minutes.value>59 ? 0: minutes.value)*60;
    if(seconds.value)totalTime+=parseInt(seconds.value> 59 ? 0 : seconds.value);
    
    console.log(totalTime);
    let newTimer=document.createElement("div");
    newTimer.classList.add("currTimer");
    newTimer.id=`timer${count}`;
    
    newTimer.innerHTML=`<div>Time Left :</div>
    <div class="flex">
        <div class="hour clock">${hours.value}</div>:
        <div class="minute clock">${minutes.value>59 ? 0: minutes.value}</div>:
        <div class="second clock">${seconds.value> 59 ? 0 : seconds.value}</div>
    </div>
    <div>
        <button class="del">Delete</button>       
    </div>
`;
let delBtn=newTimer.querySelector(".del");

currentTimers.appendChild(newTimer);

delBtn.addEventListener('click',(e)=>
{
    e.preventDefault();
        currentTimers.removeChild(newTimer);
});

let timeOutTime=totalTime*1000;
setInterval(() => 
{
    totalTime--;

   let currHour=newTimer.querySelector(".hour");
   let currMin=newTimer.querySelector(".minute");
   let currSec=newTimer.querySelector(".second");

   //we have total Time let's convert it into 
   //let's extract total hours..
   let currCal=totalTime;
   let x=parseInt(currCal/(60*60));
   currCal-=x*60*60;
   let y=parseInt(currCal/60);
   currCal-=y*60;

   currHour.innerHTML=`${x>9 ? x : ("0"+x)}`;
   currMin.innerHTML=`${y>9 ? y : ("0"+y)}`;
   currSec.innerHTML=`${currCal>9 ? currCal : ("0"+currCal)}`;

    
}, 1000);

setTimeout(() => 
{
    clearInterval();
    newTimer.innerHTML=`
    <div>Timer Is Up!</div>
    <button class="stop">Stop</button>  
    `;
    newTimer.className="afterTimeUp";
let stopBtn=newTimer.querySelector(".stop");

stopBtn.addEventListener('click',e=>{
    e.preventDefault();
    currentTimers.removeChild(newTimer);
    audio.pause();
});
    audio.play();

    clearTimeout();

}, timeOutTime);

count++;

});
