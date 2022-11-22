import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import { v4 as uuidv4 } from 'uuid';
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREAS,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  lIMPIAR_TAREA
} from "../../types";
import clienteAxios from "../../config/axios";

const TareaState = (props) => {
  const initialState = {
    /* tareas: [
      { id: 1, proyectoId: 1, nombre: "Elegir Plataforma", estado: true },
      { id: 2, proyectoId: 2, nombre: "Elegir Colores", estado: true },
      { id: 3, proyectoId: 1, nombre: "Elegir Plataforma", estado: true },
      { id: 4, proyectoId: 3, nombre: "Elegir Colores", estado: false },
      { id: 5, proyectoId: 2, nombre: "Elegir Plataforma de pago", estado: false },
      { id: 6, proyectoId: 1, nombre: "Elegir Plataforma", estado: true },
      { id: 7, proyectoId: 1, nombre: "Elegir Colores", estado: false },
      { id: 8, proyectoId: 2, nombre: "Elegir Plataforma de pago", estado: true },
      { id: 9, proyectoId: 3, nombre: "Elegir Plataforma", estado: true },
      { id: 10, proyectoId: 1, nombre: "Elegir Colores", estado: true },
      { id: 11, proyectoId: 3, nombre: "Elegir Plataforma de pago", estado: false },
    ], */
    tareasproyecto: [],
    errortarea: false,
    tareaselecionada: null,
  };

  //crear dispach y state
  const [state, dispach] = useReducer(tareaReducer, initialState);

  //crear funcionas

  //obtener tareas de un proyecto
  const obtenerTarea = async (proyecto) => {
    try {
      const resultado = await clienteAxios.get('/api/tareas', { params: {proyecto}})
      dispach({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      
    }
  };
  //agregar una tarea al proyecto seleccionado
  const agregarTarea = async (tarea) => {
    /* tarea.id = uuidv4(); */
    try {
      const resultado = await clienteAxios.post('/api/tareas', tarea);
      dispach({
        type: AGREGAR_TAREAS,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error)
    }
    
  };
  //validar tarea
  const validarTarea = () => {
    dispach({
      type: VALIDAR_TAREA,
      errortarea: true,
    });
  };
  //eliminar tarea
  const eliminarTarea = (id) => {
    dispach({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };
  //cambia el estado de cada tarea
  const cambiaEstadoTarea = tarea => {
        dispach({
            type: ESTADO_TAREA,
            payload: tarea,
        })
  }
  //extrae una tarea para editar
  const guardarTareaActual = tarea => {
        dispach({
            type: TAREA_ACTUAL,
            payload: tarea,
        })
  }
  //edita o modifca una tarea 
  const actualizarTarea = tarea => {
        dispach({
            type: ACTUALIZAR_TAREA,
            payload: tarea,
        })
  }
  //limpiar tarea selecionada
  const limpiarTarea = () => {
        dispach({
            type: lIMPIAR_TAREA,
        })
  }

  return (
    <TareaContext.Provider
      value={{
        /* tareas: state.tareas, */
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaselecionada: state.tareaselecionada,
        obtenerTarea,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        cambiaEstadoTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
