import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegistroEmpleados from './pages/RegitroEmpleados';
import RegistroInsumos from './pages/RegistroInsumos';
import PaginaInicio  from './pages/PaginaInicio';
import RegistroInsumosClientes from './pages/RegistroInsumosClientes';
import RegistroOrdenesFabricacion from './pages/RegistroOrdenesFabricacion';
import RegistroVentas  from './pages/RegistroVentas';
import ProductosTerminados from './pages/ProductosTerminados';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path='/' element={<PaginaInicio/>}/>
          <Route path='/registro-empleados' element={<RegistroEmpleados/>}/>
          <Route path='/registro-insumos' element={<RegistroInsumos/>}/>
          <Route path='/pagina-inicio' element={<PaginaInicio/>}/>
          <Route path='/registro-insumos-clientes' element={<RegistroInsumosClientes/>}/>
          <Route path='/registro-orden-fabricacion' element={<RegistroOrdenesFabricacion/>}/>
          <Route path='/registro-ventas' element={<RegistroVentas/>}/>
          <Route path='/productos-terminados' element={<ProductosTerminados/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
