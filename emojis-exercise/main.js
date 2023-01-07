
let names = ["😀", "😃", "😄", "😁", "😆", "😅", "🤣"]
let superText = document.getElementById("emojis-text")

let body = document.querySelector("body")
let button = document.createElement("button")
button.innerHTML = "Reset"
button.setAttribute("onclick", "reset()")
body.appendChild(button)
body.insertBefore(button, superText)

function addEmoji()
{
    // I need to loop through the array here! consider using the counter
    let emoji = names[counter % names.length]
    superText.innerHTML += emoji
    counter++

}

let counter = 0;

// Add an emoji every second
// (if it reaches the end, go back to the beginning of the array)

setInterval(() => {
    addEmoji()
}, 200)

function reset()
{
    clearInterval()
    counter = 0;
    superText.innerHTML = ""
}

/*

// Example for timeout

setTimeout(() => {
    addEmoji()
}, 1000)

*/