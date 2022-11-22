import React, { useContext, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //obtener el state del formulario
    const proyectContext = useContext(proyectoContext);
    const { formulario, mostrarFormulario, agregarProyecto, mostrarError, errorformulario } = proyectContext;

    //state para proyecto
    const [proyecto, setProyecto] = useState({
        nombre: '',
    });
    const {nombre} = proyecto;
    
    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault();

        //validar
        if (nombre === '') {
            mostrarError();
            return;
        }
        //agregar al state
        agregarProyecto(proyecto);
        //reiniciar el form
        setProyecto({
            nombre: ''
        })
    }

    return (
        <>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={ () => mostrarFormulario()}
            >
                Nuevo Proyecto
            </button>

           {
                formulario 
                ?
                    (
                        <form
                        className='formulario-nuevo-proyecto'
                        onSubmit={onSubmitProyecto}
                    >
                        <input 
                            type="text" 
                            className='input-text'
                            placeholder='Nombre Proyecto'
                            name='nombre'
                            value={nombre}
                            onChange={onChangeProyecto}
                            />
                        <input 
                            type="submit" 
                            className='btn btn-block btn-primario'
                            value='Agregar Proyecto'
                            />
                    </form> 
                    )
                    : null}

                    { errorformulario ? <p className='mensaje error'>El nombre es obligatorio</p> : null}
        </>
    );
};

export default NuevoProyecto;