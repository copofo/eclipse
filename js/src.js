const f = (tag) => document.querySelector(tag)
window.addEventListener('scroll', () =>{
  
  
  window.scrollTo(0,0)
  
  
})


const cnv = f('canvas')

cnv.width = innerWidth

cnv.height = innerHeight

const ctx = cnv.getContext('2d')

const player = new Player(cnv.width/2,cnv.height/2,20,'#48fcff')


function loop(){
  
  window.requestAnimationFrame(loop, cnv)
  update()
  
}

function update(){
  
  ctx.fillStyle = "rgba(0,0,0,1)"
  ctx.fillRect(0,0,cnv.width,cnv.height)
  
  player.update()
  
}



loop()