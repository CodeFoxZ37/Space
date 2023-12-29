const btn = document.querySelector(".btn")
const input0 = document.querySelector(".input0")
const input1 = document.querySelector(".input1")
const alm = document.querySelector(".alm")

btn.addEventListener("click",()=>{
    localStorage.setItem("user",`${input0.value}`)
    localStorage.setItem("password",`${input1.value}`)
    
})

