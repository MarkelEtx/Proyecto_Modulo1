let button = document.querySelector("#boton");
let buttonFav = document.querySelector("#btnFav-mostrar");
let textInput = document.querySelector("#nombre");
let lista = document.querySelector("#lista");
let arrFavs; //declaramos variable

if (!localStorage.getItem("favoritos")) {
    //
    arrFavs = [];
} else {
    arrFavs = JSON.parse(localStorage.getItem("favoritos"));
}
console.log("pepe", arrFavs);

button.addEventListener("click", function () {
    fetch(`https://amiiboapi.com/api/amiibo/?name=${textInput.value}`)
        .then((response) => response.json())
        .then((datos) => {
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
        })
        .catch((error) => {
            console.error("Ocurrió un error:", error);
        });
});

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
        console.log(element);
    });
});
