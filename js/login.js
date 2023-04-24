const f = (tag) => document.querySelector(tag)

const cnv = f('canvas')
const ctx = cnv.getContext('2d')

cnv.width = innerWidth
cnv.height = innerHeight

function loop(){
    requestAnimationFrame(loop,cnv)
    update()
}

function update(){
    ctx.fillStyle = "rgba(0,0,0,1)"
    ctx.fillRect(0,0,cnv.width,cnv.height)
}



loop()
const email = f("#email")
const pwd = f("#pwd")
const btnEntrar = f(".btn")

btnEntrar.addEventListener('click',(e)=>{
  e.preventDefault()
  
  firebase.auth().signInWithEmailAndPassword(email.value, pwd.value)
  
  
  .then(res => {
        
        window.location.href = "pg/home.html"
    })
    
        .catch(erro => {
            
            alert(erro)


            
    
    })


})


window.addEventListener('keydown',(e)=>{
  
  e.preventDefault()
  
  const tecla = e.keyCode
  
  if(tecla === 13){
    btnEntrar.click()
  }
  
  
  
  
})