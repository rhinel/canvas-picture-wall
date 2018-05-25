/**
 * @author Ryan Liu
 * www.ryan-liu.com
 */

var canvas;
var context;
var img;
// 图片拆散后的数组
var imgArr = new Array();
// 图片渲染组合后位置
var ox = 350;
var oy = 50;
var w = 100;
var h = 100;
var th = 1;
// 底部位置
var bottom;

// 图片具体像素点位置
var posData = new Array();
// 初始乱点位置
var oldPos = new Array();
// 当前位置及变动参数
var currentData = new Array();
// 目标即是原图状态
var targetData = posData;

// 状态
var reversed = false;

for (var i = 0; i < h; i++) {
	posData[i] = new Array();
	oldPos[i] = new Array();
	currentData[i] = new Array();
	for (var j = 0; j < w; j++) {
		posData[i][j] = {
			x: ox + j,
			y: oy + i
		};
		oldPos[i][j] = {
			x: Math.random() * 800,
			y: Math.random() * 600
		};
		currentData[i][j] = {
			x: Math.random() * 800,
			y: Math.random() * 600,
			vx: 0,
			vy: 0,
			ax: .09 - Math.random() * .08,
			ay: .09 - Math.random() * .08,
			nx: .4 + Math.random() * .3,
			ny: .3 + Math.random() * .2
		};
	}
}

console.log(currentData);
console.log(targetData);

window.onload = init;
window.onclick = onClick;

function init() {
	canvas = $('canvas');
	context = canvas.getContext('2d');
	bottom = canvas.height - 1;
	img = new Image();
	img.src = 'assets/ryan.gif';
	img.onload = function () {
		setInterval(run, 10);

		// 图片画上去，取出图像像素点后清空
		context.drawImage(img, 0, 0);
		for (var i = 0; i < h; i++) {
			imgArr[i] = [];
			for (var j = 0; j < w; j++) {
				imgArr[i][j] = context.getImageData(j, i, 1, 1);
			}
		}
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
}

function run() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	if (!reversed) {
		if (th < h) th++;
		for (var i = 0; i < h; i++) {
			for (var j = 0; j < w; j++) {
				var target = targetData[i][j];
				var current = currentData[i][j];
				if (i < th) {
					var xdiff = target.x - current.x;
					var ydiff = target.y - current.y;
					// 如果起始终止差距小于0.5直接到终止
					// 如果大于则根据变动系数来递增
					if (Math.abs(xdiff) < .5) {
						current.x = target.x;
					} else {
						current.x += (target.x - current.x) * current.ax;
					}
					if (Math.abs(ydiff) < .5) {
						current.y = target.y;
					} else {
						current.y += (target.y - current.y) * current.ay;
					}
				}
				context.putImageData(imgArr[i][j], current.x, current.y);
			}
		}
	} else {
		for (var i = 0; i < h; i++) {
			for (var j = 0; j < w; j++) {
				var current = currentData[i][j];
				current.x += current.vx;
				current.y += current.vy;

				// 根据个什么方程来确定位置
				if (current.y >= bottom) {
					current.y = bottom;
					current.vy = -current.ny * current.vy;
					if (Math.abs(current.vy) <= 1) {
						current.vy = 0;
					}
					current.vx *= current.nx;
					if (Math.abs(current.vx) <= 1) current.vx = 0;
				} else {
					current.vy += 1;
				}
				context.putImageData(imgArr[i][j], current.x, current.y);
			}
		}
	}

}

function onClick() {
	reversed = !reversed;
	if (reversed) {
		for (var i = 0; i < h; i++) {
			for (var j = 0; j < w; j++) {
				var current = currentData[i][j];
				current.vx = (Math.random() - Math.random()) * 3;
				current.vy = -Math.random() * 10;
			}
		}
	} else {
		th = 1;
		// targetData = posData;
	}
}


function $(id) {
	return document.getElementById(id);
}
