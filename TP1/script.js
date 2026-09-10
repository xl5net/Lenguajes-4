navigator.geolocation.getCurrentPosition(
  function (ubicacion) {
    const latitud = ubicacion.coords.latitude;
    const longitud = ubicacion.coords.longitude;

    document.getElementById("latitud").value = latitud;
    document.getElementById("longitud").value = longitud;
  },
  function (error) {
    console.warn("Permiso denegado o error ", error.message);
    document.getElementById("latitud").value = "Error";
    document.getElementById("longitud").value = "Error";
  },
);

const inputImagenesUsuario = document.getElementById("inputImagen");
const VisorImagen = document.getElementById("VisualizarImagen");

inputImagenesUsuario.addEventListener("change", function (event) {
  const archivo = event.target.files[0];
  if (!archivo.type.startsWith("image/")) {
    return;
  }

  const lectorArchivos = new FileReader();

  lectorArchivos.onload = function (e) {
    const textoResultante = e.target.result;
    VisorImagen.src = textoResultante;
    VisorImagen.classList.add("mostrar");
    zonaArrastre.style.display = "none";
  };

  lectorArchivos.readAsDataURL(archivo);
});

// function subirFoto(event) {
//   const archivo = event.target.files[0];
//   if (!archivo.type.startsWith("image/")) {
//     return;
//   }
//   const lectorArchivos = new FileReader();

//   lectorArchivos.onload = function (e) {
//     const textoResultante = e.target.result;
//     VisorImagen.src = textoResultante;
//     VisorImagen.classList.add("mostrar");
//     zonaArrastre.style.display = "none";
//   };

//   lectorArchivos.readAsDataURL(archivo);
// }
// <input onClick={(event) => subirFoto(event)} />

const zonaArrastre = document.getElementById("imagenes");

["dragenter", "dragover", "dragleave", "drop"].forEach((nombreEvento) => {
  zonaArrastre.addEventListener(nombreEvento, function (evento) {
    evento.preventDefault();
  });
});

["dragenter", "dragover"].forEach((nombreEvento) => {
  zonaArrastre.addEventListener(nombreEvento, function () {
    zonaArrastre.classList.add("arrastrando");
  });
});

["dragleave", "drop"].forEach((nombreEvento) => {
  zonaArrastre.addEventListener(nombreEvento, function () {
    zonaArrastre.classList.remove("arrastrando");
  });
});

zonaArrastre.addEventListener("drop", function (evento) {
  const archivos = evento.dataTransfer.files;

  if (archivos.length > 0) {
    inputImagenesUsuario.files = archivos;
    const eventoCambio = new Event("change");
    inputImagenesUsuario.dispatchEvent(eventoCambio);
  }
});

zonaArrastre.addEventListener("click", function () {
  inputImagenesUsuario.click();
});

VisorImagen.addEventListener("click", function () {
  inputImagenesUsuario.click();
});
