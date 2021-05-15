import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar) {

    btnEliminar.addEventListener('click', e=> {
        const urlProyecto = e.target.dataset.proyectoUrl;

        // console.log(urlProyecto)


        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar',
            cancelButtonText: 'No, Cancelar'
        }).then((result) =>{
            if(result.value) {
                //Enviar peticion a Axios
                //Armaremos la url
                const url = `${location.origin}/proyectos/${urlProyecto}`
                axios.delete(url, {params:{urlProyecto}})
                .then(function (respuesta){
                    console.log(respuesta);

                    Swal.fire(
                        'Proyecto Eliminado',
                        respuesta.data,
                        'success'
                    );
                    //redireccionar al incio, tambien lo puedo hacer con Node
                    setTimeout(() => {
                        window.location.href ='/'
                    }, 3000);
                    return;
                });

            }
        })
    });
}
 export default btnEliminar;

