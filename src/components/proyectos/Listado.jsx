import React, { useContext, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import Proyecto from './Proyecto';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertaContext from '../../context/alertas/alertaContext';

const Listado = () => {
    //extraer proyectos de state inicial
    const proyectContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectContext;
    
    const aelrtaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = aelrtaContext;

    //obtener proyectos cuando carga el componente
    useEffect(() => {
        //si hay un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos();
        //eslint-disable-next-line
    }, [mensaje])

    //si proyectos tiene contenido 
    if( proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p>;

    

    return (
        <>
            <ul className="listado-proyectos">
                { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
                <TransitionGroup>
                {proyectos.map( proyecto =>(
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames='proyecto'
                    >
                        <Proyecto 
                        proyecto={proyecto}
                    />
                    </CSSTransition>
                ))}
                </TransitionGroup>
            </ul>
        </>
    );
};

export default Listado;