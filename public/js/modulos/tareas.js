import axios from "axios";
import Swal from 'sweetalert2';
import { actualizarAvance } from '../funciones/avances'

const tareas = document.querySelector('.listado-pendientes');

if(tareas) {

    tareas.addEventListener('click', e => {
        if(e.target.classList.contains('fa-check-circle')) {
            const icono = e.target
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            //TODO Request hacia /tarea/:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, { idTarea })
            .then(function(respuesta){
                if(respuesta.status ===200) {
                    console.log(respuesta);
                    icono.classList.toggle('completo')
                    actualizarAvance()
                }
            })
        }

        if(e.target.classList.contains('fa-trash')) {

            const tareaHTML = e.target.parentElement.parentElement,
                    idTarea = tareaHTML.dataset.tarea;
                    Swal.fire({
                        title: 'Deseas borrar esta Tarea?',
                        text: "Una tarea eliminada no se puede recuperar",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, Borrar',
                        cancelButtonText: 'No, Cancelar'
                    }).then((result) => {
                        if(result.value) {
                            //Enviar peticion a Axios
                            //Armaremos la url
                            const url = `${location.origin}/tareas/${idTarea}`
                            axios.delete(url, {params:{ idTarea }})
                            .then(function (respuesta) {
                                if(respuesta.status ===200 ) {
                                    console.log(respuesta);
                                    //TODO Eliminar el nodo
                                    tareaHTML.parentElement.removeChild(tareaHTML)

                                    //TODO Opcional una alerta
                                    Swal.fire(
                                         'Tarea Eliminada',
                                          respuesta.data,
                                         'success'
                                    )
                                    actualizarAvance()
                                }

                            });
                        }
                    });

        }//TOD
    });
}
export default tareas;