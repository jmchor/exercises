const myGameArea = {
    canvas: document.createElement('canvas'),
    components: [],
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        //document.body.appendChild(this.canvas);
    },

    update: function() {
        myGameArea.components.forEach(component => {
            component.render()
        })
    }

}

class Component {
    constructor (x,y,w,h, color) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
    }

    render() {

        const ctx = myGameArea.context

        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        } else if (this.color) {

            ctx.fillStyle = this.color
            ctx.fillRect = (this.x, this.y, this.w, this.h)
        }
    }
}

// class Player extends Component {
//     constructor (x,y,w,h, img) {
//         super(x,y,w,h)
//         this.img = img

// } }
myGameArea.start()


let background = new Component(0,0, myGameArea.canvas.width, myGameArea.canvas.height, 'pink')

myGameArea.components.push(background)

let player = new Component(0,0,50,50, 'green')
myGameArea.components.push(player)


setInterval (myGameArea.update(), 1000 / 60)

