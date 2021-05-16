export const actualizarAvance = () => {
    //TODO Seleccionar las tareas existente
    const tareas = document.querySelector('li.tarea');

    if( tareas.length ) {
        //TODO Seleccionar las tareas completadas
        const tareasCompletas = document.querySelectorAll('i.completo');

        //TODO Calcular el avance
        const avance = Math.round((tareasCompletas.length/tareas.length)*100)

        //TODO Mostrar el avance
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance+'%'
    }



}