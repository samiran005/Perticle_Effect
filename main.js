const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
    x: null,
    y: null,
    radius: 150,
}

let perticles = [];

class Pericle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = this.x;
        this.baseY = this.y;
        this.radius = 3;
        this.density = (Math.random() * 10) + 1;
        this.velosity = 3;
    }
    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirctionX = dx / distance;
        let forceDirctionY = dy / distance;

        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) /  maxDistance;

        let positionX = forceDirctionX * force * this.density;
        let positionY = forceDirctionY * force * this.density;

        if(distance < mouse.radius){
            this.x += positionX;
            this.y += positionY;
        }else {
            if(this.x != this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx / 10
            }
            if(this.y != this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy / 10
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    perticles.forEach(function (perticle) {
        perticle.draw();
        perticle.update();
    })
    joinLine();
}
animate();


// perticle creation 
for (i = 0; i < 400; i++) {
    let pericleX = Math.random() * canvas.width;
    let pericleY = Math.random() * canvas.height;
    perticles.push(new Pericle(pericleX, pericleY));
}

// mouse movement
window.addEventListener("mousemove", (e) => {
    mouse.x  = e.x;
    mouse.y = e.y;
})

console.log(perticles);
function joinLine() {
    for(a = 0; a < perticles.length; a ++){
        for(b = 0; b < perticles.length; b ++){
            let dx = perticles[a].x - perticles[b].x;
            let dy = perticles[a].y - perticles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let oposity = 1 - (distance / 70);

            if(distance < 70){
                ctx.strokeStyle = `rgba(225,225,225,${oposity})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(perticles[a].x, perticles[a].y);
                ctx.lineTo(perticles[b].x, perticles[b].y);
                ctx.stroke();
            }
        }
    }
}