import React, { use, useState } from "react";
const ConverterForm = () =>{
    const [amount,setAmount] = useState('');
    const [monedaOrigen, setMonedaOrigen] = useState('');
    const [monedaDestino, setMonedaDestino] = useState('');
    const [date, setDate] = useState('');

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
                </select>
            </div>
            <div>
                <label>
                    Moneda de destino:
                </label>
                <select value={monedaDestino} onChange={(e) => setMonedaDestino(e.target.value)} required> 
                    <option value=''> Seleccione </option>         
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