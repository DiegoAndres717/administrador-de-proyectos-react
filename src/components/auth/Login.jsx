import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = () => {

     //extraer los valores del context
     const alertaContext = useContext(AlertaContext);
     const { alerta, mostrarAlerta } = alertaContext;
 
     const authContext = useContext(AuthContext);
     const { mensaje, autenticado, iniciaSesion } = authContext;
    //si el usuariop O PASSWORD o no exista
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
        email: '',
        password: '',
    })
    const { email, password } = usuario;

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
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }
        //accion
        iniciaSesion({ email, password });
    }

    return (
        <>
            <div className="form-usuario">
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
                <div className="contenedor-form sombra-dark">
                    <h1>Iniciar Sesión</h1>

                    <form
                        onSubmit={onSubmit}
                    >
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
                            <input type="submit"
                                className='btn btn-primario btn-block'
                                value='Iniciar Sesión'
                            />
                        </div>
                    </form>

                    <Link to={'/nueva-cuenta'} className='enlace-cuenta'>
                        Registrarse
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;