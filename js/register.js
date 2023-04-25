var currentUser;
const f = (tag) => document.querySelector(tag)
const vl = f(".vl")
const email = f('#email')
const pw = f('#pwd')
const con_pwd = f("#con_pwd")
const btnCadastrar = f("#btnCadastrar")

vl.addEventListener('click',(e)=>{
  e.preventDefault()
  
  window.location.href = "../index.html"
})


btnCadastrar.addEventListener('click',(e)=>{
  e.preventDefault()
  

  showLoading()
  if(!email.value || !pw.value || !con_pwd.value){
    hideLoading()
    alert('Preencha todos os campos!')
    
  } else{
    hideLoading()
  if(pw.value == con_pwd.value){
    
  showLoading()
  
  firebase.auth().createUserWithEmailAndPassword(email.value,pw.value)
  .then(user =>{
      
      
      firebase.auth().signInWithEmailAndPassword(email.value,pw.value)
      .then(res => {

        firebase.auth().onAuthStateChanged((user)=>{
              hideLoading()
          currentUser = user
          firebase.auth().languageCode = "pt"
          if(user.emailVerified){
            window.location.href = "../index.html"
          } else{
            showLoading()
            
              user.sendEmailVerification()
              .then(()=>{
                hideLoading
                alert('Email de Verificação Enviado')
                window.location.href = "../index.html"
              })
          }
        })
        
    })
    
        .catch(erro => {
          hideLoading()
            
            alert(erro)


            
    
    })
    
    
  })
  } else{
    alert('As senhas são diferentes!')
  }
  }
})