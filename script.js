
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
console.log("machine started");
  try {
    updateStatus(" Checking water...");
    await checkWater();

    updateStatus(" Checking load...");
    await checkLoad();

    await wash();
    await rinse();
    await spin();

    updateStatus(" Washing completed");
    speak("Washing complete. Thuni ready.");

  } catch (error) {

    if (error.startsWith("E1")) {
      updateStatus(" E1 Error: Water illa");
      speak("Thanni varala. Water supply check pannunga.");
    }

    if (error.startsWith("E2")) {
      updateStatus(" E2 Error: Overload");
      speak("Thuni romba athigama iruku. Konjam kammi pannunga.");
    }
  }
}


