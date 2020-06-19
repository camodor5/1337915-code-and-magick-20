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

var GAP = 10;
var GISTO_X = CLOUD.x + CLOUD.padding * 2;
var GISTO_Y = CLOUD.y + 80;


var renderRect = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD.width, CLOUD.height);
};

var renderCloud = function (ctx, x, y, color) {
  renderRect(ctx, x + GAP, y + GAP, 'rgba(0, 0, 0, 0.3)');
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
    barColor = 'rgba(255, 0, 0, 1)';

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
/*
var renderResults = function (ctx, players, times) {
  var roundedTime = Math.round(times[j]);
  for (var j = 0; j < players.length; j++) {
    ctx.fillStyle = '#000';
    ctx.fillText(roundedTime, GISTO_X + (BAR.width + BAR.padding) * i, GISTO_Y + (BAR.maxHeight - barHeight) - CLOUD.padding);
    ctx.fillText(players[j], GISTO_X + (BAR.width + BAR.padding) * i, GISTO_Y + BAR.maxHeight + CLOUD.padding);
  }
};

var renderGistogram = function(ctx, players, times) {

  for (var i = 0; i < players.length; i++) {

    ctx.fillStyle = getBarColor(players[i]);
    ctx.fillRect(GISTO_X + (BAR.width + BAR.padding) * i, GISTO_Y + (BAR.maxHeight - barHeight), BAR.width, barHeight);


    var roundedTime = Math.round(times[i]);
    ctx.fillStyle = '#000';
    ctx.fillText(roundedTime, GISTO_X + (BAR.width + BAR.padding) * i, GISTO_Y + (BAR.maxHeight - barHeight) - CLOUD.padding);
    ctx.fillText(players[i], GISTO_X + (BAR.width + BAR.padding) * i, GISTO_Y + BAR.maxHeight + CLOUD.padding);

  }
};
*/


window.renderStatistics = function (ctx, players, times) {
  // Рисуем облако
  renderCloud(ctx, CLOUD.x, CLOUD.y, '#fff');

  // Рисуем вступительный текст
  renderIntro(ctx, 'Ура вы победили!', CLOUD.x + CLOUD.padding, CLOUD.y + CLOUD.padding, '16px PT Mono', '#000');
  renderIntro(ctx, 'Список результатов:', CLOUD.x + CLOUD.padding, CLOUD.y + CLOUD.padding * 2, '16px PT Mono', '#000');
  // Рисуем гистограмму
  /*
  renderGistogram(ctx, players, times);
  renderResults(ctx, players, times);

  var maxTime = getMaxElement(times);
  var barHeight = (BAR.maxHeight * times[i]) / maxTime; */

  var maxTime = getMaxElement(times);

  ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  ctx.fillRect(GISTO_X, GISTO_Y, BAR.width, barHeight);

  for (var i = 0; i < players.length; i++) {
    var barHeight = (BAR.maxHeight * times[i]) / maxTime;

    ctx.fillStyle = getBarColor(players[i]);
    ctx.fillRect(GISTO_X + (BAR.width + BAR.padding) * i, GISTO_Y + (BAR.maxHeight - barHeight), BAR.width, barHeight);


    var roundedTime = Math.round(times[i]);
    ctx.fillStyle = '#000';
    ctx.fillText(roundedTime, GISTO_X + (BAR.width + BAR.padding) * i, GISTO_Y + (BAR.maxHeight - barHeight) - CLOUD.padding);
    ctx.fillText(players[i], GISTO_X + (BAR.width + BAR.padding) * i, GISTO_Y + BAR.maxHeight + CLOUD.padding);

  }

};
