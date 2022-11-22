import React, { Component, useContext, useEffect} from 'react';
import { Route, useNavigate } from 'react-router-dom';
import AuthContext from '../context/autenticacion/authContext';

const RutaPrivada = ({ componet: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { autenticado } = authContext;
    const Nav = useNavigate()
    return (
        <Route { ...props } render={ props => !autenticado ? (
            <Nav to="/" />
        ) : (
            <Component { ...props } />
        )} 
        />
    );
}

export default RutaPrivada;
