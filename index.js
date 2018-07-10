//获取当前画布
const canvas = document.getElementById('mycanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d') //2d绘图

//窗体改变大小
window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    panel.y=canvas.height-30;
}

//封装随机产生的数值
function numberRandom(min, max) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * min + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (max - min + 1) + min, 10);
            break;
        default:
            return 0;
            break;
    }
}

//封装随机产生的颜色
function colorRamdom() {
    return '#' +Math.random().toString(16).substring(2,8)
}


let score=0;
//web小球

let ball = {
    r: 30,
    x: Math.floor(canvas.width / 2),
    y: Math.floor(canvas.height / 2),
    yspeed: numberRandom(1, 5),
    xspeed: numberRandom(1, 5),
    color: colorRamdom(),
    //小球移动
    move() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    },
    //画圆
    render() {
        //console.log(this.x+'--'+this.y);
        ctx.save() //保存
        ctx.beginPath();//开启路径
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill(); //绘制
        ctx.closePath();
        //console.log('1');
    },
    addscore(){
        ctx.font="20px Verdana";
        ctx.fillText('得分:'+score,canvas.width-100, 60);
    }
    ,
    //清除
    clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    //判断边界
    check() {
        if (this.x < this.r || this.x > canvas.width - this.r) {
            this.xspeed = -this.xspeed;
            this.color = colorRamdom();
        }
        if (this.y < this.r) {
            this.yspeed = -this.yspeed;
            this.color = colorRamdom();
        }

        if(this.y+this.r>=panel.y && this.y+this.r<canvas.height-20  && this.x>=panel.x-100 && this.x<=panel.x+100){
            //console.log('ojbk');
            //this.xspeed = -this.xspeed;
            this.yspeed = -this.yspeed;
            this.color = colorRamdom();
            panel.color1=colorRamdom();
            panel.color2=colorRamdom();
            //分数加1
            score++;
        }else if(this.y >= canvas.height - this.r+30){
            clearInterval(mytime);
            //canvas.style.cursor="default";
            //console.log(canvas.style.cursor)
            if(confirm('游戏结束.是否重新开始?')){
                location.reload();
            }else{
                window.close();
            }
        }
    }
}

let panel = {
    y: canvas.height - 30,
    x: null,
    color1: colorRamdom(),
    color2: colorRamdom(),
    move() {
        let grd = ctx.createLinearGradient(this.x - 100, this.y, this.x + 200, this.y + 10);
        grd.addColorStop(0, this.color1);
        grd.addColorStop(1, this.color2);
        ctx.fillStyle = grd;
        ctx.fillRect(this.x - 100, this.y, 200, 10);
        //console.log(this.x - 100);
    }
}



let mytime=setInterval(() => {
    ball.clear();
    ball.move();
    ball.render();
    panel.move();
    ball.check();
    ball.addscore();
}, 10)


canvas.onmousemove=function(e){
    //console.log(e.offsetX);
    panel.x=e.offsetX;
}