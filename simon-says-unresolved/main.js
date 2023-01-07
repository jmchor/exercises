let domSquareOne = document.getElementById("square-one")
let domSquareTwo = document.getElementById("square-two")
let domSquareThree = document.getElementById("square-three")
let domSquareFour = document.getElementById("square-four")

computerNumbers = []
playerNumbers = []

isPlayerTurn = false

// changing the color of the square


function highlight(color) {

    switch (color)
    {
        case 1:
            domSquareOne.style.backgroundColor = "red"
            setTimeout( () => {
                domSquareOne.style.backgroundColor = "darkred"
            }, 200)
            break;
        case 2:
            domSquareTwo.style.backgroundColor = "green"
            setTimeout( () => {
                domSquareTwo.style.backgroundColor = "darkgreen"
            }, 200)
            break;
        case 3:
            domSquareThree.style.backgroundColor = "blue"
            setTimeout( () => {
                domSquareThree.style.backgroundColor = "darkblue"
            }, 200)
            break;
        case 4:
            domSquareFour.style.backgroundColor = "yellow"
            setTimeout( () => {
                domSquareFour.style.backgroundColor = "goldenrod"
            }, 200)
            break;

    }

}

let doComputerPlays = () => {


    computerNumbers.push(getRandomNumber())
    console.log(computerNumbers)

    computerNumbers.forEach((number, index) => {

        setTimeout(() => {

            highlight(number)


        }, index * 1000)

    })



}

let computerTurn = () => {

    doComputerPlays()
    // the player's turn actually begins after the computerTurn, once isComputerTurn = false
    isPlayerTurn = true
}

function playerClick(numberClicked){

    if (!isPlayerTurn) return


    highlight(numberClicked)

    playerNumbers.push(numberClicked)
    let areArraysEqual = checkIfArraysAreEqual()

    if (areArraysEqual) {

        // highlight only if the arrays are equal !!!
        highlight(numberClicked)

        // check for last item of the arrays
        if (playerNumbers.length == computerNumbers.length)
        {
            isPlayerTurn = false
            computerTurn()

            // empty array please !!
            playerNumbers = []
        }
    }
    else
    {
        alert("game over!!")
    }

}

let checkIfArraysAreEqual = () => {
    slicedNumbers = computerNumbers.slice(0, playerNumbers.length)

    for (let i = 0; i < slicedNumbers.length; i++)
    {
        if (slicedNumbers[i] != playerNumbers[i])
        {
            return false
        }
    }

    // here means no elements were different
    return true

}

function getRandomNumber(){
    return Math.floor(Math.random() * 4) + 1
}getRandomNumber()