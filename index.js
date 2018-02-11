//PRIM'S ALGORITHM
//Minimum spanning tree

var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

var spots = [];

class Spot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.draw();
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, 8, 0, Math.PI*2, false);
        c.strokeStyle = "white";
        c.stroke();
        c.fillStyle = "#434343";
        c.fill();
    }
}

function drawLines() {
    c.clearRect(0,0,canvas.width, canvas.height);
    var reached = [];
    var unreached = [];
    spots.forEach((spot) => {
        spot.draw();
        unreached.push({x:spot.x, y:spot.y});
    })
    reached.push(unreached[0]);
    unreached.splice(0,1);
    while (unreached.length > 0) {
        var dist = 100000;
        var rI;
        var uI;
        for (var i = 0; i < reached.length; i++) {
            for (var j = 0; j < unreached.length; j++) {
                var v1 = reached[i];
                var v2 = unreached[j];
                var d = Math.sqrt((v1.x-v2.x)*(v1.x-v2.x)+(v1.y-v2.y)*(v1.y-v2.y));
                if (d < dist) {
                    dist = d;
                    rI = i;
                    uI = j;
                }
            }
        }
        //Draw line rI -> uI
        c.beginPath();
        c.moveTo(reached[rI].x,reached[rI].y);
        c.lineTo(unreached[uI].x,unreached[uI].y);
        c.lineWidth = 3;
        c.strokeStyle = "#434343";
        c.stroke();

        reached.push(unreached[uI]);
        unreached.splice(uI,1);
    }
}

canvas.addEventListener("click", (event) => {
    spots.push(new Spot(event.x, event.y));
    drawLines();
});
