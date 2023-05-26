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

// Función para convertir divisas
function convertirDivisas() {
  const monto = parseFloat(document.getElementById("monto").value);
  const monedaOrigen = document.getElementById("monedaOrigen").value;
  const monedaDestino = document.getElementById("monedaDestino").value;

  const tasaOrigen = infoDivisas.find(d => d.divisa === monedaOrigen).precio;
  const tasaDestino = infoDivisas.find(d => d.divisa === monedaDestino).precio;
  const tasaConversion = tasaDestino / tasaOrigen;

  const resultado = monto * tasaConversion;
  mostrarResultado(resultado);
}

// Función para mostrar el resultado
function mostrarResultado(resultado) {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.textContent = `El resultado es: ${resultado}`;
}

// Evento que se dispara cuando el DOM ha cargado
document.addEventListener("DOMContentLoaded", function() {
  generarOpcionesMoneda();

  const btnConvertir = document.getElementById("btnConvertir");
  btnConvertir.addEventListener("click", convertirDivisas);
});

// Almacenar datos de divisas en el almacenamiento local
localStorage.setItem('infoDivisas', JSON.stringify(infoDivisas));
