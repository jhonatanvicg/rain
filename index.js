const canvas = document.getElementById('canvas');

//Setting Canvas to 2D
const context = canvas.getContext('2d');
let background = new Image();
background.src = "./assets/imgs/thumb-1920-977479.png"

//FullScreen the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Resizes Canvas when window widht and height resizes
window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

//All Water Drops will be stored here
let waterDropsArray = [];

//All Water Particles will be stored here
let waterParticlesArray = [];
let height = 0;
let maxHeight = 10;
const dropColor = 'rgba(16,160,244,.71)';
let tiles = []




//Function for Water Drops
function WaterDrops() {
    
    this.limitY = window.innerHeight / 2
    this.limitXMin = 100
    this.limitXMax = 400
    // this.limitY = window.innerHeight /2
    // console.log(`LIMITE DE GOTAS: ${this.limitY}`)
    this.x = Math.floor(Math.floor(Math.random() * window.innerWidth ));
    this.y = 0;

    this.size = 5;
    this.ground = false;
    //Speed of moving the water drops of Y axis
    let speedArray = [10,8.9,8,11,10.5,7,9,15,11.7,10.7,10.1,15.4,11.1,12,12.54];
    let speedY = speedArray[Math.floor(Math.random()* speedArray.length)];

    //Updates Drop Position on Y axis (Falling down)
    this.update = ()=>{
        this.y += speedY
        tiles.forEach(tile =>{

            if(this.y >= tile.topCoordinates.init.y && !this.ground)
            {
                if(this.x >= tile.topCoordinates.init.x && this.x <= tile.topCoordinates.end.x)
                {
    
                    this.ground =true;
                    console.log("PISO")
                }
            }
        })
    }


    //Renders the Drop on Canvas
    this.draw = ()=>{
        context.fillStyle = dropColor;
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI * 2);
        context.fill();
    }
}


//Function for Water Particles (Dropped)
function WaterParticles(x,y) {
    
    this.x = x;
    this.y = y

    this.size = Math.random() * 3 + .5;

    //Speed of moving the water drops of Y axis
    let speedX = Math.random()*3 - 1.5;
    let speedY = Math.random() - 1.5;

    //Updates Drop Position on Y axis (Falling down)
    this.update = ()=>{
        this.y += speedY;
        this.x += speedX;
        if (this.size > .2) {
            this.size -= .1;
        }
    }

    //Renders the Water Particle on Canvas
    this.draw = ()=>{
        context.fillStyle = dropColor;
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI * 2);
        context.fill();
    }
}


//Function to update and draw every water object in water particles array using For Loop
function renderWaterParticles() {
    for (let i = 0; i < waterParticlesArray.length; i++) {
        waterParticlesArray[i].draw(); //Render the drop on the canvas
        waterParticlesArray[i].update(); //Update the position on the canvas
        if (waterParticlesArray[i].size <= .2) {
            waterParticlesArray.splice(i,1);
            i--;
        }
    }
}

//Function to update and draw every water object in water drops array using For Loop
function renderWaterDrops() {
    for (let i = 0; i < waterDropsArray.length; i++) {
        waterDropsArray[i].draw(); //Render the drop on the canvas
        waterDropsArray[i].update(); //Update the position on the canvas
        if (waterDropsArray[i].ground) {
            for (let index = 0; index < 20; index++) {
                waterParticlesArray.push(new WaterParticles(waterDropsArray[i].x, waterDropsArray[i].y))
                
            }
            waterDropsArray.splice(i,1);

            i--;
        }
    }
}
function Tile(
    initXPosition = 0,
    initYPosition = 0,
    width = 200,
    height = 100,
    figure = "",
    fillColor = "white"
){
    
    this.initXPosition = initXPosition;
    this.initYPosition = initYPosition;
    this.width = width;
    this.height = height;
    this.figure = figure;
    this.fillColor = fillColor;
    this.topCoordinates = {
        init:{
            x:0,
            y:0
        },
        end:{
            x:0,
            y:0
        }
    };


    this.draw = ()=>
    {
        context.fillStyle = this.fillColor;
        context.fillRect(this.initXPosition,this.initYPosition,this.width,this.height)
        this.topCoordinates.init.x = this.initXPosition;
        this.topCoordinates.init.y = this.initYPosition;
        this.topCoordinates.end.x = this.topCoordinates.init.x + this.width;
        this.topCoordinates.end.y = this.topCoordinates.init.y;

        context.fillStyle = "green";
        context.beginPath();
        context.arc(this.topCoordinates.init.x,this.topCoordinates.init.y,10,0,Math.PI * 2);
        context.arc(this.topCoordinates.end.x,this.topCoordinates.end.y,10,0,Math.PI * 2);
        context.fill();
    }
}

function renderTiles(){

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].draw()
    }
}

function randomValue(min = 0, max = 1)
{
    return Math.floor( Math.random() * ((max) - min + 1 ) + min)
}


console.log(`MEDIDAS PANTALLA; WIDTH: ${window.innerWidth}, HEIGHT: ${window.innerHeight}`)
const numberTiles = 8
for (let i = 0; i < numberTiles; i++) {
    let tileX = Math.floor(Math.random() * ((window.innerWidth - 350) - 0 + 1) + 0)
    let tileY = Math.floor(Math.random() * ((window.innerHeight - 100) - 0 + 1) + 0)
    let tileWidth = randomValue(10,100)
    console.log(`ITERACION ${i} X: ${tileX}`)
    console.log(`ITERACION ${i} Y: ${tileY}`)
    tiles.push(new Tile(tileX,tileY,tileWidth));    
}

//Animate Function
function animate() {
    height = Math.floor(Math.random()  * maxHeight)
    // context.drawImage(background,window.innerHeight,0);   
    // context.fillStyle = 'rgba(121,121,121,0.52)';
    context.fillStyle = 'black';
    context.fillRect(0,0,canvas.width,canvas.height);
    // context.fillStyle = 'white';
    // context.fillRect(100,window.innerHeight /2,300,150);

    // context.beginPath();
    // context.rect(window.innerWidth / 4,window.innerHeight - 100, window.innerWidth / 2,4);
    // context.fill();

    renderWaterDrops();
    renderWaterParticles();
    renderTiles();
    requestAnimationFrame(animate);
}

let sfx = {
    push: new Howl({
        src:['./assets/sounds/713222__newlocknew__rain_raingardenverandaon-different-surfaces.wav'],
        loop:true
    })
}
function PlayMusic(){
    sfx.push.play();
}

// background.onload = function(){
//     context.drawImage(background,0,0);   
// }
animate();
PlayMusic();
//Interval to render water drops 
setInterval(() => {
    for (let i = 0; i < 15; i++) {
        waterDropsArray.push(new WaterDrops())
    }
}, 100);
        // waterDropsArray.push(new WaterDrops())
