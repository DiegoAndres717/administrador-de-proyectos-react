import { TAREAS_PROYECTO, 
    AGREGAR_TAREAS, 
    VALIDAR_TAREA, 
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    lIMPIAR_TAREA } from "../../types";



// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: action.payload
            }
        case AGREGAR_TAREAS:
            return {
                ...state,
                tareasproyecto: [
                    action.payload,
                    ...state.tareasproyecto,
                ],
                errortarea: false
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true,
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter( tarea => tarea._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:
        case ESTADO_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.map( tarea => tarea._id === action.payload.id ? 
                    action.payload : tarea ),
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaselecionada: action.payload
            }
        case lIMPIAR_TAREA:
            return {
                ...state,
                tareaselecionada: null,
            }
        default:
            return state;
    }
}

