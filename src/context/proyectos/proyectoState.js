import React, { useReducer } from 'react';  
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS, 
    AGREGAR_PROYECTO, 
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR } from '../../types'
import clienteAxios from '../../config/axios';

const ProyectoState = props => {
    
    /* const proyectos = [
        { id: 1, nombre: 'Tienda Virtual Web'},
        { id: 2, nombre: 'Desarrollo Web'},
        { id: 3, nombre: 'Desarrollo Industrial'}
    ] */

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null,
    }

    //dispach para ejecutar las acciones
    const [ state, dispach ] = useReducer(proyectoReducer, initialState)

    //serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispach({
            type: FORMULARIO_PROYECTO
        })
    }
    //Obtener los proyectos
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            dispach({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispach({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }
    //AGREGAR NUEVO PROYECTO
    const agregarProyecto = async proyecto => {
        /* proyecto.id = uuidv4(); */

        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado)
            //agregar los proyectos
            dispach({
                type: AGREGAR_PROYECTO,
                payload: resultado.data,
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispach({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }
    //Validar formulario por errores
    const mostrarError = () => {
        dispach({
            type: VALIDAR_FORMULARIO,
        })
    }
    //selecciona el proyecto que usuario dio click
    const proyectoActual = proyectoId => {
        dispach({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }
    //eliminar el proyecto
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`api/proyectos/${proyectoId}`);
            dispach({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispach({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    return (
        <proyectoContext.Provider
                value={{
                    proyectos: state.proyectos,
                    formulario: state.formulario,
                    errorformulario: state.errorformulario,
                    proyecto: state.proyecto,
                    mensaje: state.mensaje,
                    mostrarFormulario,
                    obtenerProyectos,
                    agregarProyecto,
                    mostrarError,
                    proyectoActual,
                    eliminarProyecto,
                }}
            >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;
