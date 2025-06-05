import logo from './logo.svg';
import './App.css';
import Header from './componentes/Header';
import Sidebar from './componentes/Sidebar';
import ConverterForm from './componentes/ConverterForm';
import UltimaCotizacion from './componentes/UltimaCotizacion';
function App() {
  return (
    <div className='APP_container'>
      <Header/>
      <div className='main_cont'>
        <Sidebar onSelect={(view) => console.log('Vista seleccionada: ',view)}/>
          <div className='content_area'>
            <p>Seleccionar una opcion desde el menu lateral</p>
          </div>
          <main>
            <ConverterForm/>
            <br></br>
            <UltimaCotizacion/>
          </main>
      </div>
    </div>
  );
}

export default App;
