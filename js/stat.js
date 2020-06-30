'use strict';
var CLOUD = {
  width: 420,
  height: 270,
  x: 100,
  y: 10,
  padding: 20,
};

var BAR = {
  width: 40,
  maxHeight: 150,
  padding: 50,
};

var COLOR = {
  black: '#000',
  red: 'rgba(255, 0, 0, 1)',
  white: '#fff',
  shadow: 'rgba(0, 0, 0, 0.3)'
};

var GAP = 10;
var GISTO_X = CLOUD.x + CLOUD.padding * 2;
var GISTO_Y = CLOUD.y + 80;


var renderRect = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD.width, CLOUD.height);
};

var renderCloud = function (ctx, x, y, color) {
  renderRect(ctx, x + GAP, y + GAP, COLOR.shadow);
  renderRect(ctx, x, y, color);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};


var getRandomNumber = function (max, min) {
  if (min === undefined) {
    min = 0;
  }
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};


var getBarColor = function (name) {
  var saturation = getRandomNumber(100);
  if (name === 'Вы') {
    barColor = COLOR.red;

  } else {
    var barColor = 'hsl(240, ' + saturation + '% , 50%)';
  }
  return barColor;
};


var renderIntro = function (ctx, text, x, y, font, fillStyle) {
  ctx.fillStyle = fillStyle;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

var renderResults = function (ctx, time, x, y) {
  var roundedTime = Math.round(time);
  ctx.fillStyle = COLOR.black;
  ctx.fillText(roundedTime, x, y);
};

var renderNames = function (ctx, player, x, y) {
  ctx.fillStyle = COLOR.black;
  ctx.fillText(player, x, y);
};

var renderBar = function (ctx, player, time, x, y, width, height) {
  ctx.fillStyle = getBarColor(player);
  ctx.fillRect(x, y, width, height);
};


var renderGistogram = function (ctx, players, times) {

  for (var i = 0; i < players.length; i++) {
    var maxTime = getMaxElement(times);
    var barHeight = (BAR.maxHeight * times[i]) / maxTime;
    var currentX = GISTO_X + (BAR.width + BAR.padding) * i;
    var currentY = GISTO_Y + BAR.maxHeight;
    renderNames(ctx, players[i], currentX, currentY + CLOUD.padding);
    renderResults(ctx, times[i], currentX, currentY - barHeight - GAP);
    renderBar(ctx, players[i], times[i], currentX, currentY - barHeight, BAR.width, barHeight);
  }
};


window.renderStatistics = function (ctx, players, times) {
  // Рисуем облако
  renderCloud(ctx, CLOUD.x, CLOUD.y, COLOR.white);

  // Рисуем вступительный текст
  renderIntro(ctx, 'Ура вы победили!', CLOUD.x + CLOUD.padding, CLOUD.y + CLOUD.padding, '16px PT Mono', COLOR.black);
  renderIntro(ctx, 'Список результатов:', CLOUD.x + CLOUD.padding, CLOUD.y + CLOUD.padding * 2, '16px PT Mono', COLOR.black);
  // Рисуем гистограмму

  renderGistogram(ctx, players, times);
};
