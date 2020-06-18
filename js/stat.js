'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var BAR_WIDTH = 40;
var BAR_PADDING = 50;
var BAR_MAX_HEIGHT = 150;
var GAP = 10;
var CLOUD_PADDING = 20;

var GISTO_X = CLOUD_X + CLOUD_PADDING * 2;
var GISTO_Y = CLOUD_Y + 80;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
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
    var barColor = 'hsl(240, ' + saturation + ' % , 50%)';
  }
  return barColor;
};


window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING * 2);

  var maxTime = getMaxElement(times);

  ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  ctx.fillRect(GISTO_X, GISTO_Y, BAR_WIDTH, barHeight);

  for (var i = 0; i < players.length; i++) {
    var barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;

    ctx.fillStyle = getBarColor(players[i]);
    ctx.fillRect(GISTO_X + (BAR_WIDTH + BAR_PADDING) * i, GISTO_Y + (BAR_MAX_HEIGHT - barHeight), BAR_WIDTH, barHeight);


    var roundedTime = Math.round(times[i]);
    ctx.fillStyle = '#000';
    ctx.fillText(roundedTime, GISTO_X + (BAR_WIDTH + BAR_PADDING) * i, GISTO_Y + (BAR_MAX_HEIGHT - barHeight) - CLOUD_PADDING);
    ctx.fillText(players[i], GISTO_X + (BAR_WIDTH + BAR_PADDING) * i, GISTO_Y + BAR_MAX_HEIGHT + CLOUD_PADDING);

  }


};
