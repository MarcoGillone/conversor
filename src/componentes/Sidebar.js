import React from "react";
import App from "../App";

const Sidebar = ({onSelect}) => {
    return(
        <aside className="sidebar">
            <nav>
                <ul>
                    <li>
                        <button onClick={() => onSelect('convert')}>
                            Conversion de monedas
                        </button>
                    </li>
                     <li>
                        <button onClick={() => onSelect('listCotizar')}>
                            Cotizaciones mas altas
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onSelect('analysis')}>
                            Analisis de inversion 
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
export default Sidebar;