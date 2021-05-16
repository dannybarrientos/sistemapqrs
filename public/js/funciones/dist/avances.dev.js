"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actualizarAvance = void 0;

var actualizarAvance = function actualizarAvance() {
  //TODO Seleccionar las tareas existente
  var tareas = document.querySelector('li.tarea');

  if (tareas.length) {
    //TODO Seleccionar las tareas completadas
    var tareasCompletas = document.querySelectorAll('i.completo'); //TODO Calcular el avance

    var avance = Math.round(tareasCompletas.length / tareas.length * 100); //TODO Mostrar el avance

    var porcentaje = document.querySelector('#porcentaje');
    porcentaje.style.width = avance + '%';
  }
};

exports.actualizarAvance = actualizarAvance;