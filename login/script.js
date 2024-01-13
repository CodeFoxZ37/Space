const input0 = document.querySelector(".input0")
const input1 = document.querySelector(".input1")
const alm = document.querySelector(".alm")
const form = document.getElementById('form1')
const message = document.querySelector(".message")

form.addEventListener('submit', function (e){
    e.preventDefault()
    localStorage.setItem("user",`${input0.value}`)
    let formData = new FormData(this);

    // Enviar los datos usando fetch
    fetch(this.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.message == false){
            message.style.display = "grid"
            message.innerHTML = "La contraseña es incorrecta"
        }
        else window.open("../MiniJuego/index.html"); 
    })
    .catch(error => {
        console.error('Error:', error);
    });

})
