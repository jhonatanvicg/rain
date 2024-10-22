const canvas = document.getElementById("canvas");

const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let waterDropsArray = []
let waterParticlesArray = []

function WaterDrops(){
    console.log("CREANDO GOTAS")
    this.x = Math.floor(((window.innerWidth/2) - 140) + Math.floor(Math.random() * innerWidth / 6));
    this.y = 180;

    this.size = 15;

    //speed of velocity of drops
    let speedArray = [10,8,9,10,5,15,9,5,10,9,9,9,10,15,8,9,10,11,12,15];
    let speedY = speedArray[Math.floor(Math.random() * speedArray.length)];

    //UPDATE FUNCTION FOR FALLING DROPS
    this.update = ()=>{
        this.y += speedY;
    }

    this.draw = ()=>{
        context.fillStyle = "white";
        context.beginPath();
        context.arc(this.x,this.y, this.size,0,Math.PI * 2);
        context.fill();
    }

}

function WaterParticles(x){
    console.log("CREANDO GOTAS")
    this.x = x;
    this.y = window.innerHeight - 100;

    this.size = Math.random() * 3 + 2;

    //speed of velocity of drops
    let speedX = Math.random() * 3 + 1.5;
    let speedY = Math.random() - 1.5;

    //UPDATE FUNCTION FOR FALLING DROPS
    this.update = ()=>{
        this.y += speedY;
        this.x += speedX;
        if(this.size > .2)
        {
            this.size -= .1;
        }
    }

    this.draw = ()=>{
        context.fillStyle = "white";
        context.beginPath();
        context.arc(this.x,this.y, this.size,0,Math.PI * 2);
        context.fill();
    }

}

function renderWaterParticles(){
    for(let i; i < waterParticlesArray.length; i++){
        waterParticlesArray[i].draw();
        waterParticlesArray[i].update();
        if(waterParticlesArray[i].size <= .2)
        {
            waterParticlesArray.splice(i,1);
            i--;
        }
    }
}

function renderWaterDrop(){
    for(let i; i < waterDropsArray.length; i++){
        waterDropsArray[i].draw();
        waterDropsArray[i].update();
        if(waterDropsArray[i].y >= window.innerHeight - 100)
        {
            for (let j = 0; j < 12; j++) 
            {
                waterParticlesArray.push(new WaterDrops(waterDropsArray[i].x))                
            }
            waterDropsArray.splice(i,1);
            i--;
        }
    }
}

//ANIMATE FUNCTION
function animate(){
    context.fillStyle = "rgba(24,28,31,1)";
    context.fillRect(0,0,canvas.height,canvas.width);
    context.fillStyle = "white";
    context.beginPath();
    context.rect(window.innerWidth / 4, window.innerHeight - 100, window.innerWidth / 2,4);
    context.fill();
    renderWaterDrop();
    renderWaterParticles();
    requestAnimationFrame(animate)
}

for(let i = 0; i < 10;i++)
{
    waterDropsArray.push(new WaterDrops())
}

animate()

waterParticlesArray.push(new WaterDrops())