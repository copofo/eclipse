const f = (tag) => document.querySelector(tag)
window.addEventListener('scroll', () =>{
  
  
  window.scrollTo(0,0)
  
  
})


const cnv = f('canvas')

cnv.width = innerWidth

cnv.height = innerHeight

const ctx = cnv.getContext('2d')

const player = new Player(cnv.width/2,cnv.height/2,20,'#48fcff')

let projectiles = []

const shootingSpeed = 4





cnv.addEventListener('click',(e)=>{
  
  e.preventDefault()
  const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x )
  
  const velocity = {
    
    x: Math.cos(angle) * shootingSpeed,
    y: Math.sin(angle) * shootingSpeed
  }
  projectiles.push(new Projectile(player.x,player.y,3,"#48fcff",velocity))
})








function loop(){
  
  window.requestAnimationFrame(loop, cnv)
  update()
  
}

function update(){
  
  ctx.fillStyle = "rgba(0,0,0,0.1)"
  ctx.fillRect(0,0,cnv.width,cnv.height)
  
  
  checkProjectiles()
  
  player.update()
  
}

function checkProjectiles(){
  
  for(let i = projectiles.length -1; i >= 0; i--){
    
    const p = projectiles[i]
    p.update()
    
  }
  
  
  
}


loop()