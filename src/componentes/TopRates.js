import React, { useState, useEffect } from "react";
import { getCurrencies, getTasaEnFecha } from "../servicio/FrankfurterService";

const TopRates = () => {
  const [fecha, setFecha] = useState("");
  const [monedaOrigen, setMonedaOrigen] = useState("USD");
  const [monedaDestino, setMonedaDestino] = useState("");
  const [monedas, setMonedas] = useState({});
  const [topTasas, setTopTasas] = useState([]);

  const consultarTop = async () => {
    try {
      const data = await getTasaEnFecha(fecha, monedaOrigen, monedaDestino);
      const top = Object.entries(data.rates)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);
      setTopTasas(top);
    } catch (error) {
      console.error("Error al obtener tasas", error);
      setTopTasas([]);
    }
  };
  useEffect (() => {
    async function fetchData() {
        try{
            const data = await getCurrencies();
        }catch (error){
            console.error('Error al cargar monedas',error);
        }
    }
    fetchData();
  

},[]);

  return (
    <div>
      <h3>Top Cotizaciones</h3>

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
        Moneda destino:
        <select value={monedaDestino} onChange={(e) => setMonedaDestino(e.target.value)}>
          <option value="">Todas</option>
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

      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      <button onClick={consultarTop}>Consultar</button>

      <ul>
        {topTasas.map(([code, rate]) => (
          <li key={code}>1 {monedaOrigen} = {rate} {code}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopRates;
