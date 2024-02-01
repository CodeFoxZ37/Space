const life = document.querySelector(".life2");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");
const reboot = document.querySelector(".reboot");
const death = document.querySelector(".death");
const death2 = document.querySelector(".deathScreen");
const score = document.querySelector(".score");
const username = document.querySelector(".name");
const energy2 = document.querySelector(".energy2");

let power = false;
let radius;
const energy = [];
let canAddEnergy = true;

// Propiedades base de los meteoritos
class AsteroidRocket{
  constructor(x,y,speed,endurance,type,image){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.endurance = endurance;
    this.originEndurance = endurance;
    this.type = type;
    this.image = new Image();
    this.image.src = image;
  }

  DrawAsteroid(){
    if (!this.image.complete || this.image.naturalHeight === 0) {
      // La imagen no está cargada correctamente
      return;
   }
    ctx.drawImage(this.image, this.x, this.y);
  }

  AsteroidDisplacement(){
    ctx.drawImage(this.image, this.x, this.y)
    this.x = canvas.width + Math.round(Math.random() * 400 + 100)
    this.y = canvas.height - Math.round(Math.random() * 250 + 80)
    this.speed = - Math.round(Math.random() * 10 + 3);
  }

  SpecialAsteroidDisplacement(x,speed){
    ctx.drawImage(this.image, this.x, this.y)
    this.x = canvas.width + x;
    this.y = canvas.height - Math.round(Math.random() * 250 + 80)
    this.speed = -speed
  }

  asteroidx(){ this.x = canvas.width + Math.round(Math.random() * 500 + 100)}

  lifeAsteroid(){
    this.endurance = this.endurance - 1
    if(this.endurance <= 0){
      this.asteroidx()
      this.endurance = this.originEndurance
    }
  }
}

// Nave espacial
const spaceship = new AsteroidRocket(canvas2.width / 8,canvas2.height - 190,5,0,"ship","image/astronave.png")
// Asteroides
const asteroids = [
  new AsteroidRocket(canvas.width + 200, canvas.height - Math.round(Math.random() * 250 + 80), -5,1,"normal",'image/asteroide.png'),
  new AsteroidRocket(canvas.width + 210, canvas.height - Math.round(Math.random() * 250 + 80), -6,1,"normal",'image/asteroide.png'),
  new AsteroidRocket(canvas.width + 215, canvas.height - Math.round(Math.random() * 250 + 80), -7,1,"normal",'image/asteroide.png'),
  new AsteroidRocket(canvas.width + 280, canvas.height - Math.round(Math.random() * 250 + 80), -6,1,"normal",'image/asteroide.png'),
  new AsteroidRocket(canvas.width + 220, canvas.height - Math.round(Math.random() * 250 + 80), -5,1,"normal",'image/asteroide.png'),
]
const asteroidHealth = new AsteroidRocket(canvas.width + 4000, canvas.height - Math.round(Math.random() * 250 + 80), -1,2,"special",'image/asteroideSalud.png')
const asteroidDeath = new AsteroidRocket(canvas.width + 10800, canvas.height - Math.round(Math.random() * 250 + 80), -1,3,"special",'image/asteroideN2.png')
const ToxiAsteroid = new AsteroidRocket(canvas.width + 9000, canvas.height - Math.round(Math.random() * 250 + 80), -1,2,"special",'image/asteroideToxico.png')
const asteroidElectric = new AsteroidRocket(canvas.width + 10000, canvas.height - Math.round(Math.random() * 250 + 80),-1, 2,"special",'image/AsteroideEletrico.png')
const Asteroid_z = new AsteroidRocket(canvas.width + 12000, canvas.height - Math.round(Math.random() * 250 + 80), -1,1,"special",'image/Asteroide-Z.png')
const asteroideEnergy = new AsteroidRocket(canvas.width + 4600, canvas.height - Math.round(Math.random() * 250 + 80), -1,1,"special",'image/AsteroideEnergia.png')

// Funciones para que se ejecute el programa
const AllAsteroids = [
  ...asteroids,
  asteroidHealth,
  asteroidDeath,
  ToxiAsteroid,
  asteroidElectric,
  Asteroid_z,
  asteroideEnergy
]

