const input0 = document.querySelector(".input0")
const input1 = document.querySelector(".input1")
const alm = document.querySelector(".alm")
const form = document.getElementById('form1')

form.addEventListener('submit', function (e){
    
    localStorage.setItem("user",`${input0.value}`)
    let formData = new FormData(this);

    // Enviar los datos usando fetch
    fetch(this.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Manejar la respuesta JSON aquí
    })
    .catch(error => {
        console.error('Error:', error);
    });

    window.open("../MiniJuego/index.html"); 
})
