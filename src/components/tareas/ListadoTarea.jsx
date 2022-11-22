import React, { useContext } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTarea = () => {

    //obtener el state de proyectos
  const proyectContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectContext;
  
  //obtener las tareas de proyectos
const tareaContext = useContext(TareaContext);
const { tareasproyecto } = tareaContext;

  //si no hay proyectos seleccionados
  if(!proyecto) return <h2>Selecciona un proyecto</h2>;

  //Array distructury para extraer el proyecto 
  const [ proyectoActual ] = proyecto;


    return (
        <>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                { tareasproyecto.length === 0 
                    ? (<li className='tarea'><p>No hay tareas</p></li>)
                    : <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames='tarea'
                        >
                            <Tarea 
                            tarea={tarea}
                        />
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                }
            </ul>

            <button
                type='button'
                className='btn btn-eliminar'
                onClick={ () => eliminarProyecto(proyectoActual._id)}
            >
                Eliminar proyecto
            </button>
        </>
    );
};

export default ListadoTarea;