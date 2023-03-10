const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = [
  "rgb(255, 166, 0)",
  "rgb(30, 255, 0) ",
  "rgb(0, 225, 255)",
  "rgb(255, 0, 234)",
  "rgb(255, 0, 0)",
];
let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault(); //отменяем действие по умолчанию, здесь переходим по ссылке href="#"
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  //Мы назначили событие на весь блок с кнопочками секунд
  if (event.target.classList.contains("time-btn")) {
    //Проверяем, есть ли у нажатого элемента класс time-btn
    time = parseInt(event.target.getAttribute("data-time")); //преобразуем в число атрибут полученной кнопки
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame(); //Если время равно 0, то игра заканчивается
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`; //добавили 0 к секундам, когда меньше 10
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.remove(); //удаляем отображение родительского блока таймера. Чтобы не было скачка, можно timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect(); //деструктуризацией получаем размеры поля

  const x = getRandomNumber(0, width - size); //предполагаем, что может получиться число 500, чтобы кружок влез, мы отнимаем его ширину
  const y = getRandomNumber(0, height - size);

  circle.classList.add("circle"); //Создаем класс кружочкам
  setColor(circle);

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function setColor(element) {
  const color = getRandomColor();
  element.style.background = color;
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
