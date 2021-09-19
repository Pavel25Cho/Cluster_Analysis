var points = [];
var keys = [];
canvas = document.getElementById('myCanvas');
ctx=canvas.getContext('2d');
var iterations = 0;

$(document).ready(function () {
    $("#place").click(function () {                         // Placing points on canvas
        ctx.clearRect(0, 0, 650, 650)           // Clearing previous points
        for( let i=1; i <= $("#points").val() ; i++) {
            let colour = '#000000';
            ctx.fillStyle= colour;
            let x = Math.random() * 647;
            let y = Math.random() * 647;
            ctx.fillRect(x,y,3,3);
            let point = {
                    x:      x,
                    y:      y,
                    colour: colour
            };
            points.push(point);
        };
    });
    $("#push").click(function () {
        let colour = getRandomColor();
        let x = $("#x").val();
        let y = $("#y").val();
        makeKeys(x,y, colour);
    });
    $("#rnd").click(function () {
        let colour = getRandomColor();
        let x = Math.random() * 642;
        let y = Math.random() * 642;
        makeKeys(x,y, colour);
    });
    $("#make").click(function () {
        color()
        recolor();
    });
});

function color(){
    for (let i=0; i <= points.length - 1 ; i++) {
        var lowest = 70000000;
        for (let j=0; j <= keys.length -1 ; j++){
            let range = Math.sqrt(   Math.pow( points[i].x - keys[j].x, 2) +
                Math.pow( points[i].y - keys[j].y, 2) )
            if (lowest > range) {
                lowest = range;
                points[i].colour = keys[j].colour;
            }
        }
    }
}

function recolor (){
    iterations += 1;
    ctx.clearRect(0, 0, 650, 650)
    for (let i=0; i <= points.length - 1 ; i++) {
        ctx.fillStyle= points[i].colour;
        ctx.fillRect(points[i].x,points[i].y,3,3);
    }
    for (let i=0; i <=keys.length -1; i++){
        ctx.fillStyle= '#000000';
        ctx.fillRect(keys[i].x - 1,keys[i].y - 1, 10,10);
        ctx.fillStyle = keys[i].colour;
        ctx.fillRect(keys[i].x,keys[i].y,8,8);
    }
    var Done = 0;
    for (let i=0; i <=keys.length -1; i++) {
        var sumX = 0;
        var sumY = 0;
        var pointCount = 0;
        var prevX = 0;
        var prevY = 0
        for (let j=0; j <= points.length - 1 ; j++){
            if (points[j].colour == keys[i].colour) {
                sumX += points[j].x;
                sumY += points[j].y;
                pointCount += 1;
            }
        }
        if (keys[i].x.toFixed(0) == (sumX/pointCount).toFixed(0) &&
            keys[i].y.toFixed(0) == (sumY/pointCount).toFixed(0))
        { Done += 1 }
        keys[i].x = sumX/pointCount;
        keys[i].y = sumY/pointCount;
    }
    if (Done == keys.length) {
        console.log("DONE");
        $("#message")[0].innerHTML = 'Clustering was completed in ' + iterations + ' iterations';
    }
    else {
        sleep(300).then(() => {
            $("#message")[0].innerHTML = 'Done '+ Done + ' / ' + keys.length + ' clusters';
            color();
            recolor();
        } )
    }
}


function makeKeys (x, y, colour){
    ctx.fillStyle= '#000000';
    ctx.fillRect(x-1,y-1, 10,10);
    ctx.fillStyle= colour;
    ctx.fillRect(x,y,8,8);
    let point = {
        x:      x,
        y:      y,
        colour: colour
    };
    keys.push(point);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}