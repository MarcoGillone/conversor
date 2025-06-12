import logo from './logo.svg';
import './App.css';
import Header from './componentes/Header';
import Sidebar from './componentes/Sidebar';
import ConverterForm from './componentes/ConverterForm';
import UltimaCotizacion from './componentes/UltimaCotizacion';
import TopRates from './componentes/TopRates';
import { useState } from 'react';
import Inversiones from './componentes/Inversiones';



function App() {
  const [vistaActual,setVistaActual] = useState('');
  return (
    <div className='APP_container container-fluid'>
      <Header/>
      <div className='main_cont d-flex'>
        <Sidebar onSelect={setVistaActual}/>
          <div className='content_area'>
            {
              vistaActual === 'convert' && (
            <main className='flex-grow-1 p-4'>
            <ConverterForm/>
            <br></br>
            <UltimaCotizacion/>

            </main>

            )
            }

            {
              vistaActual === 'listCotizar' &&(
                <main className='flex-grow-1 p-4'>
                  <TopRates/>
                </main>

              )
            }

            {
              vistaActual === 'analysis' &&(
                <main className='flex-grow-1 p-4'>
                  <Inversiones/>
                </main>

              )
            }


            {
              !vistaActual &&(
                
                  <p className='p-4'>Seleccionar una opcion desde el menu lateral</p>
                

              )
            }
            

          </div>

      </div>
    </div>
  );
}

export default App;
