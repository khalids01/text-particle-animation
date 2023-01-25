const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const adjustX = 10;
const adjustY = 30;
const text = 'Khalid'

const mouse = {
    x: 0,
    y: 0,
    radius: 100
}

let particleArray = []

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}

ctx.fillStyle = 'white'
ctx.font = '30px Verdana'
ctx.fillText(text, 0, 30)
const textCoordinates = ctx.getImageData(0, 0, 100, 100)


class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 40) + 10
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'white';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        let distance = Math.sqrt(dx * dx + dy * dy)
        let forceDirectionX = dx / distance * 3
        let forceDirectionY = dy / distance * 3
        let maxDistance = mouse.radius
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density
        let directionY = forceDirectionY * force * this.density

        if (distance < mouse.radius) {
            this.x -= directionX
            this.y -= directionY
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY
                this.y -= dy / 10
            }
        }
    }
}

// draw()

console.log(textCoordinates)

function init() {
    particleArray = []
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 8, positionY * 8))
            }
        }
    }
}
init()


function animate() {
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw()
        particleArray[i].update()
    }
    connect()
    requestAnimationFrame(animate)
}

animate()

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            opacityValue = 1 - (distance / 18)

            if (distance < 20) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                ctx.lineWidth = 2
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y)
                ctx.stroke()
            }
        }
    }
}