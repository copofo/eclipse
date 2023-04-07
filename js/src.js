const f = (tag) => document.querySelector(tag)

const cnv = f('canvas')

cnv.width = innerWidth

cnv.height = innerHeight

const ctx = cnv.getContext('2d')



function loop(){
  
  window.requestAnimationFrame(loop, cnv)
  update()
  
}

function update(){
  
  
}

function render(){
  
  
}