// Verificar si hay datos de divisas almacenados en el almacenamiento local
let infoDivisas = JSON.parse(localStorage.getItem('infoDivisas'));

// Si no hay datos almacenados, usar los valores predeterminados
if (!infoDivisas) {
  infoDivisas = [
    { divisa: "USD", pais: "Estados Unidos", precio: 1 },
    { divisa: "EUR", pais: "Unión Europea", precio: 1.1 },
    { divisa: "ARS", pais: "Argentina", precio: 493 },
    { divisa: "BRL", pais: "Brasil", precio: 5 }
  ];
}

// Función para generar las opciones de selección de moneda
function generarOpcionesMoneda() {
  const monedaOrigenSelect = document.getElementById("monedaOrigen");
  const monedaDestinoSelect = document.getElementById("monedaDestino");

  for (const divisa of infoDivisas) {
    const opcionMonedaOrigen = document.createElement("option");
    opcionMonedaOrigen.value = divisa.divisa;
    opcionMonedaOrigen.textContent = `${divisa.divisa} - ${divisa.pais}`;

    const opcionMonedaDestino = document.createElement("option");
    opcionMonedaDestino.value = divisa.divisa;
    opcionMonedaDestino.textContent = `${divisa.divisa} - ${divisa.pais}`;

    monedaOrigenSelect.appendChild(opcionMonedaOrigen);
    monedaDestinoSelect.appendChild(opcionMonedaDestino);
  }
}

// Función para convertir divisas S. ALERT
function convertirDivisas() {
  const monto = parseFloat(document.getElementById("monto").value);
  const monedaOrigen = document.getElementById("monedaOrigen").value;
  const monedaDestino = document.getElementById("monedaDestino").value;

  const tasaOrigen = infoDivisas.find(d => d.divisa === monedaOrigen).precio;
  const tasaDestino = infoDivisas.find(d => d.divisa === monedaDestino).precio;
  const tasaConversion = tasaDestino / tasaOrigen;

  const resultado = monto * tasaConversion;

  Swal.fire({
    title: 'Confirmación',
    text: `¿Deseas convertir ${monto} ${monedaOrigen} a ${monedaDestino}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Convertir',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      mostrarResultado(resultado);
    }
  });
}

// Llamando API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '84b4132d9amsh3f0cd7342faae67p196b72jsn5acd0a7958f0',
		'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
	}
};

fetch("https://currency-exchange.p.rapidapi.com/exchange?from=SGD&to=MYR&q=1.0", options)
.then(res => res.json())
.then(res => console.log(res))
function mostrarResultado(resultado) {
  Swal.fire({
    title: 'Resultado',
    text: `El resultado es: ${resultado}`,
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
}


// Evento que se dispara cuando el DOM ha cargado
document.addEventListener("DOMContentLoaded", function() {
  generarOpcionesMoneda();

  const btnConvertir = document.getElementById("btnConvertir");
  btnConvertir.addEventListener("click", convertirDivisas);
});

// Almacenar datos de divisas en el almacenamiento local
localStorage.setItem('infoDivisas', JSON.stringify(infoDivisas));
