const life = document.querySelector(".life2")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
const canvas2 = document.getElementById("canvas2")
const ctx2 = canvas2.getContext("2d");
const canvas3 = document.getElementById("canvas3")
const ctx3 = canvas3.getContext("2d");
const reboot = document.querySelector(".reboot")
const death = document.querySelector(".death")
const death2 = document.querySelector(".deathScreen")
const score = document.querySelector(".score")
let power = false;

// Propiedades base de los meteoritos
class AsteroidRocket{
  constructor(x,y,speed,image){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.image = new Image();
    this.image.src = image;
  }

  DrawAsteroid(){
    ctx.drawImage(this.image, this.x, this.y);
  }

  AsteroidDisplacement(){
    ctx.drawImage(this.image, this.x, this.y)
    this.x = canvas.width + Math.round(Math.random() * 200 + 100)
    this.y = canvas.height - Math.round(Math.random() * 250 + 80)
    this.speed = - Math.round(Math.random() * 10 + 4);
  }

  SpecialAsteroidDisplacement(x,speed){
    ctx.drawImage(this.image, this.x, this.y)
    this.x = canvas.width + x;
    this.y = canvas.height - Math.round(Math.random() * 250 + 80)
    this.speed = -speed
  }

  asteroidx(){ this.x = canvas.width + Math.round(Math.random() * 200 + 100)}
}

class energySphere{
  constructor(x, y, maxRadius, growthRate) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = maxRadius;
    this.growthRate = growthRate;
  }

  update() {
    if (this.radius < this.maxRadius) {
      this.radius += this.growthRate;
    }
  }
  Drawsphere(){
    ctx3.beginPath();
    ctx3.arc(this.x, this.y, 8, 0, 2 * Math.PI);
    ctx3.strokeStyle = "#3498db";
    ctx3.stroke();
    ctx3.closePath();
    requestAnimationFrame(this.Drawsphere)
  }

}


// Nave espacial
const spaceship = new AsteroidRocket(canvas2.width / 8,canvas2.height - 190,5,"image/astronave.png")
// Asteroides
const asteroids = [
  new AsteroidRocket(canvas.width + 200, canvas.height - Math.round(Math.random() * 250 + 80), -5,'image/asteroide.png'),
  new AsteroidRocket(canvas.width + 210, canvas.height - Math.round(Math.random() * 250 + 80), -6,'image/asteroide.png'),
  new AsteroidRocket(canvas.width + 215, canvas.height - Math.round(Math.random() * 250 + 80), -7,'image/asteroide.png'),
  new AsteroidRocket(canvas.width + 280, canvas.height - Math.round(Math.random() * 250 + 80), -6,'image/asteroide.png'),
  new AsteroidRocket(canvas.width + 220, canvas.height - Math.round(Math.random() * 250 + 80), -5,'image/asteroide.png'),
]
const asteroidHealth = new AsteroidRocket(canvas.width + 3000, canvas.height - Math.round(Math.random() * 250 + 80), -1,'image/asteroideSalud.png')
const asteroidDeath = new AsteroidRocket(canvas.width + 2500, canvas.height - Math.round(Math.random() * 250 + 80), -2,'image/asteroideN2.png')
const ToxiAsteroid = new AsteroidRocket(canvas.width + 2000, canvas.height - Math.round(Math.random() * 250 + 80), -1,'image/asteroideToxico.png')
const asteroidElectric = new AsteroidRocket(canvas.width + 2300, canvas.height - Math.round(Math.random() * 250 + 80), -2,'image/AsteroideEletrico.png')
const Asteroid_z = new AsteroidRocket(canvas.width + 4000, canvas.height - Math.round(Math.random() * 250 + 80), -1,'image/Asteroide-Z.png')

const shere = new energySphere(200, 100, 50, 2); // Ajusta el growthRate según sea necesario
let animationStarted = false;

