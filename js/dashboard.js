/* globals Chart:false, feather:false */

(() => {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

  // // Graphs
  // const ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      datasets: [{
        data: [
          15339,
          21345,
          18483,
          24003,
          23489,
          24092,
          12034
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })
})()

      function agregarFila() {
        var tabla = document.getElementById("miTabla");
        var fila = tabla.insertRow(-1);
        var celda1 = fila.insertCell(0);
        var celda2 = fila.insertCell(1);
        var celda3 = fila.insertCell(2);
        celda1.innerHTML = "<div class='editable' contenteditable='true' onkeydown='editarTexto(event)'>Nuevo dato 1</div>";
        celda2.innerHTML = "<div class='editable' contenteditable='true' onkeydown='editarTexto(event)'>Nuevo dato 2</div>";
        celda3.innerHTML = "<div class='editable' contenteditable='true' onkeydown='editarTexto(event)'>Nuevo dato 3</div>";
      }
      
      function editarTexto(event) {
        if (event.keyCode === 13) { // Verificar si se presionó la tecla Enter
          event.preventDefault(); // Evitar que se realice un salto de línea
          event.target.blur(); // Quitar el enfoque del elemento editable
        }
      }
      
      function eliminarFila(fila) {
        var tabla = document.getElementById("miTabla");
        tabla.deleteRow(fila);
      }
      
      function sumarColumnas() {
        var tabla = document.getElementById("miTabla");
        var filas = tabla.rows;
        
        for (var i = 0; i < filas.length; i++) {
          var celda = filas[i].insertCell(-1);
          celda.innerHTML = "Nuevo dato";
        }
      }
      
      function eliminarColumnas() {
        var tabla = document.getElementById("miTabla");
        var filas = tabla.rows;
        
        for (var i = 0; i < filas.length; i++) {
          filas[i].deleteCell(-1);
        }
      }