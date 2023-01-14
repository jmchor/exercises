
window.onload = () => {

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')


    ctx.fillStyle = '#a3ec86'
    ctx.fillRect(0, 0, 300, 300)

    ctx.fillStyle = 'green'
    ctx.fillRect(40, 60, 80, 80)
    ctx.fillRect(180, 60,  80, 80)
    ctx.fillRect(80, 200, 200, 50)


}
