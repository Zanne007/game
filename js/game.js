//创建画布
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
// 加载背景图
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// 加载英雄图
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";

// 加载怪物图
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";
//创建游戏对象
var hero = {
    speed: 256 // 每秒运动的像素
};
var monster = {};
var monstersCaught = 0;
var hero = {
    speed: 256 // 每秒运动的像素
};
var monster = {};
var monstersCaught = 0;
var hero = {
    speed: 256 // 每秒运动的像素
};
var monster = {};
var monstersCaught = 0;//存储怪物被捉住的次数
//处理用户的输入
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

//开始一轮游戏
    // 重置游戏当玩家抓了一只怪物
var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // 把怪物随机出现在屏幕上的某个地方
    monster.x = 32 + (Math.random() * (canvas.width - 96));
    monster.y = 32 + (Math.random() * (canvas.height - 96));

};
//更新对象
var update = function (modifier) {
    if (38 in keysDown) { // 玩家向上拦截
        if(hero.y<=32){
            return
        }else {
            hero.y -= hero.speed * modifier;
        }
    }
    if (40 in keysDown) { // 玩家向下拦截
        if (hero.y>canvas.height - 64){
            return
        }else {
            hero.y += hero.speed * modifier;
        }
    }
    if (37 in keysDown) { // 玩家向左拦截
        if (hero.x<=32){
            return
        }else {
            hero.x -= hero.speed * modifier;
        }
    }
    if (39 in keysDown) { // 玩家向右拦截
        if (hero.x>canvas.width - 64){
            return
        }else {
            hero.x += hero.speed * modifier;
        }
    }
// 判断是否触碰
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        ++monstersCaught;
        reset();
    }
};
// 渲染物体
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }
    // 得分
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("打怪数: " + monstersCaught, 32, 32);
};
// 游戏主循环
var main = function () {
    var now = Date.now();

    var delta = now - then;
    //console.log(delta);
    update(delta / 1000);
    render();

    then = now;

    // 再次请求主函数
    requestAnimationFrame(main);
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// 启动游戏
var then = Date.now();
reset();
main();