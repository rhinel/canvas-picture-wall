var canvas;
var context;
var bgw = document.documentElement.clientWidth;
var bgh = document.documentElement.clientHeight;

// 图片参数
var imgs = [];
var imgsData = [];
var imgsLength = 19;
var imgsLoaded = 0;
var imgw = 7;
var imgh = 7;
var allw = 319 - imgw;
var allh = 343 - imgh;
var randomX = 0;
var randomY = 0;

bgw = bgw - imgw;
bgh = bgh - imgh;

// var scale = 1;
var scale = (bgw > bgh ? (bgh / allh) : (bgw / allw)) * (allw / allh);

// fix 边缘区域

// 图片位置数组
var initPositions = [];
var nowPositions = [];

// 初始化图片数组
window.onload = function () {
  canvas = document.querySelector('#canvas');
  canvas.width = bgw;
  canvas.height = bgh;
  context = canvas.getContext('2d');

  for (var imgIndex = 1; imgIndex <= imgsLength; imgIndex++) {
    var imgSrc = new Image();
    imgSrc.src = './assets/avatar/h' + imgIndex + '.jpg';
    imgs.push(imgSrc);
    imgSrc.onload = function () {
      imgsLoaded++;
      if (imgsLoaded === imgsLength) {
        draw();

        setTimeout(function () {
          transMove(2000);
          animate();
        }, 500);
      };
    };
  }
}

// 显示初始位置
function draw() {
  for (var initPosition = 0; initPosition < logoPositionTable.length; initPosition++) {
    var initPositionItem = {
      x: Math.random() * allw * scale + ((bgw - (allw * scale)) / 2) + randomX,
      y: Math.random() * allh * scale + ((bgh - (allh * scale)) / 2) + randomY,
      o: scale
    };

    initPositions.push(initPositionItem);

    context.drawImage(
      imgs[parseInt(Math.random() * 19)],
      initPositionItem.x,
      initPositionItem.y,
      imgw * scale,
      imgh * scale
    );

    imgsData.push(context.getImageData(
      initPositionItem.x,
      initPositionItem.y,
      imgw * scale,
      imgh * scale
    ));
  }

  nowPositions = JSON.parse(JSON.stringify(initPositions));
}

// 动态渲染过程
function transMove(duration) {
  TWEEN.removeAll();
  for (var i = 0; i < initPositions.length; i++) {
    var object = initPositions[i];
    var target = logoPositionTable[i];
    var targetRender = (function (targetIndex) {
      return function (targetObject) {
        render(targetObject, targetIndex);
      }
    })(i);
    new TWEEN.Tween(object)
      .to({
        x: target.x + ((bgw - allw) / 2),
        y: target.y + ((bgh - allh) / 2),
        o: 1
      }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .delay(Math.random())
      .start();

    new TWEEN.Tween(this)
      .to({}, duration * 2)
      .onUpdate(targetRender)
      .start();
  }
}

// render
function render(target, index) {
  if (index === 0) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  context.putImageData(
    imgsData[index],
    initPositions[index].x,
    initPositions[index].y,
    0,
    0,
    imgw * initPositions[index].o,
    imgh * initPositions[index].o
  );
}

// animate
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}
