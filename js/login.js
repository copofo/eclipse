window.addEventListener("DOMContentLoaded",()=>{
  
  firebase.auth().onAuthStateChanged(user =>{
    
    if(user && user.emailVerified){
      
      window.location.href = "pg/home.html"
    }
    
    
    
  })
  
  
  
  
})

var currentUser
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
  
  showLoading()
  
  firebase.auth().signInWithEmailAndPassword(email.value, pwd.value)
  
  
  .then(res => {
        hideLoading()
        firebase.auth().onAuthStateChanged((user)=>{
          
          currentUser = user
          if(user.emailVerified){
            window.location.href = "pg/home.html"
          } else{
            alert('Email não Verificado!')
          }
        })
        
    })
    
        .catch(erro => {
            hideLoading()
            if(erro.code === "auth/user-not-found"){
              alert("Usuário não encontrado!")
            }


            
    
    })


})



window.addEventListener('keydown',(e)=>{
  
  
  //const tecla = e.keyCode
  
  if(e.key === "Enter"){
    btnEntrar.click()
  }
  
  
  
  
})

