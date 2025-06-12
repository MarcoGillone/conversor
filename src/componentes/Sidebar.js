import React from "react";
import App from "../App";

const Sidebar = ({onSelect}) => {
    return(
        <aside className="sidebar bg-light border-end p-3" style={{ minHeight: '100vh', width: '250px' }}>
            <nav >
                <h5 className="mb-4"></h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <button onClick={() => onSelect('convert')} className="btn btn-outline-primary w-100">
                            Conversion de monedas
                        </button>
                    </li>
                     <li className="nav-item mb-2">
                        <button onClick={() => onSelect('listCotizar')} className="btn btn-outline-primary w-100">
                            Cotizaciones mas altas
                        </button>
                    </li>
                    <li className="nav-item mb-2">
                        <button onClick={() => onSelect('analysis')} className="btn btn-outline-primary w-100">
                            Analisis de inversion 
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
export default Sidebar;