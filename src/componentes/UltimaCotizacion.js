import React, {useEffect, useState} from "react";
import { getCurrencies, getLatest } from "../servicio/FrankfurterService";

const UltimaCotizacion = () =>{
    const [monedaOrigen, setMonedaOrigen] = useState('USD');
    const [tasa, setTasa] = useState(null);
    const [fecha, setFecha] = useState('');
    const [monedas, setMonedas]= useState({});

    const handleGetLatest = async () =>{
        try{
            const data = await getLatest(monedaOrigen);
            setTasa(data.rates);
            setFecha(data.date);
        }catch (error){
            console.error('Error al obtener la ultima cotizacion', error);
            setTasa(null);
        }
    };
    useEffect( () =>{
        async function fetchMonedas(){
            try{
                const data = await getCurrencies();
                setMonedas(data);
            }catch(error){
                console.error("Error al cargar las monedas",error);
            }
        }
        fetchMonedas();
    },[]);
    return (
        <div>
            <h2>Ultima Cotizacion</h2>
            <label>
                Moneda base: 
                <select value={monedaOrigen} onChange={(e) => setMonedaOrigen(e.target.value)} required>
                    <option value=''> Seleccione </option>
                    {
                        (() => {
                            const options = [];
                            for (const code in monedas) {
                            const name = monedas[code];
                            options.push(
                                <option key={code} value={code}>
                                {code} - {name}
                                </option>
                            );
                            }
                            return options;
                        })()
                    }
                </select>
                
            </label>
            <button onClick={handleGetLatest}> Conzultar </button>
            {tasa && (
                <div> 
                    <p>Fecha:{fecha}</p>
                        <ul>
                        {
                            (() => {
                            const items = [];
                            for (const code in tasa) {
                                const value = tasa[code];
                                items.push(
                                <li key={code}>
                                    1 {monedaOrigen} = {value} {code}
                                </li>
                                );
                            }
                            return items;
                            })()
                        }
                        </ul>
                </div>
            )

            }

        </div>
    )

}
export default UltimaCotizacion;