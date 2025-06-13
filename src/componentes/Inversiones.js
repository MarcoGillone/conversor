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
        if (fechaInicio > fechaFin) {
            setResultado('La fecha final debe ser posteriror a la de inicio')
            return;
        }
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



        if (tasaInicio === undefined || tasaFin === undefined) {
            setResultado('no se encontraron tasas para una de las fechas')
            return;
        }else{
        setResultado(null)
        setTimeout(() =>{
        setResultado(
      `Tasa inicio: ${tasaInicio} - Tasa fin: ${tasaFin}\n` +
      `Valor de compra: ${cantidadInicial.toFixed(2)} - Valor de venta: ${cantidadFinal.toFixed(2)}\n` +
      mensaje);
            
            
            },0);
    }

    }catch (error){
        console.error('error al manejar la url', error);
        setResultado(null);
    }
    };
    return (
        <div className="card p-4 shadow-sm mt-5">
            <h3 className="fw-bold">Analizis de inversion</h3>
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
        <label className="form-label"> Moneda a comparar: </label>
        <select className="form-select" value={monedaComparacion} onChange={(e) => setMonedaComparacion(e.target.value)}>
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
        
        </div>
        <br></br>
        <div className="mb-3">
        <label className="form-label">Fecha Inicio:
        <input className="form-control" type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
        </label>
        </div>

        <div className="mb-3">
        <label className="form-label">Fecha Fin:
        <input className="form-control" type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />
        </label>
        </div>

        <br></br>
        <div className="mb-3">
        <button className="btn btn-primary"  onClick={analizarInversion}>
            Analizar
        </button>
        </div>

        {
            resultado && (
             <div className="alert alert-info white-space-pre-line">
                <strong>
                    Resultado:
                </strong>
                <p className="mb-1 fw-bold">{resultado}</p>
             </div>   
            )
        }

    </div>
    


    );
};

export default Inversiones;