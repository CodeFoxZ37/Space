const list = document.querySelector(".list")

fetch("http://127.0.0.1:8000")
    .then(response => response.json())
    .then(data =>{
        list.textContent = data
    })
    .catch(error=>{
        console.log("hubo un problema con la peticion")
    })