import React, { useContext } from "react";
import TareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({ tarea }) => {

    //obtener el state de proyectos
    const proyectContext = useContext(proyectoContext);
    const { proyecto } = proyectContext;
    //obtener
    const tareaContext = useContext(TareaContext);
    const { eliminarTarea, obtenerTarea, cambiaEstadoTarea, guardarTareaActual } = tareaContext;

    //extraer el proyecto
    const [ proyectoActual ] = proyecto;

    //funcion eliminar
    const tareaEliminar = id => {
        eliminarTarea(id);
        /* obtenerTarea(proyecto[0].id) */
        obtenerTarea(proyectoActual.id)
    }

    //funcion que modifica el estado de tareas
    const cambiarEstadoTarea = tarea => {
        if (tarea.estado) {
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        cambiaEstadoTarea(tarea)
    }
    // agregar una tarea actual para editar
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea)
    }

  return (
    <>
      <li className="tarea sombra">
        <p>{tarea.nombre}</p>

        <div className="estado">
          {tarea.estado ? (
            <button type="button" className="completo" onClick={() => cambiarEstadoTarea(tarea)}>
              Completo
            </button>
          ) : (
            <button type="button" className="incompleto" onClick={() => cambiarEstadoTarea(tarea)}>
              Incompleto
            </button>
          )}
        </div>
        <div className="acciones">
          <button type="button" 
            className="btn btn-primario"
            onClick={ () => seleccionarTarea(tarea)}
            >
            Editar
          </button>
          <button type="button" 
            className="btn btn-secundario"
            onClick={() => tareaEliminar(tarea._id)}
          >
            Eliminar
          </button>
        </div>
      </li>
    </>
  );
};

export default Tarea;
