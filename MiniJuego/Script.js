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
const username = document.querySelector(".name")

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
const asteroidHealth = new AsteroidRocket(canvas.width + 4000, canvas.height - Math.round(Math.random() * 250 + 80), -1,'image/asteroideSalud.png')
const asteroidDeath = new AsteroidRocket(canvas.width + 3000, canvas.height - Math.round(Math.random() * 250 + 80), -1,'image/asteroideN2.png')
const ToxiAsteroid = new AsteroidRocket(canvas.width + 4000, canvas.height - Math.round(Math.random() * 250 + 80), -1,'image/asteroideToxico.png')
const asteroidElectric = new AsteroidRocket(canvas.width + 5000, canvas.height - Math.round(Math.random() * 250 + 80), -1,'image/AsteroideEletrico.png')

// Funciones para que se ejecute el programa
const checkCollision = ()=> {
  for(const asteroid of asteroids){
    const meteoriteRadius = 6
    const circleRadius = 30;
  
    // Calcula la distancia entre el centro del meteorito y el centro del cohete
    const distancia1 = Math.sqrt( (asteroid.x - spaceship.x) ** 2 + (asteroid.y - spaceship.y) ** 2);
    const distancia2 = Math.sqrt( (asteroidDeath.x - spaceship.x) ** 2 + (asteroidDeath.y  - spaceship.y) ** 2);
    const distancia3 = Math.sqrt( (asteroidHealth.x - spaceship.x) ** 2 + (asteroidHealth.y - spaceship.y) ** 2);
    const distancia4 = Math.sqrt( (ToxiAsteroid.x - spaceship.x) ** 2 + (ToxiAsteroid.y - spaceship.y) ** 2);
    const distancia5 = Math.sqrt( (asteroidElectric.x - spaceship.x) ** 2 + (asteroidElectric.y - spaceship.y) ** 2);

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
    
    else if(life.offsetWidth == 0){
      death.style.display = "block"
      death2.style.display = "block"
      clearInterval(time);
      scorenow = score.value
    }
  }
}

// Controles
let keyState = {};
document.addEventListener("keydown", e => keyState[e.key] = true);
document.addEventListener("keyup", e => keyState[e.key] = false);
// const createLaser = ()=>{
//   ctx2.clearRect(0,0, canvas.width, canvas.height)
//   ctx2.beginPath();
//   ctx2.arc(laserx, lasery, 8, 0, 2 * Math.PI);
//   ctx2.fillStyle = "#3498db";
//   ctx2.fill();
//   ctx2.closePath();
// }

// const laserDisplacement = ()=>{
//   laserx += 1
// }

function handleKeyboardInput() {
  if (keyState["ArrowUp"] && spaceship.y > 10) {
    spaceship.y -= spaceship.speed;
  }
  if (keyState["ArrowDown"] && spaceship.y < 280) {
    spaceship.y += spaceship.speed;
  }

  // if(keyState[" "]){
  //   createLaser();
  //  laserDisplacement();
  // }
  // requestAnimationFrame(laserDisplacement)
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

    asteroid.x += asteroid.speed
    asteroidHealth.x += asteroidHealth.speed
    asteroidDeath.x += asteroidDeath.speed 
    ToxiAsteroid.x += ToxiAsteroid.speed
    asteroidElectric.x += asteroidElectric.speed
  }
  handleKeyboardInput();
  spaceship.DrawAsteroid();
  asteroidHealth.DrawAsteroid();
  asteroidDeath.DrawAsteroid();
  ToxiAsteroid.DrawAsteroid();
  asteroidElectric.DrawAsteroid();
  checkCollision();
  requestAnimationFrame(updateMeteorite);
}

const writename = ()=>{
  let name = localStorage.getItem("user")
  username.textContent = `${name}`
}

// inicio del movimiento de los meteoritos
updateMeteorite(); 
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
      console.error('Fetch error:', error);
      console.log(error);
    });
  }
  
  location.reload();
});
