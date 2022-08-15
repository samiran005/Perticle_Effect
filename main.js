const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.width * canvas.height) * (200/(1366 * 625)),

}

if(canvas.width < 811){
    mouse.radius = 100;
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
        this.movementX = Math.random() * 10;
        this.movementY = Math.random() * 10;
    }
    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.closePath();
        ctx.fill();
    }
    update(){
        // movement to perticle 
        if(this.x > canvas.width || this.x < 0){
            this.movementX = -this.movementX;
        }
        if(this.y > canvas.height || this.y < 0){
            this.movementY = -this.movementY;
        }

        // mouse collision
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
        }

        //this is going to beingback the perticle to its original position

        // else {
        //     if(this.x != this.baseX){
        //         let dx = this.x - this.baseX;
        //         this.x -= dx / 10
        //     }
        //     if(this.y != this.baseY){
        //         let dy = this.y - this.baseY;
        //         this.y -= dy / 10
        //     }
        // }

        // alternative mouse collision

                // if(distance < mouse.radius){
        //     if(mouse.x < this.x || this.x < 0){
        //         this.x += 2;
        //     }
        //     if(mouse.x > this.x || this.x > canvas.width){
        //         this.x -= 2
        //     }
        //     if(mouse.y < this.y || this.y < 0){
        //         this.y += 2;
        //     }
        //     if(mouse.y > this.y || this.y > canvas.height){
        //         this.y -= 2;
        //     }
        // }

        //define the movement
        this.x += this.movementX * 0.2;
        this.y += this.movementY * 0.2;   
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
function init(){
    perticles = [];
    // for (i = 0; i < (canvas.width * canvas.height) * 0.000586; i++) {
    for (i = 0; i < (canvas.width * canvas.height) * (600/(1366 * 625)); i++) {

        let pericleX = Math.random() * canvas.width;
        let pericleY = Math.random() * canvas.height;
        perticles.push(new Pericle(pericleX, pericleY));
    }
}
init();



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

window.addEventListener("mouseout", ()=>{
    mouse.x = undefined;
    mouse.y = undefined;
})

window.addEventListener("resize", ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    if(canvas.width < 811){
        mouse.radius = 100;
    }else{
        mouse.radius = (canvas.width * canvas.height) * (200/(1366 * 625));
    }
    init();
})