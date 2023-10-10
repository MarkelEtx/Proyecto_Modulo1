fetch("https://amiiboapi.com/api/amiibo/")
    .then(response => response.json())
    .then(datos => {
        console.log(datos);
    })
    .catch(error => {
        console.error('Ocurrió un error:', error);
    });

let button = document.querySelector("#boton");
let textInput = document.querySelector("#nombre");
let lista = document.querySelector("#lista");
button.addEventListener("click", function () {
    fetch(`https://amiiboapi.com/api/amiibo/?name=${textInput.value}`)
        .then(response => response.json())
        .then(datos => {
            lista.innerHTML = "";
            datos.amiibo.forEach(element => {
                console.log(element);
                let carta = document.createElement("div");
                carta.className = "card";
                let imgamiibo = document.createElement("img");
                imgamiibo.className = "image";
                imgamiibo.src = element.image;
                carta.appendChild(imgamiibo);
                let descripcion = document.createElement("div");
                let h3 = document.createElement("h3");
                h3.textContent = `${element.name}`;
                descripcion.appendChild(h3);
                carta.appendChild(descripcion);
                lista.appendChild(carta);
            });
        })
        .catch(error => {
            console.error('Ocurrió un error:', error);
        });

});

