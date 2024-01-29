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
  
    asteroidx(){ this.x = canvas.width + Math.round(Math.random() * 500 + 100)}
  
    lifeAsteroid(){
      this.endurance = this.endurance - 1
      if(this.endurance <= 0){
        this.asteroidx()
        this.endurance = this.originEndurance
      }
    }
  }

class asteroidFragment{
    constructor(x, y, speed, image){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.image = new Image();
        this.image.src = image;
    }
    
}

export {AsteroidRocket};