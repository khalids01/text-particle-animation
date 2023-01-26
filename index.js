window.addEventListener('load', function () {
    const textInput = document.getElementById('textInput')
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.lineWidth = 3
    ctx.strokeStyle = 'red'
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2, canvas.height)
    ctx.stroke()

    ctx.strokeStyle = 'green'
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2)
    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.stroke()

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0.3, 'teal')
    gradient.addColorStop(0.5, 'fuchsia')
    gradient.addColorStop(0.7, 'purple')
    ctx.fillStyle = gradient
    ctx.font = '80px Helvetica'
    ctx.textBaseline = 'middle'
    ctx.strokeStyle = 'teal'
    ctx.textAlign = 'center'

    const maxTextWidth = canvas.width * 0.5;
    const lineHeight = 80;

    function wrapText(text) {
        let linesArray = [];
        let lineCounter = 0;
        let line = '';
        let words = text.split(' ');
        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + ' ';
            if (ctx.measureText(testLine).width > maxTextWidth) {
                line = words[i] + ' ';
                lineCounter++
            } else {
                line = testLine
            }
            linesArray[lineCounter] = line
        }
        let textHeight = lineHeight * lineCounter
        let textY = canvas.height / 2 - textHeight / 2

        linesArray.forEach((el, index) => {
            ctx.fillText(el, canvas.width / 2, textY + (index * lineHeight))
        })

        console.log(linesArray)
    }

    textInput.addEventListener('keyup', function (e) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        wrapText(e.target.value)
    })
})