const checkCollision = () => {

  for (const asteroid of AllAsteroids) {
    const meteoriteRadius = 6;
    const circleRadius = 30;

    const distancia1 = Math.sqrt((asteroid.x - spaceship.x) ** 2 + (asteroid.y - spaceship.y) ** 2);
    const distancia2 = Math.sqrt((asteroidDeath.x - spaceship.x) ** 2 + (asteroidDeath.y - spaceship.y) ** 2);
    const distancia3 = Math.sqrt((asteroidHealth.x - spaceship.x) ** 2 + (asteroidHealth.y - spaceship.y) ** 2);
    const distancia4 = Math.sqrt((ToxiAsteroid.x - spaceship.x) ** 2 + (ToxiAsteroid.y - spaceship.y) ** 2);
    const distancia5 = Math.sqrt((asteroidElectric.x - spaceship.x) ** 2 + (asteroidElectric.y - spaceship.y) ** 2);
    const distancia6 = Math.sqrt((Asteroid_z.x - spaceship.x) ** 2 + (Asteroid_z.y - spaceship.y) ** 2);
    const distancia7 = Math.sqrt((asteroideEnergy.x - spaceship.x) ** 2 + (asteroideEnergy.y - spaceship.y) ** 2);
    const ditances = asteroids.some((otherAsteroid) => {
      return (
        otherAsteroid !== asteroid &&
        Math.sqrt((otherAsteroid.x - asteroid.x) ** 2 + (otherAsteroid.y - asteroid.y) ** 2) <= 2 * circleRadius
      );
    });

    if (distancia1 < meteoriteRadius + circleRadius && asteroid.type == "normal") life.style.width = `${parseInt(life.offsetWidth) - 10}px`;
    else if (distancia2 < meteoriteRadius + circleRadius) life.style.width = "0px";
    else if (distancia3 < meteoriteRadius + circleRadius && life.offsetWidth < 300) life.style.width = `${parseInt(life.offsetWidth) + 1}px`;
    else if (distancia4 < meteoriteRadius + circleRadius) {
      let toxic = setInterval(() => { life.style.width = `${parseInt(life.offsetWidth) - 1}px`; }, 3000);
      life.style.background = "#6C1292";
      setTimeout(() => {
        clearInterval(toxic);
        life.style.background = "";
      }, 7000);
    } else if (distancia5 < meteoriteRadius + circleRadius) {
      spaceship.speed = 1;
      setTimeout(() => (spaceship.speed = 5), 10000);
    } else if (distancia6 < meteoriteRadius + circleRadius) power = true;

    else if (ditances && permisio) {
      asteroid.asteroidx();
      asteroidDeath.asteroidx();
      asteroidHealth.asteroidx();
      asteroidElectric.asteroidx();
      ToxiAsteroid.asteroidx();
    }

    else if (distancia7 < meteoriteRadius + circleRadius && energy2.offsetWidth < 300) energy2.style.width = `${parseInt(energy2.offsetWidth) + 2}px`;

    for (let i = energy.length - 1; i >= 0; i--) {
      const laserRadius = 8;

      // Ajustar las coordenadas para tener en cuenta el tamaño de las imágenes
      const laserX = energy[i].x + laserRadius / 2;
      const laserY = energy[i].y + laserRadius / 2;

      const asteroidCenterX = asteroid.x + asteroid.image.width / 2;
      const asteroidCenterY = asteroid.y + asteroid.image.height / 2;

      const distanceToLaser = Math.sqrt((laserX - asteroidCenterX) ** 2 + (laserY - asteroidCenterY) ** 2);
      
      if(laserX > 1100) energy.splice(i, 1)

      if (distanceToLaser < laserRadius + meteoriteRadius) {
        energy.splice(i, 1);
        asteroid.lifeAsteroid();

        // Modificación: Verificar si el asteroide aún tiene resistencia antes de reiniciarlo
        break;  // Termina el bucle al encontrar la primera colisión, ya que un láser solo puede afectar a un asteroide.
      }
    }

    if (life.offsetWidth == 0) {
      death.style.display = "block";
      death2.style.display = "block";
      clearInterval(time)
    }
  }
};

function drawLaser(x, y) {
  ctx3.beginPath();
  ctx3.arc(x, y, 8, 0, 2 * Math.PI);
  ctx3.fillStyle = '#f68d04';
  ctx3.fill();
  ctx3.closePath();
}

function update() {
  ctx3.clearRect(0,0,canvas.width,canvas.height)
  for (let i = 0; i < energy.length; i++) {
    energy[i].x += energy[i].speed;
    drawLaser(energy[i].x, energy[i].y);
  }
  requestAnimationFrame(update);
}

