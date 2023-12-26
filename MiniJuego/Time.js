const score2 = document.querySelector(".score2")
const list = document.querySelector(".list")

let number = 0;

let time = setInterval(() => {
    number++
    score.textContent = `${number.toString().padStart(6, '0')}`;
    score2.textContent = `${number.toString().padStart(6, '0')}`
}, 50);
