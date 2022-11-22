import React from 'react';
import Listado from '../proyectos/Listado';
import NuevoProyecto from '../proyectos/NuevoProyecto';


const SideBar = () => {
    return (
        <>
            <aside>
                <h1>ADMIN<span>PRO</span></h1>
                <NuevoProyecto />
                <div className="proyectos">
                    <h2>Tus proyectos</h2>
                    <Listado />
                </div>
            </aside>
        </>
    );
};

export default SideBar;