fetch("https://amiiboapi.com/api/amiibo/")
	.then((response) => response.json())
	.then((datos) => {
		console.log(datos);
	})
	.catch((error) => {
		console.error("Ocurrió un error:", error);
	});

let button = document.querySelector("#boton");
let textInput = document.querySelector("#nombre");
let lista = document.querySelector("#lista");
button.addEventListener("click", function () {
	fetch(`https://amiiboapi.com/api/amiibo/?name=${textInput.value}`)
		.then((response) => response.json())
		.then((datos) => {
			lista.innerHTML = "";
			datos.amiibo.forEach((element, i) => {
				console.log(element);
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

document.querySelector("#btnFav").addEventListener("click", function () {
	console.log(document.querySelector("#btnFav").value);
});
