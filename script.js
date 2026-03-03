let isRunning=false;
let isError=false;
const btn=document.getElementById("startBtn");
const resetBtn=document.getElementById("resetBtn");
resetBtn.disabled=true;

function speak(message) {
  let msg = new SpeechSynthesisUtterance(message);
  msg.lang = "en-IN";
  speechSynthesis.speak(msg);
}

function updateStatus(text) {
  document.getElementById("status").innerText = text;
}

// -------- Error checks --------

function checkWater() {
  return new Promise((resolve, reject) => {
    let water = Number(document.getElementById("water").value);

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

// -------- Washing stages --------

function wash() {
  return new Promise(resolve => {
    updateStatus(" Washing...");
    setTimeout(resolve, 2000);
  });
}

function rinse() {
  return new Promise(resolve => {
    updateStatus("Rinsing...");
    setTimeout(resolve, 2000);
  });
}

function spin() {
  return new Promise(resolve => {
    updateStatus(" Spinning...");
    setTimeout(resolve, 2000);
  });
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

    await wash();
    await rinse();
    await spin();

    updateStatus(" Washing completed");
    speak("Washing complete. Thuni ready.");

  } catch(error) {
    isError=true;
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
  }finally{
    isRunning=false;
    
         }
}
resetBtn.addEventListener("click", ()=>{
  if(isRunning) return;

  document.getElementById("water").value = "yes";
  document.getElementById("load").value = 5;
  updateStatus("");

  isError = false;
  btn.disabled = false;
  resetBtn.disabled = true;
});


