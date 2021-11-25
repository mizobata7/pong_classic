// Parametros do circulo
let xAxis = 300;
let yAxis = 200;
let d = 15;
let raio = d / 2;

// Parametros da raquete
let xRaquete = 5;
let yRaquete = 150;
let largura = 10;
let altura = 100;
let SpeedRaquete = 5;
// Raquete do oponente
let xOponente = 585;
let yOponente = 150;
let ySpeedOponente;
let chanceDeErrar = 40;

// Velocidade do circulo
let xSpeed = 5;
let ySpeed = xSpeed;

let colidiu = false;

// Placar do Jogo
let meusPontos = 0;
let oponentePontos = 0;

// Sons do jogo
let raquetada;
let ponto;
let pontoOP;
let music;

function preload() {
  music = new Audio("megalovania.mp3");
  ponto = loadSound("ponto.mp3");
  pontoOP = loadSound("uff-sound.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  music.volume = 0.15;
  music.play();
}

function draw() {
  background((canvas.style.background = "pink"));
  bolinha();
  moviment();
  borda();
  raquete(xRaquete, yRaquete);
  raquete(xOponente, yOponente);
  raquetemoviment();
  colisaoRaqueteBola(xRaquete, yRaquete);
  colisaoRaqueteBola(xOponente, yOponente);
  movimentoOponente();
  incluiPlacar();
  contagemPontos();
}

// Refatoração
function bolinha() {
  fill(color((128, 0, 128)));
  rect(297.5, 0, 5, 400);
  fill(255);
  circle(xAxis, yAxis, d);
}

function moviment() {
  xAxis += xSpeed;
  yAxis += ySpeed;
}

function borda() {
  if (xAxis + raio > width || xAxis - raio < 0) {
    xSpeed *= -1;
  }
  if (yAxis + raio > height || yAxis - raio < 0) {
    ySpeed *= -1;
  }
}
function raquete(x, y) {
  rect(x, y, largura, altura);
}

function raquetemoviment() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= SpeedRaquete;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += SpeedRaquete;
  }
}

function colisao() {
  if (
    xAxis - raio < xRaquete + largura &&
    yAxis - raio < yRaquete + altura &&
    yAxis + raio > yRaquete
  ) {
    xSpeed *= -1;
  }
}

function colisaoRaqueteBola(x, y) {
  colidiu = collideRectCircle(x, y, largura, altura, xAxis, yAxis, raio);
  if (colidiu) {
    xSpeed *= -1;
    raquetada.play();
  }
}

function movimentoOponente() {
  ySpeedOponente = yAxis - yOponente - altura / 2 - chanceDeErrar;
  yOponente += ySpeedOponente;
  calculaChanceDeErrar();
}

function incluiPlacar() {
  stroke(color(128, 0, 128));
  textAlign(CENTER);
  textSize(30);
  fill(color(255, 20, 147));
  rect(130, 7, 40, 30);
  rect(430, 7, 40, 30);
  fill(0);
  text(meusPontos, 150, 32);
  text(oponentePontos, 450, 32);
}

function contagemPontos() {
  if (xAxis > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xAxis < 10) {
    oponentePontos += 1;
    pontoOP.play();
  }
}

function calculaChanceDeErrar() {
  if (oponentePontos >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 60) {
      chanceDeErrar = 60;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 40) {
      chanceDeErrar = 40;
    }
  }
}