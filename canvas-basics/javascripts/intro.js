// javascripts/intro.js
const canvas = document.getElementById('example');
const ctx = canvas.getContext('2d');



// fillRect(x, y, width, height); //Draws a filled rectangle.
// strokeRect(x, y, width, height); //Draws a rectangular outline.
// clearRect(x, y, width, height); //Clears the specified rectangular area, making it fully transparent.

ctx.fillStyle = "green"
ctx.fillRect(20, 10, 150,150)

ctx.fillStyle = "red"
ctx.fillRect(190, 85, 75, 75)

ctx.fillStyle = "blue"
ctx.fillRect(285, 125, 37, 37)


ctx.beginPath();
// ctx.arc(x, y, radius, startAngle, endAngle)
ctx.arc(95, 350, 55, 0, Math.PI * 2);
ctx.lineWidth = 30;
ctx.strokeStyle = 'green'; // !
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.arc(225, 350, 50, 0, Math.PI * 2);
ctx.fillStyle = 'red'; // !
// fills the inner circle with red color
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(300, 350, 20, 0, Math.PI * 2);
ctx.fillStyle = 'blue'; // !
// fills the inner circle with red color
ctx.fill();
ctx.closePath();

// draw text
// ****************************

// color the text
ctx.fillStyle = 'orange';
ctx.font = '30px Arial';
// ctx.fillText("string", x, y); => x, y are coordinates where the text
// is going to appear
ctx.fillText('Hello there', 20, 40);