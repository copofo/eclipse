const f = (tag) => document.querySelector(tag)
window.addEventListener('scroll', () =>{
  
  
  window.scrollTo(0,0)
  
  
})




const music = f('#music')
music.volume = .5

const ex = document.createElement('audio')
ex.src = "../snd/explosion.ogg"

ex.addEventListener("canplaythrough",()=>{
  
  
  ex.play()
  
  
})


/*
    
    window.addEventListener('DOMContentLoaded', ()=>{
      
    
        
        music.controls = false
        music.play()
        
        
        
      
      
      
})

*/


const cnv = f('canvas')

cnv.width = innerWidth

cnv.height = innerHeight

const ctx = cnv.getContext('2d')

const player = new Player(cnv.width/2,cnv.height/2,20,'#48fcff')

const shootingSpeed = 4

const txtScore = f('#txtScore')

const gameOverModal = f('#gameOverModal')
const gameOverScore = f('#gameOverScore')
const btnNewGame = f('#btnNewGame')

const startModal = f('#startModal')

const startContainer = f('#startContainer')



let animationId

let score = 0

let projectiles = []

let enimys = []

let intervalId

let particles = []

const shooting = 1

const explosion = 2

function spawnEnimys(){
  
  
  intervalId = setInterval(()=>{
    
    const radius = Math.floor(Math.random() * 26) + 5
    
    let posX, posY
    
    if(Math.random() < 0.5){
      
      posX = Math.random() < 0.5 ? 0 - radius: cnv.width + radius
      
      posY = Math.random() * cnv.height
      
      
    } else{
      
      posX = Math.random() * cnv.width
      
      posY = Math.random() < 0.5 ? 0 - radius : cnv.height + radius
      
    }
    
    const angle = Math.atan2(player.y - posY, player.x - posX)
    
    
    const velocity = {
      
      x: Math.cos(angle) * .2,
      y: Math.sin(angle) * .2
      
      
      
    }
    
    const color = "hsl("+ Math.random() * 360 +",80%,50%)"
    
    
    enimys.push(new Enimy(posX,posY,radius,color,velocity))
    
    //console.log(enimys.length)
  },2500)
  
  
}

cnv.addEventListener('click',(e)=>{
  
  e.preventDefault()
  playSound(shooting)
  const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x )
  
  const velocity = {
    
    x: Math.cos(angle) * shootingSpeed,
    y: Math.sin(angle) * shootingSpeed
  }
  projectiles.push(new Projectile(player.x,player.y,3,"#48fcff",velocity))
 
  //console.log(projectiles.length)
})


btnNewGame.addEventListener('touchstart',(e)=>{
  
  
  
  e.preventDefault()
  
  btnNewGame.style.background = "#48fcff"
  
  setTimeout(()=>{
    
    newGame()
    
  },1100)
  
  
  
  
  
})

btnNewGame.addEventListener('touchend',(e)=>{
  
  e.preventDefault()
  
  btnNewGame.style.background = "transparent"
})

btnNewGame.addEventListener('mousedown',(e)=>{
  
  
  
  e.preventDefault()
  
  btnNewGame.style.background = "#48fcff"
  
  setTimeout(()=>{
    
    newGame()
    
  },1100)
  
  
  
  
  
})

btnNewGame.addEventListener('mouseup',(e)=>{
  
  e.preventDefault()
  btnNewGame.style.background = "transparent"
})


startContainer.addEventListener('click',(e)=>{
  e.preventDefault()
  
        music.controls = false
        music.play()
  
  setTimeout(()=>{
    startContainer.style.opacity = 0
    startContainer.style.zIndex = -1
    startModal.style.opacity = 0
    startModal.style.zIndex = -1
    newGame()
  },500)
  
})




function loop(){
  
 animationId = window.requestAnimationFrame(loop, cnv)
 
  update()
  
}

function update(){
  
  ctx.fillStyle = "rgba(0,0,0,0.1)"
  ctx.fillRect(0,0,cnv.width,cnv.height)
  
  
  checkProjectiles()
  checkEnimys()
  checkParticles()
  player.update()
  
}

