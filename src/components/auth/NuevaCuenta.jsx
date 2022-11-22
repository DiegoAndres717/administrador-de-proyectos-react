import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = () => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //en caso de autenticacion duplicada
    let navigate = useNavigate();
    useEffect(() => {
        if (autenticado) {
            navigate('/proyectos');
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje, autenticado])
    

    //state para login
    const [ usuario, guardarUsuario ] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })
    const { nombre, email, password, confirmar } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    //cuando quiere hacer login
    const onSubmit = e => {
        e.preventDefault();

        //validar   
        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //password min 6 caracteres
        if (password.length < 6) {
            mostrarAlerta('La contraseña debe tener almenos 6 caracteres', 'alerta-error');
            return;
        }
        //password sean iguales
        if (password !== confirmar) {
            mostrarAlerta('Las contraseñas no coinciden', 'alerta-error');
            return;
        }
        //accion
        registrarUsuario({
            nombre,
            email,
            password,
        });
    }

    return (    
        <>
            <div className="form-usuario">
                { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
                <div className="contenedor-form sombra-dark">
                    <h1>Registrarse</h1>

                    <form
                        onSubmit={onSubmit}
                    >
                        <div className="campo-form">
                            <label htmlFor="nombre">Email</label>
                            <input 
                                type="text" 
                                id='nombre'
                                name='nombre'
                                value={nombre}
                                placeholder='Tu Nombre'
                                onChange={onChange}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id='email'
                                name='email'
                                value={email}
                                placeholder='Tu Email'
                                onChange={onChange}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id='password'
                                name='password'
                                value={password}
                                placeholder='Tu Password'
                                onChange={onChange}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="confirmar">Confirmar Password</label>
                            <input 
                                type="password" 
                                id='confirmar'
                                name='confirmar'
                                value={confirmar}
                                placeholder='Tu Password'
                                onChange={onChange}
                            />
                        </div>

                        <div className="campo-form">
                            <input type="submit"
                                className='btn btn-primario btn-block'
                                value='Registrarme'
                            />
                        </div>
                    </form>

                    <Link to={'/'} className='enlace-cuenta'>
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NuevaCuenta;