const myGameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
            this.canvas.width = 480;
            this.canvas.height = 270;
            this.context = this.canvas.getContext('2d');
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea(), 20);

        },
    clear: function () {
            this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
        }
    };

class Component {
    constructor(width, height, color, x,y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    update() {
        const ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect = (this.x, this.y, this.width, this.height)
    }

}

function updateGameArea() {
    myGameArea.clear();
    player.update();
}

const player = new Component(30, 30, 'red', 0, 110)