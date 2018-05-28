// 容器
var canvas;
var context;

var temp;
var tempCtx;

var bgw = document.documentElement.clientWidth;
var bgh = document.documentElement.clientHeight;

// 图片参数
var imgs = [];
var imgsData = [];
var imgsLoaded = 0;
var imgsLength = 19;    // 获取的图片数量
var imgw = 7;           // 图片最小宽度
var imgh = 7;           // 图片最小高度
var allw = 319;         // logo宽度
var allh = 343;         // logo高度
var randomX = 0;        // 初始随机左右偏移量
var randomY = 0;        // 初始随机上下偏移量
var imgScale = 3;       // 图片在页面缩放比基础上缩放倍数

// 确定页面缩放比例，铺屏
var scale = (bgw > bgh ? (bgh / allh) : (bgw / allw)) * (allw / allh);

// 图片位置数组
var initPositions = [];

// 初始化图片数组
window.onload = function () {
  canvas = document.querySelector('#canvas');
  canvas.width = bgw;
  canvas.height = bgh;
  context = canvas.getContext('2d');

  temp = document.querySelector('#temp');
  temp.width = imgw * scale * imgScale;
  temp.height = imgh * scale * imgScale;
  tempCtx = temp.getContext('2d');

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
      x: Math.random() * allw * scale + ((bgw - (allw * scale / (allw / allh))) / 2) + randomX,
      y: Math.random() * allh * scale + ((bgh - (allh * scale / (allw / allh))) / 2) + randomY,
      o: scale * imgScale
    };

    initPositions.push(initPositionItem);

    context.drawImage(
      imgs[parseInt(Math.random() * 19)],
      initPositionItem.x,
      initPositionItem.y,
      imgw * scale * imgScale,
      imgh * scale * imgScale
    );

    // 每个分拆单元变成图片缓存
    var imgData = context.getImageData(
      initPositionItem.x,
      initPositionItem.y,
      imgw * scale * imgScale,
      imgh * scale * imgScale
    );

    temp.width = temp.width;

    tempCtx.putImageData(
      imgData,
      0,
      0,
      0,
      0,
      imgw * scale * imgScale,
      imgh * scale * imgScale
    );

    var imgSrc = temp.toDataURL('image/png', 0.95);
    var imgDom = new Image();
    imgDom.src = imgSrc;

    imgsData.push(imgDom);
  }
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

  context.drawImage(
    imgsData[index],
    0,
    0,
    imgw * scale * imgScale,
    imgh * scale * imgScale,
    initPositions[index].x,
    initPositions[index].y,
    imgw * initPositions[index].o, // 此处将会缩放
    imgh * initPositions[index].o  // 此处将会缩放
  );
}

// animate
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}
