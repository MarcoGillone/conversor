import React, { useState, useEffect } from "react";
import { getCurrencies, getTasaEnFecha } from "../servicio/FrankfurterService";

const TopRates = () => {
  const [fecha, setFecha] = useState("");
  const [monedaOrigen, setMonedaOrigen] = useState("USD");
  const [monedas, setMonedas] = useState({});
  const [topTasas, setTopTasas] = useState([]);
  const [n, setN] = useState(5);

  const consultarTop = async () => {
    try {
      const data = await getTasaEnFecha(fecha, monedaOrigen);
      const tasas = [];
      for(const code in data.rates){
        tasas.push([code, data.rates[code]])
      }

      for(let i = 0; i < tasas.length; i ++){
        for(let j = i+1; j< tasas.length; j ++){
          if (tasas[j][1]>tasas[i][1]) {
            const temp = tasas[i];
            tasas[i] = tasas[j];
            tasas[j] = temp;
          }
        }
      }
      /*
      tasas.sort((a,b)=>{b[1] - a[1]})
      */
     const top = tasas.slice(0, n);
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
            setMonedas(data);
        }catch (error){
            console.error('Error al cargar monedas',error);
            setMonedas(null);
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

      <label> Cantidad de tasas a mostrar
        <input type="numer" value={n} onChange={(e)=> setN(Number(e.target.value))} min='1'></input>
      </label>

      <label>Fecha:
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      </label>

      <button onClick={consultarTop}>Consultar</button>
      <ul>
        { 
        (()=>{
          const items = [];
          for(const [code, rates] of topTasas){
            items.push(
              <li key={code}>
                1 {monedaOrigen} = {rates} {code}
              </li>
            );
          }
          return items;
        })()
        }
      </ul>
    </div>
  );
};

export default TopRates;
