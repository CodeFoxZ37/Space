const list = document.querySelector(".list")

fetch("http://0.0.0.0:8000/")
    .then(response => response.json())
    .then(data =>{
        let arrayUser = data.user.split(",")
        let arrayScore = data.score.split(",")
        let number = 1;
        arrayUser.forEach((values,index) => {
            let htmlCode = `<div class="users">
            <b class="number">${number}</b>
            <b class="name">${values}</b>
            <b class="score">${arrayScore[index].toString().padStart(6, '0')}</b>
             </div>`
            number++;
         list.innerHTML += htmlCode;
        });
    })
    .catch(error=>{
        console.log("hubo un problema con la peticion", error)
    })