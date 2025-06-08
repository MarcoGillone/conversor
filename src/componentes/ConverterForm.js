import React, { useState, useEffect } from "react";
import {
  getCurrencies,
  getEntreFechas,
  getLatest,
  getTasaEnFecha,
} from "../servicio/FrankfurterService";

const ConverterForm = () => {
  const [amount, setAmount] = useState('');
  const [monedaOrigen, setMonedaOrigen] = useState('');
  const [monedaDestino, setMonedaDestino] = useState('');
  const [date, setDate] = useState('');
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const data = await getCurrencies();
        setMonedas(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCurrencies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let data;
      if (date) {
        data = await getTasaEnFecha(date, monedaOrigen, monedaDestino);
      } else {
        data = await getTasaEnFecha("latest", monedaOrigen, monedaDestino);
      }
      let tasa = data.rates[monedaDestino];
      const resultadoB = parseFloat(amount) * tasa;
      setResultado({
        tasa,
        resultadoB,
        fecha: data.date,
      });
      
    } catch (error) {
      console.error("Error al convertir", error);
      setResultado(null);
    }
  };

  const handleSwap = () => {
    setMonedaOrigen(monedaDestino);
    setMonedaDestino(monedaOrigen);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Monto:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Moneda de origen:</label>
          <select
            value={monedaOrigen}
            onChange={(e) => setMonedaOrigen(e.target.value)}
            required
          >
            <option value="">Seleccione</option>
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
        </div>

        <div>
          <label>Moneda de destino:</label>
          <select
            value={monedaDestino}
            onChange={(e) => setMonedaDestino(e.target.value)}
            required
          >
            <option value="">Seleccione</option>
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
        </div>

        <div>
          <label>Fecha:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit">Convertir</button>
          <button type="button" onClick={handleSwap}>
            Intercambiar monedas
          </button>
        </div>
      </form>

      {resultado && (
        <div>
          <h3>Resultado:</h3>
          <p>Fecha: {resultado.fecha}</p>
          <p>Tasa de cambio: {resultado.tasa}</p>
          <p>Monto: {resultado.resultadoB.toFixed(2)}</p>
        </div>
      )}
    </>
  );
};

export default ConverterForm;