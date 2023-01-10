let android1ArmsUp
let android2ArmsUp
let android3ArmsUp
let android4ArmsUp

const android1 = document.getElementsByClassName('android')[0]
const android2 = document.getElementsByClassName('android')[1]
const android3 = document.getElementsByClassName('android')[2]
const android4 = document.getElementsByClassName('android')[3]


let path1 = './img/android_1.png'
let path2 = './img/android_2.png'


// create a setInterval for each of the androids that does the following:
// it will change its backgroundImage to be android_2 when it goes up
// and change back to android_1 when it goes down
// also, toggle the android-up class everytime it switches positions

// Android 1
setInterval(() => {
    if (android1ArmsUp) {

        android1ArmsUp = false
        android1.style.backgroundImage = `url(${path1})`

    } else {
        android1ArmsUp = true
        android1.style.backgroundImage = `url(${path2})`
    }
    android1.classList.toggle('android-up')
    }, 3000)

// Android 2
setInterval(() => {
    if (android2ArmsUp) {

        android2ArmsUp = false
        android2.style.backgroundImage = `url(${path1})`

    } else {
        android2ArmsUp = true
        android2.style.backgroundImage = `url(${path2})`
    }
    android2.classList.toggle('android-up')
    }, 1250)

// Android 3
setInterval(() => {
    if (android3ArmsUp) {

        android3ArmsUp = false
        android3.style.backgroundImage = `url(${path1})`

    } else {
        android3ArmsUp = true
        android3.style.backgroundImage = `url(${path2})`
    }
    android3.classList.toggle('android-up')
    }, 1750)

// Android 4
setInterval(() => {
    if (android4ArmsUp) {

        android4ArmsUp = false
        android4.style.backgroundImage = `url(${path1})`

    } else {
        android4ArmsUp = true
        android4.style.backgroundImage = `url(${path2})`
    }
    android4.classList.toggle('android-up')
    }, 4000)