// Controles
let keyState = {};
document.addEventListener("keydown", e => keyState[e.key] = true);
document.addEventListener("keyup", e => keyState[e.key] = false);
let permisio = false;
let radiox = canvas2.width / 8;
let radioy = spaceship.y
const createrRadio = ()=>{
  radius = 0;
  const maxRadius =1000;
  const interval = setInterval(function() {
      ctx3.clearRect(0, 0, canvas.width, canvas.height);
      ctx3.beginPath();
      ctx3.arc(radiox, radioy, radius, 0, 2 * Math.PI);
      ctx3.lineWidth = 10
      ctx3.strokeStyle = "#00715b"
      ctx3.stroke();
      radius += 10;
      if (radius > maxRadius) clearInterval(interval);
  }, 30);
}

function handleKeyboardInput() {
  if ((keyState["ArrowUp"] || keyState["w"])&& spaceship.y > 10) {
    spaceship.y -= spaceship.speed;
  }
  if ((keyState["ArrowDown"] || keyState["s"]) && spaceship.y < 280) {
    spaceship.y += spaceship.speed;
  }

  if(keyState[" "] && power == true){
    createrRadio()
    permisio = true
    radioy = spaceship.y
    setTimeout(()=>{
      power = false
      permisio = false
      ctx3.clearRect(0, 0, canvas.width, canvas.height)},1000)
  }

  else if(keyState[" "] && canAddEnergy && energy2.offsetWidth > 4){
    canAddEnergy = false
    energy2.style.width = `${parseInt(energy2.offsetWidth) - 37.2}px`
   
    const newEnergy = { x: canvas3.width / 5.4, y: spaceship.y + 30, speed: 7};
    energy.push(newEnergy);
    setTimeout(()=> canAddEnergy = true,300)
  }
}

// Funcion para mover los meteoritos
function updateMeteorite(){  
  ctx.clearRect(0,0, canvas.width, canvas.height)
  
  for(const asteroid of asteroids){
    ctx.drawImage(asteroid.image, asteroid.x, asteroid.y)
    
    if(asteroid.x < -50){ 
      asteroid.AsteroidDisplacement();
    }
    else if(asteroidHealth.x < -50){
      asteroidHealth.SpecialAsteroidDisplacement(3000,1);
    }
    else if(asteroidDeath.x < -50){
      asteroidDeath.SpecialAsteroidDisplacement(700,2);
    }

    else if(ToxiAsteroid.x < -50){
      ToxiAsteroid.SpecialAsteroidDisplacement(500,1);
    }

    else if(asteroidElectric.x < -50){
      asteroidElectric.SpecialAsteroidDisplacement(300,2);
    }

    else if(Asteroid_z.x < -50){
      Asteroid_z.SpecialAsteroidDisplacement(10000,1)
    }

    else if(asteroideEnergy.x < -50){
      asteroideEnergy.SpecialAsteroidDisplacement(2500,1)
    }

    asteroid.x += asteroid.speed
    asteroidHealth.x += asteroidHealth.speed
    asteroidDeath.x += asteroidDeath.speed 
    ToxiAsteroid.x += ToxiAsteroid.speed
    asteroidElectric.x += asteroidElectric.speed
    Asteroid_z.x += Asteroid_z.speed
    asteroideEnergy.x += asteroideEnergy.speed
  }
  handleKeyboardInput();
  spaceship.DrawAsteroid();
  asteroidHealth.DrawAsteroid();
  asteroidDeath.DrawAsteroid();
  ToxiAsteroid.DrawAsteroid();
  asteroidElectric.DrawAsteroid();
  Asteroid_z.DrawAsteroid();
  asteroideEnergy.DrawAsteroid();
  checkCollision();
  requestAnimationFrame(updateMeteorite);
}

const writename = ()=>{
  let name = localStorage.getItem("user")
  username.textContent = `${name}`
}

// inicio del movimiento de los meteoritos
updateMeteorite();
update(); 
writename()

reboot.addEventListener("click", function(){
  if(localStorage.getItem("user") !== null){
    const data ={
      username: `${localStorage.getItem("user")}`,
      score: parseInt(score.textContent)
    }

    fetch("http://127.0.0.1:8000/score", {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => console.log('Success:', data))
    .catch(error => {
      console.log(error);
    });
  }
  setTimeout(()=> location.reload(),500)
}); 