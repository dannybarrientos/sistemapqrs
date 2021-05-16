"use strict";

var _proyectos = _interopRequireDefault(require("./modulos/proyectos"));

var _tareas = _interopRequireDefault(require("./modulos/tareas"));

var _avances = require("./funciones/avances");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener('DOMContentLoaded', function () {
  (0, _avances.actualizarAvance)();
});