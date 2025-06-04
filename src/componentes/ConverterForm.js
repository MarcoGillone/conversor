import React, { useState , useEffect} from "react";
import { getCurrencies, getEntreFechas, getLatest,getTasaEnFecha } from "../servicio/FrankfurterService";
const ConverterForm = () =>{
    const [amount,setAmount] = useState('');
    const [monedaOrigen, setMonedaOrigen] = useState('');
    const [monedaDestino, setMonedaDestino] = useState('');
    const [date, setDate] = useState('');
    const [monedas, setMonedas] = useState({});
    useEffect( () =>{ 
        async function fetchCurrencies() {
            try{
                const data = await getCurrencies();
                setMonedas(data);
            }catch (error){
                console.log(error);
            }
        }
        fetchCurrencies();
    },[]); 
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('convertir: ',{amount,monedaOrigen,monedaDestino,date});   
    }
    const handleSwap = () =>{
        setMonedaOrigen(monedaDestino);
        setMonedaDestino(monedaOrigen);
    }
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Monto:
                </label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required></input>
            </div>

            <div>
                <label>
                    Moneda de origen:
                </label>
                <select value={monedaOrigen} onChange={(e) => setMonedaOrigen(e.target.value)} required> 
                    <option value=''> Seleccione </option>
                    {Object.entries(monedas).map(([code, name]) => (
                        <option key={code} value={code}>
                        {code} - {name}
                        </option>
                    ))}         
                </select>
            </div>
            <div>
                <label>
                    Moneda de destino:
                </label>
                <select value={monedaDestino} onChange={(e) => setMonedaDestino(e.target.value)} required> 
                    <option value=''> Seleccione </option>
                    {Object.entries(monedas).map(([code, name]) => (
                        <option key={code} value={code}>
                        {code} - {name}
                        </option> 
                    ))}        
                </select>
            </div>
            <div>
                <label>
                    Fecha:
                </label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required></input>
            </div>
            <div>
                <button type="submit">
                    Convertir
                </button>
                <button type="button" onClick={handleSwap}>
                    Intercambiar monedas
                </button>
            </div>
        </form>
    );
};
export default ConverterForm;