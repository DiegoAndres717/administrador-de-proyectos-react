import React, { useContext, useEffect, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //obtener si un proyecto esta activo
  const proyectContext = useContext(proyectoContext);
  const { proyecto } = proyectContext;

    //obtener 
  const tareaContext = useContext(TareaContext);
  const { errortarea ,agregarTarea, validarTarea, obtenerTarea, tareaselecionada, 
    actualizarTarea, limpiarTarea } = tareaContext;

  //effect que detecta la tarea seleccionada
  useEffect(() => {
    if (tareaselecionada !== null) {
        guardarTarea(tareaselecionada);
    }else {
        guardarTarea({
            nombre: '',
        })
    }
  }, [tareaselecionada])
  

  //state del form
    const [ tarea, guardarTarea ] = useState({
        nombre: '',
    })
    //extraer el nombre del proyecto
    const { nombre } = tarea;
   //si no hay proyectos seleccionados
   if(!proyecto) return null;

   //Array distructury para extraer el proyecto 
   const [ proyectoActual ] = proyecto;

   //leer formulario, valores
   const handleChange = (e) => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
   }

   const onSubmit = e => {
        e.preventDefault();

        //validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }
        //si es editar o agregar nueva tarea
        if (tareaselecionada === null) {
            //agregar la tarea nueva 
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }else {
            //actualizar Tarea existente
            actualizarTarea(tarea);

            //elimina tarea seleccionada del state
            limpiarTarea();
        }


        //obtener y filtrar las tareas
        obtenerTarea(proyectoActual.id);
        //reiniciar el formulario
        guardarTarea({
            nombre: '',
        })

   }

    return (
        <>
            <div className="formulario">
                <form
                    onSubmit={onSubmit}
                >
                    <div className="contenedor-input">
                        <input type="text" 
                            className='input-text'
                            placeholder='Nombre Tarea...'
                            name='nombre'
                            value={nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="contenedor-input">
                        <input type="submit" 
                            className='btn btn-primario btn-submit btn-block'
                            value={ tareaselecionada ? 'Editar tarea' : 'Agregar Tarea'}
                        />
                    </div>
                </form>
                { errortarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p> : null }
            </div>
        </>
    );
};

export default FormTarea;