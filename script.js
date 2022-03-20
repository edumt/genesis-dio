let order = [];
let clickedOrder = [];
let score = 0;
const timePerTimeStep = 1000;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const green = document.querySelector(".green");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const blue = document.querySelector(".blue");
const colors = [green, red, yellow, blue];

//cria ordem aletoria de cores
const shuffleOrder = () => {
  clickedOrder = [];
  const randomColor = Math.floor(Math.random() * 4);
  order.push(randomColor);

  order.forEach((color, index) => lightColor(colors[color], index + 1));
};

//acende a proxima cor
const lightColor = (colorElement, timeSteps) => {
  const time = timeSteps * timePerTimeStep;
  setTimeout(() => {
    colorElement.classList.add("selected");
  }, time);
  setTimeout(() => {
    colorElement.classList.remove("selected");
  }, time + timePerTimeStep / 2);
};

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
const checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length === order.length) {
    alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
    nextLevel();
  }
};

//funcao para o clique do usuario
const click = (clickedColor) => {
  clickedOrder.push(clickedColor);

  const clickedColorElement = colors[clickedColor];
  clickedColorElement.classList.add("selected");
  setTimeout(() => {
    clickedColorElement.classList.remove("selected");
    checkOrder();
  }, 250);
};

//funcao para proximo nivel do jogo
const nextLevel = () => {
  score++;
  shuffleOrder();
};

//funcao para game over
const gameOver = () => {
  alert(
    `Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`
  );
  order = [];
  clickedOrder = [];

  playGame();
};

//funcao de inicio do jogo
const playGame = () => {
  alert("Bem vindo ao Gênesis! Iniciando novo jogo!");
  score = 0;

  nextLevel();
};

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//inicio do jogo
playGame();
