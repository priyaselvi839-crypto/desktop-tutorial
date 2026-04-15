let isRunning=false;
let isError=false;
const btn=document.getElementById("startBtn");
const resetBtn=document.getElementById("resetBtn");
let totalTimer;

function speak(message) {
  let msg = new SpeechSynthesisUtterance(message);
  msg.lang = "en-IN";
  speechSynthesis.speak(msg);
}

function updateStatus(text) {
  document.getElementById("status").innerText = text;
}
function formatTime(seconds){
  let m=Math.floor(seconds/60);
  let s=seconds%60;
  m=m<10?"0"+m:m;
  s=s<10?"0"+s:s;
  return `${m}:${s}`;
}

// -------- Error checks --------

function checkWater() {
  return new Promise((resolve, reject) => {
    let water = document.getElementById("water").value;

    setTimeout(() => {
      if (water === "no") {
        reject("E1: Thanni varala");
      } else {
        resolve();
      }
    }, 1000);
  });
}

function checkLoad() {
  return new Promise((resolve, reject) => {
    let load = document.getElementById("load").value;

    setTimeout(() => {
      if (load > 7) {
        reject("E2: Thuni romba athigama iruku");
      } else {
        resolve();
      }
    }, 1000);
  });
}

// -------- Single timer--------


function startMachineTimer(totalDuration) {
  let timeLeft=totalDuration;
  totalTimer=setInterval(()=>{
    document.getElementById("timer").innerText=`${formatTime(timeLeft)}`;
    if(timeLeft>7){
      updateStatus("Washing...........");
    }else if(timeLeft>3){
      updateStatus("Rinsing.......");
    }else if(timeLeft>0){
      updateStatus("spinning......");
    }
    if(timeLeft===0){
      clearInterval(totalTimer);
      updateStatus("washing completed....");
      document.getElementById("timer").innerText="Done";
      speak("washing complete..Thuni ready!");
      isRunning=false;
    }
    timeLeft--;
  },1000);
}

// -------- Machine Start --------

async function startMachine() {
  if(isRunning||isError) return;
isRunning=true;
btn.disabled=true;
resetBtn.disabled=false;
  try {
    updateStatus("Checking water supply...");
    await checkWater();

    updateStatus("Checking cloth load...");
    await checkLoad();

    startMachineTimer(12);

  } catch(error) {
    isError=true;
    clearInterval(totalTimer);
    if (error.startsWith("E1")) {
      updateStatus(" E1 Error: Water illa");
      speak("Thanni varala. Water supply check pannunga.");
    }

    else if (error.startsWith("E2")) {
      updateStatus(" E2 Error: Overload");
      speak("Thuni romba athigama iruku. Konjam kammi pannunga.");
    }else{
      updateStatus("unexpected error");
      speak("Something went wrong,please try again");
    }
  
    
    isRunning=false;
  }
         
}
resetBtn.addEventListener("click", ()=>{
  if(isRunning) return;

  document.getElementById("water").value = "yes";
  document.getElementById("load").value = 5;
  updateStatus("");
  document.getElementById("timer").innerText="";
  clearInterval(totalTimer);

  isError = false;
  btn.disabled = false;
  resetBtn.disabled = true;
});
//Event
btn.addEventListener("click",startMachine);