let button = document.querySelector("#boton");
let btnAvanzada = document.querySelector("#boton2");
let buttonFav = document.querySelector("#btnFav-mostrar");
let textInput = document.querySelector("#nombre");
let lista = document.querySelector("#lista");
let buscador = document.querySelector("#buscador");
let buscadorAvanzado = document.querySelector("#avanzada");
let buttonTipo = document.querySelector("#buttonTipo");
let buttonSerie = document.querySelector("#buttonSerie");
let arrFavs;
let ver = true;

if (!localStorage.getItem("favoritos")) {
    arrFavs = [];
} else {
    arrFavs = JSON.parse(localStorage.getItem("favoritos"));
}

button.addEventListener("click", function () {
    busquedaamiibo(1);
});
buttonTipo.addEventListener("click", function () {
    busquedaamiibo(2);
});
buttonSerie.addEventListener("click", function () {
    busquedaamiibo(3);
});

function busquedaamiibo(num) {
    let url;
    switch (num) {
        case 1:
            url = "amiibo/?name";
            break;
        case 2:
            url = "amiibo/?type";
            break;
        case 3:
            url = "amiibo/?amiiboSeries";
            break;
        default:
            break;
    }
    fetch(`https://amiiboapi.com/api/${url}=${textInput.value}`)
        .then((response) => response.json())
        .then((datos) => {
            console.log("datos", datos.amiibo.length);
            if (datos.amiibo.length != 0) {
                lista.innerHTML = "";
                datos.amiibo.forEach((element, i) => {
                    // console.log(element);
                    let carta = document.createElement("div");
                    carta.className = "card";
                    let imgamiibo = document.createElement("img");
                    imgamiibo.className = "image";
                    imgamiibo.src = element.image;
                    carta.appendChild(imgamiibo);
                    let descripcion = document.createElement("div");
                    descripcion.className = "info";
                    let h3 = document.createElement("h3");
                    h3.textContent = `${element.name}`;
                    let h4 = document.createElement("h4");
                    h4.textContent = `${element.gameSeries}`;
                    let btnContainer = document.createElement("button");
                    btnContainer.className = "btnFav";
                    btnContainer.id = `btnFav${i}`;
                    btnContainer.value = `${element.head}${element.tail}`;
                    let btnFav = document.createElement("i");
                    btnFav.className = "bx bx-star";
                    btnFav.addEventListener("click", function () {
                        if (arrFavs.includes(btnContainer.value)) {
                            carta.style.animation = 'shake-horizontal 0.8s linear both';
                            carta.addEventListener('animationend', function () {
                                carta.style.animation = '';
                            });
                        } else {
                            btnFav.style.animation = 'rotate-center 0.5s ease-in-out';
                            arrFavs.push(btnContainer.value);
                            localStorage.setItem("favoritos", JSON.stringify(arrFavs));
                            btnFav.addEventListener('animationend', function () {
                                btnFav.style.animation = '';
                            });
                        }
                    });
                    descripcion.appendChild(h3);
                    descripcion.appendChild(h4);
                    btnContainer.appendChild(btnFav);
                    descripcion.appendChild(btnContainer);
                    carta.appendChild(descripcion);
                    lista.appendChild(carta);
                });
            } else {
                lista.innerHTML = "";
                let titGif = document.createElement("p");
                titGif.id = "titGif";
                titGif.textContent = "UPSSSS!!!!!"
                let gif = document.createElement("img");
                gif.style.width = "35rem";
                gif.style.height = "auto";
                gif.src = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGtyY25jc2wzNjZzZDVrYjZqYnY1MTE2c3h4OGp3b3I3NWkwcjN0dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pyJsNhs040q79RNeVA/giphy.gif"
                lista.appendChild(titGif);
                lista.appendChild(gif);
            }

        })
        .catch((error) => {
            console.error("Ocurrió un error:", error);
        });
}



buttonFav.addEventListener("click", function () {
    lista.innerHTML = "";
    JSON.parse(localStorage.getItem("favoritos")).forEach((element) => {
        fetch(`https://amiiboapi.com/api/amiibo/?id=${element}`)
            .then((response) => response.json())
            .then((datosFav) => {
                let datosMostrar = datosFav.amiibo;
                let carta = document.createElement("div");
                carta.className = "card";
                let imgamiibo = document.createElement("img");
                imgamiibo.className = "image";
                imgamiibo.src = datosMostrar.image;
                imgamiibo.style.backgroundColor = "rgb(255, 140, 0";
                let descripcion = document.createElement("div");
                descripcion.className = "info";
                let h3 = document.createElement("h3");
                h3.textContent = `${datosMostrar.name}`;
                let h4 = document.createElement("h4");
                h4.textContent = `${datosMostrar.gameSeries}`;

                descripcion.appendChild(h3);
                descripcion.appendChild(h4);
                /* btnContainer.appendChild(btnFav); */
                /* descripcion.appendChild(btnContainer); */
                carta.appendChild(imgamiibo);
                carta.appendChild(descripcion);
                lista.appendChild(carta);
            })
            .catch();
    });
});


btnAvanzada.addEventListener("click", function () {
    console.log(document.querySelectorAll(".btn-inv"));
    if (ver) {
        document.querySelector("#botonesOcultos").style.display = "flex";

    } else {
        document.querySelector("#botonesOcultos").style.display = "none";
    }
    ver = !ver;

});


document.querySelector("#nombre").addEventListener("input", function () {
    if (document.querySelector("#nombre").value == "") {
        document.querySelector("#boton").value = "Buscar Todos";
    } else {
        document.querySelector("#boton").value = "Buscar";
    }

});

