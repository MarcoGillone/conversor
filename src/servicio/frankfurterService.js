const Base_URL = 'https://api.frankfurter.app'

export async function getCurrencies() {
    const response = await fetch(`${Base_URL}/currencies`);
    if (!response.ok) {
        throw new Error("Error al obtener la moneda");
        
    }
    return await response.json();
}


export async function getTasaEnFecha(date, from, to) {
    const response = await fetch(`${Base_URL}/${date}?from=${from}&to=${to}`);
    if (!response.ok) {
        throw new Error("Error al obtener la tasa de cambio");
        
    }
    return await response.json();
}

export async function getLatest(from, to) {
    const response = await fetch(`${Base_URL}/latest?from=${from}&to=${to}`);
    if (!response.ok) {
        throw new Error("Error al obtener la tasa de cambio");
        
    }
    return await response.json();
}

export async function getEntreFechas(fromDate, toDate, fromMoneda, toMoneda) {
    const response = await fetch(`${Base_URL}/${fromDate}..${toDate}?from=${fromMoneda}&to=${toMoneda}`);
    if (!response.ok) {
        throw new Error("Error al obtener la tasa de cambio");
        
    }
    return await response.json();
}