let button = document.querySelector("#boton");
let textInput = document.querySelector("#nombre");
let lista = document.querySelector("#lista");
let arrFavs;//declaramos variable

if (!localStorage.getItem("favoritos")) {//
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
                    arrFavs.push(btnContainer.value);
                    localStorage.setItem('favoritos', JSON.stringify(arrFavs));
                    /*if (localStorage.getItem("favoritos")) {
                        arrFavs = JSON.parse(localStorage.getItem("favoritos"));
                    }*/
                    console.log("lucas", arrFavs);
                })
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



