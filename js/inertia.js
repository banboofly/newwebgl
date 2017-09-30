var startX,startY;
var lastMoveTime;
var velocity_x, velocity_y;

function scrollStart(start_x, start_y){
    startX = start_x;
    startY = start_y;
    lastMoveTime = Date.now();
    velocity_x = velocity_y = 0;
}

function scrollMove(move_x, move_y){
    var nowTime = Date.now();
    if (nowTime - lastMoveTime > 80) {
        lastMoveTime = nowTime;
        startX = move_x;
        startY = move_y;
    }
}

function scrollEnd(end_x, end_y, callback){
    var nowTime = Date.now();
    var moveX = end_x - startX;
    var moveY = end_y - startY;

    velocity_x = moveX / (nowTime - lastMoveTime);
    velocity_y = moveY / (nowTime - lastMoveTime)//最后一段时间滑动的速度

    var dirX = velocity_x > 0 ? 1 : -1;
    var dirY = velocity_y > 0 ? 1 : -1;
    var decelerationX = Math.abs(0.01) ;
    var decelerationY = Math.abs(0.01*velocity_y/velocity_x);
    var duration = Math.abs(velocity_x/decelerationX);

    var t = 0;
    var tmp_speedX = Math.abs(velocity_x);
    var tmp_speedY = Math.abs(velocity_y);
    var timer = setInterval(function(){
        t += 10;
        var dx = (tmp_speedX*10 - 0.5*decelerationX*10*10)*dirX;
        var dy = (tmp_speedY*10 - 0.5*decelerationY*10*10)*dirY;
        tmp_speedX -= decelerationX * 10;
        tmp_speedY -= decelerationY * 10;

        if (t >= duration) {
            clearInterval(timer);
        }else{
            callback(dx, dy);

        }
    } , 10);
}