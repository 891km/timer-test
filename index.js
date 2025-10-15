const $timeInputs = document.querySelectorAll(".time");
const $timeHrs = document.querySelector(".time--hrs");
const $timeMin = document.querySelector(".time--min");
const $timeSec = document.querySelector(".time--sec");

const $startBtn = document.querySelector(".btn__start");
const $resetBtn = document.querySelector(".btn__reset");

$timeInputs.forEach((item) => {
  item.addEventListener("input", (e) => {
    const targetInput = e.target.closest("input");
    if (targetInput.value < 0) {
      targetInput.value = 0;
    }
  });
});

// start
let intervalID = null;
let isActive = false;
let totalTime = 0;
$startBtn.addEventListener("click", () => {
  totalTime =
    Number($timeHrs.value) * 3600 +
    Number($timeMin.value) * 60 +
    Number($timeSec.value);

  if (totalTime > 0) {
    isActive = !isActive;
  } else {
    alert("숫자를 입력해 주세요");
  }

  if (!isActive) {
    if (intervalID) clearInterval(intervalID);
    if (totalTime > 0) {
      $startBtn.textContent = "START";
      $startBtn.classList.remove("active");
      $startBtn.classList.add("ready");
    } else {
      $startBtn.classList.remove("ready");
      $startBtn.classList.remove("active");
      $startBtn.textContent = "START";
    }
  } else {
    $startBtn.textContent = "PAUSE";
    $startBtn.classList.add("active");
    $resetBtn.classList.add("active");

    intervalID = setInterval(() => {
      totalTime -= 1;

      $timeSec.value = parseInt(totalTime % 60);
      $timeMin.value = parseInt((totalTime % 3600) / 60);
      $timeHrs.value = parseInt(totalTime / 3600);

      if (totalTime <= 0) resetStatus();
    }, 1000);
  }
});

function resetStatus() {
  if (intervalID) clearInterval(intervalID);
  totalTime = 0;
  isActive = false;

  $startBtn.textContent = "START";
  $startBtn.classList.remove("ready");
  $startBtn.classList.remove("active");
  $resetBtn.classList.remove("active");
}

// reset
$resetBtn.addEventListener("click", (e) => {
  clearInterval(intervalID);
  resetStatus();

  $timeInputs.forEach((item) => {
    item.value = 0;
  });
});
