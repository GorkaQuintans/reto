const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
})



function enableDarkMode(){
  let main_body=document.body;
  main_body.classList.toggle("dark-mode");

  if (i < 1) {
    i++;
} else {
    i = 0;
}
document.getElementById("foto").src = fotos[i];   
document.getElementById("foto1").src = fotos[i];  
}


var fotos = new Array();
var intervalo
i = 0;
fotos[0] = "img/CyberhDog.png"
fotos[1] = "img/CyberhDog (1).png"


