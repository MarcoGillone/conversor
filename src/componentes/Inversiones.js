import React, { useState , useEffect} from "react";
import { getEntreFechas, getCurrencies} from "../servicio/FrankfurterService";

const Inversiones = () => {
    const [monedas, setMonedas] = useState({});
    const [monedaOrigen, setMonedaOrigen] = useState('');
    const [monedaComparacion, setMonedaComparacion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin,setFechaFin] = useState('');
    const [resultado, setResultado] = useState(null);

      useEffect (() => {
        async function fetchData() {
            try{
                const data = await getCurrencies();
                setMonedas(data);
            }catch (error){
                console.error('Error al cargar monedas',error);
                setMonedas(null);
            }
        }
        fetchData();
      
    
    },[]);

    const analizarInversion = async () =>{
        if(!monedaComparacion || !monedaOrigen || !fechaFin || !fechaInicio){return;}
    
    try{
        const data = await getEntreFechas(fechaInicio, fechaFin, monedaOrigen, monedaComparacion);
        const tasas = data.rates
        const tasaInicio = tasas[fechaInicio]?.[monedaComparacion];
        const tasaFin = tasas[fechaFin]?.[monedaComparacion];
        //  Agregar validacion de tasas
        const cantidadInicial = 1000 * tasaInicio;
        const cantidadFinal = 1000 * tasaFin;

        let mensaje = '';
        if (cantidadFinal > cantidadInicial) {
            mensaje = 'La inversion gano valor';
        }else if(cantidadFinal < cantidadInicial){
            mensaje = 'La inversion perdio valor'
        }else{
            mensaje = 'La inversion se mantuvo igual'
        }
        setResultado(
      `Tasa inicio: ${tasaInicio} - Tasa fin: ${tasaFin}\n` +
      `Valor inicial: ${cantidadInicial.toFixed(2)} - Valor final: ${cantidadFinal.toFixed(2)}\n` +
      mensaje
      );
    }catch (error){
        console.error('error al manejar la url', error);
        setResultado(null);
    }
    };
    return (
        <div>
            <h3>Analizis de inversion</h3>
            <label>
        Moneda origen:
        <select value={monedaOrigen} onChange={(e) => setMonedaOrigen(e.target.value)}>
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


        <label>
        Moneda a comparar:
        <select value={monedaComparacion} onChange={(e) => setMonedaComparacion(e.target.value)}>
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
        <br></br>
        
        <label>Fecha Inicio:
        <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
        </label>


        <label>Fecha Fin:
        <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />
        </label>


        <br></br>

        <button onClick={analizarInversion}>
            Analizar
        </button>

        {
            resultado && (
             <div>
                <strong>
                    Resultado:
                </strong>
                <p>{resultado}</p>
             </div>   
            )
        }

    </div>
    


    );
};

export default Inversiones;