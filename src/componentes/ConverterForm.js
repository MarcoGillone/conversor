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
      setResultado(null);
      
      setTimeout(() =>{
      setResultado({
        tasa,
        resultadoB,
        fecha: data.date,
      });
    },0);


      
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
    <div className="card p-4 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Monto:</label>
          <input className="form-control"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Moneda de origen:</label>
          <select className="form-select"
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

        <div className="mb-3">
          <label className="form-label">Moneda de destino:</label>
          <select className="form-select"
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

        <div className="mb-3">
          <label className="form-label">Fecha:</label>
          <input className="form-control"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 d-flex gap-2">
          <button className="btn btn-primary" type="submit">Convertir</button>
          <button className="btn btn-secondary" type="button" onClick={handleSwap}>
            Intercambiar monedas
          </button>
        </div>
      </form>

      {resultado && (
        <div className="mb-3 alert alert-info mt-4">
          <h3>Resultado:</h3>
          <p>Fecha: {resultado.fecha}</p>
          <p>Tasa de cambio: {resultado.tasa}</p>
          <p>Monto: {resultado.resultadoB.toFixed(2)}</p>
        </div>
      )}
      </div>
    </>
  );
  
};

export default ConverterForm;