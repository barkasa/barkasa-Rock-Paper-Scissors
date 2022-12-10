const countUser = document.querySelector(".count-user");
const countComp = document.querySelector(".count-comp");
const userZone = document.querySelector(".user-zone");
const computerZone = document.querySelector(".computer-zone");
const sound = document.querySelector(".sound");
const play = document.querySelector(".replay");
const btns = document.querySelectorAll(".btn");
const winer = document.querySelector(".winer");
const gameOver = document.querySelector(".game-over");
const res = document.querySelector(".result");
const music = document.querySelector(".music");
let userStep;
let compStep;
let countU = 0;
let countC = 0;
let blocked = false;

play.addEventListener("click", playGame);
userZone.addEventListener("click", choiseUser);

function out() {
  setTimeout(() => {
    btns.forEach((item) => item.classList.remove("active"));
  }, 2000);
  setTimeout(() => {
    res.innerText = "Стреляй, а не болтай!";
  }, 2500);
}

function choiseUser(e) {
  if (blocked) {
    return;
  }
  let target = e.target;
  if (target.classList.contains("btn")) {
    userStep = target.dataset.btn;
    btns.forEach((item) => item.classList.remove("active"));

    e.target.classList.add("active");
    sound.setAttribute("src", "audio/1fc1d51f04ffdb8.mp3");
    sound.play();
    choiseComp();
  }
}
function choiseComp() {
  blocked = true;
  let random = Math.floor(Math.random() * 3);
  computerZone.classList.add("blink");

  let computerZones = computerZone.querySelectorAll(".btn");

  setTimeout(() => {
    computerZone.classList.remove("blink");

    compStep = computerZones[random].dataset.btn;
    computerZones[random].classList.add("active");

    winner();
  }, 3000);
}
function winner() {
  blocked = false;
  let combination = userStep + compStep;
  //   console.log(combination);
  switch (combination) {
    case "rockrock":
    case "scissorsscissors":
    case "paperpaper":
      res.innerText = "Ничья!";
      sound.setAttribute("src", "audio/rikoshet.mp3");
      sound.play();
      out();

      break;
    case "rockscissors":
    case "scissorspaper":
    case "paperrock":
      res.innerText = "Твоя взяла!";
      sound.setAttribute("src", "audio/shumnyiy-odinochnyiy-vyistrel.mp3");
      sound.play();
      countU++;
      countUser.innerText = countU;
      out();

      if (countU == 3) {
        sound.setAttribute("src", "audio/game-won.mp3");
        sound.play();
        res.innerText = "Ты победил!";
        blocked = true;
        setTimeout(() => {
          sound.setAttribute(
            "src",
            "audio/Muzyka_iz_Filma_Posledniy_iz_Mogikan.mp3"
          );
          sound.play();
        }, 3000);
      }

      userZone.querySelector("[data-set = los]").classList.remove("active");
      computerZone.querySelector("[data-set = win]").classList.remove("active");

      computerZone.querySelector("[data-set = los]").classList.add("active");
      userZone.querySelector("[data-set = win]").classList.add("active");

      break;
    case "scissorsrock":
    case "paperscissors":
    case "rockpaper":
      res.innerText = "Неудача!";
      sound.setAttribute("src", "audio/shumnyiy-odinochnyiy-vyistrel.mp3");
      sound.play();
      countC++;
      countComp.innerText = countC;
      out();

      if (countC == 3) {
        sound.setAttribute("src", "audio/game-lost.mp3");
        sound.play();
        res.innerText = "Ты проиграл!";
        blocked = true;
        setTimeout(() => {
          sound.setAttribute(
            "src",
            "audio/Muzyka_iz_Filma_Posledniy_iz_Mogikan.mp3"
          );
          sound.play();
        }, 4000);
      }

      computerZone.querySelector("[data-set = los]").classList.remove("active");
      userZone.querySelector("[data-set = win]").classList.remove("active");

      userZone.querySelector("[data-set = los]").classList.add("active");
      computerZone.querySelector("[data-set = win]").classList.add("active");

      break;
  }
}
function playGame() {
  countU = 0;
  countC = 0;
  res.innerText = "Стреляй, а не болтай!";
  countUser.innerText = "0";
  countComp.innerText = "0";
  sound.setAttribute("src", "audio/sfx_wildwest_ordnance_express.mp3");
  sound.play();

  out();

  blocked = false;
}
