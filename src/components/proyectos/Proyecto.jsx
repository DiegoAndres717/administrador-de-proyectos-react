import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {

  //obtener el state de proyectos
  const proyectContext = useContext(proyectoContext);
  const { proyectoActual } = proyectContext;
  //obtener funcion del context de tarea
  const tareaContext = useContext(TareaContext);
  const { obtenerTarea } = tareaContext;

  //funcion para agregar el evento actual
  const eseleccionarProyecto = id => {
      proyectoActual(id); //fijar un proyecto actual
      obtenerTarea(id); //filtrar las tareas cuando se de click
  }

  return (
    <>
      <li>
        <button type="button" 
        className="btn btn-blank"
        onClick={() => eseleccionarProyecto(proyecto._id) }
        >
          {proyecto.nombre}
        </button>
      </li>
    </>
  );
};

export default Proyecto;
