const myGameArea = {
    canvas: document.createElement('canvas'),
    components: [],
    isGamePaused: false,
    isGameOver: false,
    generateCanvas: function () {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    update: function () {

        const ctx = myGameArea.context

        // render the background
        ctx.drawImage(background.img, background.x, background.y, myGameArea.canvas.width, myGameArea.canvas.height)
        ctx.drawImage(background.img, background.x + background.w , background.y, myGameArea.canvas.width, myGameArea.canvas.height)

        background.x--
        if (background.x < -background.w) background.x = 0


        // update the player's vertical speed
        player.ySpeed = player.ySpeed - player.gravity
        player.y -= player.ySpeed

        // game logic
        for (let i = 0; i < pipesUp.length; i++) {

            let pipe = pipesUp[i]

            if (pipe.x < 0 - pipe.w) {

                let newX = pipesUp[pipesUp.length - 1].x + 60

                pipesUp.push(new Pipe(newX, "up"))
                pipesDown.push(new Pipe(newX, "down"))

                pipesUp.shift()
                pipesDown.shift()


            }
        }

        // it's not GameOver - render the game
        if (!myGameArea.isGameOver) {

            myGameArea.components.forEach(component => {
                component.render()
            })

            // Render the Up Pipes, check for collisions and check for out of bounds
            pipesUp.forEach(pipe => {

                if (pipe.checkCollision(player)) {
                    myGameArea.isGameOver = true
                    ctx.clearRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height)
                    document.getElementById("game-over").style.display = "flex"
                }

                pipe.x -= 1
                pipe.render()
            })

            // Render the Down Pipes
            pipesDown.forEach(pipe => {

                if (pipe.checkCollision(player)) {
                    myGameArea.isGameOver = true
                    ctx.clearRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height)
                    document.getElementById("game-over").style.display = "flex"
                }

                pipe.x -= 1
                pipe.render()
            })
        }
        else
        {
            ctx.clearRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height)
        }
    }
}

myGameArea.generateCanvas()

class Component {
    constructor(x, y, w, h, color) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        if (color) this.color = color
    }

    render() {

        const ctx = myGameArea.context

        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        }
        else if (this.color) {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.w, this.h)
        }

    }

    checkCollision(otherComponent) {
        if (
            this.x < otherComponent.x + otherComponent.w &&
            this.x + this.w > otherComponent.x &&
            this.y < otherComponent.y + otherComponent.h &&
            this.y + this.h > otherComponent.y
        ) {
            return true
        }
        else {
            return false
        }
    }

}


class Player extends Component {

    constructor(x, y, w, h) {
        super(x, y, w, h)
        this.img = new Image()
        this.img.src = "Player.png"

        this.gravity = 0.1
        this.ySpeed = 0
        this.velocity = 0.1
    }

    // This render() is ONLY FOR THE PLAYER
    render() {
        const ctx = myGameArea.context
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    moveLeft() {
        this.x -= 10
    }

    moveRight() {
        this.x += 10
    }

    moveUp() {
        this.ySpeed = 3
    }

}

class Pipe extends Component {

    static distance = 200
    static width = 20
    static height = myGameArea.canvas.height

    constructor(x, alignment) {

        let y
        let offset = Math.floor(Math.random() * 51)

        if (alignment == "up") {
            y = - myGameArea.canvas.height + Pipe.distance - offset
        }
        else if (alignment == "down") {
            y = myGameArea.canvas.height - Pipe.distance - offset
        }

        super(x, y, Pipe.width, Pipe.height, "red")

    }
}

document.addEventListener('keydown', ({ key }) => {

    if (myGameArea.isGamePaused) return

    switch (key) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":
            player.moveDown()
            break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
            player.moveUp()
            break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
            player.moveLeft()
            break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
            player.moveRight()
            break;
        case "Enter":

            // call a bunch of things to restart the game

            break;
        case "Esc": // IE/Edge specific value
        case "Escape":
            pause()

            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
})

let background;
let player;

let pipesUp = []
let pipesDown = []

let updateTimer

let restart = () => {

    pipesUp = []
    pipesDown = []

    player.x = 0
    player.y = 0
    player.ySpeed = 0

    // Generate Pipes
    for (let i = 0; i <= 10; i++) {
        pipesUp.push(new Pipe(300 + i * 60, "up"))
        pipesDown.push(new Pipe(300 + i * 60, "down"))
    }

}

let pause = () => {

    if (!myGameArea.isGamePaused) {

        clearInterval(updateTimer)
        myGameArea.isGamePaused = true

    } else {

        setInterval(myGameArea.update, 1000 / 60)
        myGameArea.isGamePaused = false

    }


}

document.getElementById("play").addEventListener('click', (event) =>
{
    // Create the Background
    background = new Component(0, 0, myGameArea.canvas.width, myGameArea.canvas.height, "pink")
    background.img = new Image();
    background.img.src = "Background.png"
    //myGameArea.components.push(background)

    // Create the Player
    player = new Player(0, 0, 24, 28)
    myGameArea.components.push(player)

    // Generate Pipes
    for (let i = 0; i <= 10; i++) {
        pipesUp.push(new Pipe(300 + i * 60, "up"))
        pipesDown.push(new Pipe(300 + i * 60, "down"))
    }

    updateTimer = setInterval(myGameArea.update, 1000 / 60)

    document.getElementById("main-menu").style.display = "none"
    document.getElementById("restart").disabled = false
})

document.getElementById("restart").addEventListener('click', (event) => {

    restart()
    myGameArea.isGameOver = false
    document.getElementById("game-over").style.display = "none"

})

document.getElementById("restart-game-over").addEventListener('click', (event) => {

    restart()
    myGameArea.isGameOver = false
    document.getElementById("game-over").style.display = "none"

})

// Create a Pause / Unpause function (you can also create your HTML for it)