// Funciones para que se ejecute el programa
const checkCollision = ()=> {
  for(const asteroid of asteroids){
    const meteoriteRadius = 6
    const circleRadius = 30;
  
    // Calcula la distancia entre el centro del meteorito y el centro del cohete
    const distancia1 = Math.sqrt((asteroid.x - spaceship.x) ** 2 + (asteroid.y - spaceship.y) ** 2);
    const distancia2 = Math.sqrt((asteroidDeath.x - spaceship.x) ** 2 + (asteroidDeath.y  - spaceship.y) ** 2);
    const distancia3 = Math.sqrt((asteroidHealth.x - spaceship.x) ** 2 + (asteroidHealth.y - spaceship.y) ** 2);
    const distancia4 = Math.sqrt((ToxiAsteroid.x - spaceship.x) ** 2 + (ToxiAsteroid.y - spaceship.y) ** 2);
    const distancia5 = Math.sqrt((asteroidElectric.x - spaceship.x) ** 2 + (asteroidElectric.y - spaceship.y) ** 2);
    const distancia6 = Math.sqrt((Asteroid_z.x - spaceship.x) ** 2 + (Asteroid_z.y - spaceship.y) ** 2);
    const distancia6_2 = Math.sqrt((laserx - asteroid.x || asteroidDeath.x || asteroidHealth.x || ToxiAsteroid.x || asteroidElectric.x) ** 2 + 
    (lasery - asteroid.y || asteroidDeath.y || asteroidHealth.y || ToxiAsteroid.y || asteroidElectric.y) ** 2);

    // Si la distancia es menor que la suma de los radios, hay colisión
    if (distancia1 < meteoriteRadius + circleRadius) life.style.width = `${parseInt(life.offsetWidth) - 10}px`
    else if (distancia2 < meteoriteRadius + circleRadius) life.style.width = `0px`
    else if (distancia3 < meteoriteRadius + circleRadius && life.offsetWidth < 300) life.style.width = `${parseInt(life.offsetWidth) + 1}px`
    else if (distancia4 < meteoriteRadius + circleRadius){
      let toxic = setInterval(()=>{life.style.width = `${parseInt(life.offsetWidth) - 1}px`},3000)
      life.style.background = "#6C1292"
      setTimeout(()=>{clearInterval(toxic)
        life.style.background = ""},7000)
    }
    else if (distancia5 < meteoriteRadius + circleRadius){
      spaceship.speed = 1;
      setTimeout(()=>{spaceship.speed = 5},10000);
    }
    
    else if(distancia6 < meteoriteRadius + circleRadius){
      power = true;
    }

    else if(distancia6_2 < meteoriteRadius + circleRadius && mobility == false){
      asteroid.asteroidx()
      asteroidDeath.asteroidx()
      asteroidHealth.asteroidx()
      asteroidElectric.asteroidx()
      ToxiAsteroid.asteroidx()    
    }

    else if(life.offsetWidth == 0){
      death.style.display = "block"
      death2.style.display = "block"
      clearInterval(time);
    }
  }
}

// Controles
let keyState = {};
document.addEventListener("keydown", e => keyState[e.key] = true);
document.addEventListener("keyup", e => keyState[e.key] = false);
let mobility = true;
let laserx = spaceship.x;
let lasery = spaceship.y / canvas.height -2

function handleKeyboardInput() {
  if (keyState["ArrowUp"] && spaceship.y > 10 && mobility == true) {
    spaceship.y -= spaceship.speed;
  }
  if (keyState["ArrowDown"] && spaceship.y < 280 && mobility == true) {
    spaceship.y += spaceship.speed;
  }

  if(keyState[" "] && power == true){
    if (!animationStarted) {
      animationStarted = true;
      animate();
    }

    function animate() {
      shere.update();
      shere.Drawsphere();

      if (shere.radius < shere.maxRadius) {
        requestAnimationFrame(animate);
      }
    }
    mobility = false
    laserx = spaceship.x
    setTimeout(()=>{
      power = false
      mobility = true
      ctx3.clearRect(0, 0, canvas.width, canvas.height)},5000)
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
      asteroidDeath.SpecialAsteroidDisplacement(200,2);
    }

    else if(ToxiAsteroid.x < -50){
      ToxiAsteroid.SpecialAsteroidDisplacement(300,1);
    }

    else if(asteroidElectric.x < -50){
      asteroidElectric.SpecialAsteroidDisplacement(300,2);
    }

    else if(Asteroid_z.x < -50){
      Asteroid_z.SpecialAsteroidDisplacement(4000,1)
    }

    asteroid.x += asteroid.speed
    asteroidHealth.x += asteroidHealth.speed
    asteroidDeath.x += asteroidDeath.speed 
    ToxiAsteroid.x += ToxiAsteroid.speed
    asteroidElectric.x += asteroidElectric.speed
    Asteroid_z.x += Asteroid_z.speed
  }
  handleKeyboardInput();
  spaceship.DrawAsteroid();
  asteroidHealth.DrawAsteroid();
  asteroidDeath.DrawAsteroid();
  ToxiAsteroid.DrawAsteroid();
  asteroidElectric.DrawAsteroid();
  Asteroid_z.DrawAsteroid();
  checkCollision();
  requestAnimationFrame(updateMeteorite);
}

// inicio del movimiento de los meteoritos
updateMeteorite(); 
// Pantalla de muerte 
reboot.addEventListener("click", function(){location.reload()})