function checkProjectiles(){
  
  for(let i = projectiles.length -1; i >= 0; i--){
    
    const p = projectiles[i]
    p.update()
    
    checkOffScreen(p,i)
    
    
    
    for(let eIndex = enimys.length -1; eIndex >= 0; eIndex--){
      
      
      const enimy = enimys[eIndex]
      
      const distance = Math.hypot(p.x - enimy.x, p.y - enimy.y)
      
      
      //colisao
      if(distance < p.radius + enimy.radius){
        
        playSound(explosion)
        
        if(enimy.radius > 15){
          enimy.newRadius = enimy.radius -10
        }else{
          
          enimys.splice(eIndex,1)
          
          
        }
        
        score += 50 - Math.floor(enimy.radius)
        
        txtScore.innerHTML = "SCORE: " + score
        
        
        projectiles.splice(i,1)
        createParticles(enimy,p)
        
        
      }
      
    }
    
    
    
    
  }
  
  
  
}

function checkOffScreen(projectile,index){
  
  if(projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > cnv.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > cnv.height){
    
    
    score -= 100
    
    if(score < 0){
      score = 0
    }
    
    txtScore.innerHTML = "SCORE: " + score
    
    projectiles.splice(index,1)
   //console.log(projectiles.length)
    
  }
  
  
}

function checkEnimys(){
  
  enimys.forEach((enimy)=>{
    
    enimy.update()
    
    const distance = Math.hypot(player.x - enimy.x, player.y - enimy.y)
    
    if(distance < player.radius + enimy.radius){
      
      ex.play()
      
      playSound(explosion)
      
      
      createParticles(player,player)
      
      createParticles(enimy,player)
      enimys.splice(enimy,1)
      particles.splice(particles,2)
      player.color = "transparent"
      player.s1.color = "transparent"
      player.s2.color = "transparent"
      
      
      setTimeout(()=>{
        
        let cor = "#48fcff"
        
        gameOver()
        player.color = cor
        player.s1.color = cor
        player.s2.color = cor
        
      },1500)
      
      
      
    }
    
    
  })
  
  
}

function createParticles(enimy,projectile){
  
  for(let i = 0; i < enimy.radius * 2; i++){
  
    const velocity = {
    
    x: (Math.random() - .5) * (Math.random() * 6),
    
    y: (Math.random() - .5) * (Math.random() * 6)
    
    
    
    }
    particles.push(new Particle(projectile.x,projectile.y,Math.random()*2,enimy.color,velocity))
  
    
  }
  
  
  
  
}


function checkParticles(){
  
  for(let i = particles.length - 1; i >= 0; i--){
    
    const p = particles[i]
    p.update()
    
    if(p.alpha <= 0){
      
      particles.splice(i,1)
      
      
      
    }
    
    
  }
  
  
  
  
  
}

function gameOver(){
  music.pause()
  music.currentTime = 0
  cancelAnimationFrame(animationId)
  clearInterval(intervalId)
  gameOverScore.innerHTML = score
  gameOverModal.style.opacity = 1
  gameOverModal.style.zIndex = 1
}

function newGame(){
  music.play()
  gameOverModal.style.opacity = 0
  gameOverModal.style.zIndex = -1
  projectiles = []
  enimys = []
  particles = []
  score = 0
  txtScore.innerHTML = "SCORE: " + score
  loop()
  spawnEnimys()
  ctx.fillStyle = "white"
  ctx.fillRect(0,0,cnv.width,cnv.height)
  
}



function playSound(soundType){
      
      const sound = document.createElement('audio')
      if(soundType === explosion){
        
        sound.src = "../snd/explosion.ogg"
        
      } else{
        
        sound.src = "../snd/shooting.mp3"
        
        
      }
      
      sound.addEventListener('canplaythrough',()=>{
        
        sound.play()
        
      },false)
      
    }
    
  
