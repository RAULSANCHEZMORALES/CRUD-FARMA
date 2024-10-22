import { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import LoadingVentas from '../components/LoadingVentas';

function RegistroVentas() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulando un tiempo de carga (por ejemplo, 3 segundos)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
    // Variables a utilizar para registro ventas
  const [nombre_vendedor,setNombre_Vendedor] = useState("");
  const [nombre_cliente,setNombre_Cliente] = useState("");
  const [datos_cliente,setDatos_Cliente] = useState("");
  const [nombre_producto,setNombre_Producto] = useState("");
  const [fecha_venta,setFecha_Venta] = useState("");
  const [cantidad,setCantidad] = useState("");
  const [unidades,setUnidades] = useState("");
  const [observaciones,setObservaciones] = useState("");
  const [id_venta,setId_Venta] = useState("");

  const [editar,setEditar] = useState(false);

  const [ventasList,setVentas] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(15);  

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = ventasList.slice(indexOfFirstResult, indexOfLastResult);

  const nextPage = () => {
      setCurrentPage(currentPage + 1);
    };
    
  const previousPage = () => {
      setCurrentPage(currentPage - 1);
    };

  //Funcion use effect, se ejecuta cuando inicia el programa
  useEffect(() => {
    getVentas();
   },[])

   //Función de añadir nuevas ventas
  const add = (val) =>{
     // Validar campos aquí
  if (!nombre_vendedor || !nombre_cliente || !datos_cliente || !nombre_producto || !fecha_venta || !cantidad || !unidades || !observaciones) {
    Swal.fire({
      title: 'Campos incompletos',
      text: 'Por favor, completa todos los campos antes de registrar la venta.',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido'
    });
    return;
  }

    Swal.fire({
      title: 'Verifica Datos',
      html: "<i>Seguro que quieres añadir la venta de <strong>"+nombre_producto+"</strong> ? </i>",
      icon: 'warning',
      showCancelButton: true,
        confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Registrar Venta'
    }).then((result) => {
      if (result.isConfirmed) {
     Axios.post("http://localhost:3001/registroVentas/registrar_Venta",{
     nombre_vendedor:nombre_vendedor,
     nombre_cliente:nombre_cliente,
     datos_cliente:datos_cliente,
     nombre_producto:nombre_producto,
     fecha_venta:fecha_venta,
     cantidad:cantidad,
     unidades:unidades,
     observaciones:observaciones
    }).then(()=>{
      getVentas();
     limpiarCampos();
     Swal.fire({
      title: "<strong>¡Venta Registrada Exitosamente!</strong>",
      html: "<i>Se agrego la venta de <strong>"+nombre_producto+"</strong> correctamente </i>",
      icon: 'success',
      timer:5000
    })
    });
         }
     });
   }

    // Funcion boton actualizar info ventas
  const actualizar = () =>{
    Axios.put("http://localhost:3001/registroVentas/actualizar_Venta",{
     id_venta:id_venta,
     nombre_vendedor:nombre_vendedor,
     nombre_cliente:nombre_cliente,
     datos_cliente:datos_cliente,
     nombre_producto:nombre_producto,
     fecha_venta:fecha_venta,
     cantidad:cantidad,
     unidades:unidades,
     observaciones:observaciones
    }).then(()=>{
      getVentas();
     limpiarCampos();
     Swal.fire({
      title: "<strong>¡Venta Editada!</strong>",
      html: "<i>Se edito la información de la venta de <strong>"+nombre_producto+"</strong> correctamente </i>",
      icon: 'success',
      timer:5000
    })
    });
   }

     // Funcion boton eliminar venta
  const eliminar = (val) =>{
    Swal.fire({
      title: 'Espera...',
      html: "<i>Seguro que quieres eliminar la venta de <strong>"+val.nombre_producto+"</strong> ? </i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar Venta'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/registroVentas/eliminar_Venta/${val.id_venta}`,
        ).then(()=>{
         getVentas();
         limpiarCampos();
         Swal.fire(
          'Venta Eliminada',
          val.nombre_producto+' Ha sido eliminado correctamente',
          'success'
        );
        }).catch(function(err){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido eliminar la venta!',
            footer: JSON.parse(JSON.stringify(err)).message==="Network Error"?"Error en el servidor":JSON.parse(JSON.stringify(err)).messag
          })
        });
       
      }
    });
   }


   // Funcion para limpiar campos

   const limpiarCampos = () =>{
    setNombre_Vendedor("");
    setNombre_Cliente("");
    setDatos_Cliente("");
    setNombre_Producto("");
    setFecha_Venta("");
    setCantidad("");
    setUnidades("");
    setObservaciones("");
    setEditar(false);
   }

   const editarVenta = (val)=>{
       setEditar(true);
       setNombre_Vendedor(val.nombre_vendedor);
       setNombre_Cliente(val.nombre_cliente);
       setDatos_Cliente(val.datos_cliente);
       setNombre_Producto(val.nombre_producto);
       setFecha_Venta(val.fecha_venta);
       setCantidad(val.cantidad);
       setUnidades(val.setUnidades);
       setObservaciones(val.observaciones);
       setId_Venta(val.id_venta);
   }
     
   //Obtener las ventas función
  const getVentas = () =>{
    Axios.get("http://localhost:3001/registroVentas/obtener_Venta")
    .then((response)=>{
     setVentas(response.data);
    })
    .catch(err => {
      console.log(err)
    });
   }

   useEffect(() => {
    getVentas();
}, []);

const [ventas_Buscar, setVentas_Buscar] = useState([]);
const [busqueda, setBusqueda] = useState('');


const handleChange = (e) => {
  const terminoBusqueda = e.target.value;
  setBusqueda(terminoBusqueda);

  if (terminoBusqueda) {
    const resultadosBusqueda = ventasList.filter((elemento) => {
      const nombre = elemento.nombre_vendedor.toString().toLowerCase();
      const nombrec = elemento.nombre_cliente.toString().toLowerCase();
      const nombrep = elemento.nombre_producto.toString().toLowerCase();

      return (
        nombre.includes(terminoBusqueda.toLowerCase()) ||
        nombrec.includes(terminoBusqueda.toLowerCase()) ||
        nombrep.includes(terminoBusqueda.toLowerCase())
      );      
    });

    setVentas_Buscar(resultadosBusqueda);
  }
};
    return (
        <div className="container">
           {isLoading ? (
        <LoadingVentas />
      ) : (
        <div>
          {/* Contenido principal de tu componente */}
          {/* ... */}
        </div>
      )}
        <div className="card text-center">
      <div className="card-header">
        <strong>REGISTRO DE NUEVAS VENTAS</strong>
      </div>

      <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Nombre Vendedor:</strong></span>
              <input type="text" 
               onChange={(event)=>{
               setNombre_Vendedor(event.target.value);
              }}
              className="form-control" value={nombre_vendedor} placeholder="Nombre Vendedor" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
       
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Nombre Cliente:</strong></span>
              <input type="text" 
              onChange={(event)=>{
              setNombre_Cliente(event.target.value);
              }}
              className="form-control" value={nombre_cliente} placeholder="Nombre Cliente" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Datos Cliente:</strong></span>
              <input type="text" 
              onChange={(event)=>{
              setDatos_Cliente(event.target.value);
              }}
              className="form-control" value={datos_cliente} placeholder="Datos Cliente (# Telefono, Correo)" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
           

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Nombre Producto:</strong></span>
              <input type="text   " 
              onChange={(event)=>{
              setNombre_Producto(event.target.value);
              }}
              className="form-control" value={nombre_producto} placeholder="Nombre Producto" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
          
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Fecha Venta:</strong></span>
              <input type="date" 
              onChange={(event)=>{
              setFecha_Venta(event.target.value);
              }}
              className="form-control" value={fecha_venta} placeholder="Fecha Venta" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Cantidad:</strong></span>
              <input type="number" 
              onChange={(event)=>{
              setCantidad(event.target.value);
              }}
              className="form-control" value={cantidad} placeholder="Cantidad" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Unidades:</strong></span>
              <input type="number" 
              onChange={(event)=>{
              setUnidades(event.target.value);
              }}
              className="form-control" value={unidades} placeholder="Unidades" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Observaciones:</strong></span>
              <input type="text" 
              onChange={(event)=>{
              setObservaciones(event.target.value);
              }}
              className="form-control" value={observaciones} placeholder="Observaciones" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

      </div>
        
      {editar ? 
        <div>
          <button className='btn btn-success justify-content-center m-2' onClick={actualizar}>Actualizar Información Ventas</button> 
          <button className='btn btn-danger justify-c:ontent-center m-2' onClick={limpiarCampos}>Cancelar</button>
        </div>
       :  <button className='btn btn-success' style={{ marginTop: '20px' }} onClick={add}>Registrar Nueva Venta</button>
      
        
       }
      <div className="containerInput d-flex mt-4">
            <input
              className="form-control inputBuscar"
              value={busqueda}
              placeholder="Búsqueda por Nombre Vendedor, Nombre Cliente o Nombre Producto"
              style={{ fontWeight: 'bold', '::placeholder': { color: 'red', border: '1px solid red', padding: '5px' } }}
              onChange={handleChange}
            />
            <button className="btn btn-success ml-2">
              <FontAwesomeIcon icon={faSearch} />
              <span className="iconText">Buscar</span>
            </button>
          </div>
    </div>
         <table className="table table-striped">
                <thead>
            <tr>
              <th scope="col"># ID</th>
              <th scope="col">Nombre Vendedor</th>
              <th scope="col">Nombre Cliente</th>
              <th scope="col">Datos Cliente</th>
              <th scope="col">Nombre Producto</th>
              <th scope="col">Fecha Venta</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Unidades</th>
              <th scope="col">Observaciones</th>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  onClick={previousPage}
                  disabled={currentPage === 1}
                  className="btn btn-secondary m-2"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={nextPage}
                  disabled={indexOfLastResult >= ventasList.length}
                  className="btn btn-secondary m-2"
                >
                  Siguiente
                </button>
              </div>
              <p>
              Ventas Totales: 
              <span style={{ textDecoration: 'underline', color: 'rgba(0, 0, 255, 0.8)' }}>{ventasList.length}</span>
            </p>
            </tr>
           
          </thead>

          <tbody>
                
          {
        // Listas todos los componentes de empleados
        busqueda ?
        ventas_Buscar.map((val,key)=>{
          return <tr key={val.id_venta}>
                    <th>{val.id_venta}</th>
                    <td>{val.nombre_vendedor}</td>
                    <td>{val.nombre_cliente}</td>
                    <td>{val.datos_cliente}</td>
                    <td>{val.nombre_producto}</td>
                    <td>{val.fecha_venta}</td>
                    <td>{val.cantidad}</td>      
                    <td>{val.unidades}</td>
                    <td>{val.observaciones}</td>
                    <td>
                          <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button"
                          onClick={()=>{
                            editarVenta(val);
                          }} className="btn btn-warning m-2">Editar</button>
                          <button type="button" onClick={()=>{
                            eliminar(val);
                          }} className="btn btn-danger m-2">Eliminar</button>
                        </div>
                    </td>
                  </tr>
        })
        :
        currentResults.map((val,key)=>{
          return <tr key={val.id_venta}>
          <th>{val.id_venta}</th>
          <td>{val.nombre_vendedor}</td>
          <td>{val.nombre_cliente}</td>
          <td>{val.datos_cliente}</td>
          <td>{val.nombre_producto}</td>
          <td>{val.fecha_venta}</td>
          <td>{val.cantidad}</td>      
          <td>{val.unidades}</td>
          <td>{val.observaciones}</td>
          <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button"
                onClick={()=>{
                  editarVenta(val);
                }} className="btn btn-warning m-2">Editar</button>
                <button type="button" onClick={()=>{
                  eliminar(val);
                }} className="btn btn-danger m-2">Eliminar</button>
              </div>
          </td>
        </tr>
              })
       }
       </tbody>
     </table>
     <footer style={{ backgroundColor: '#243A60', color: '#FFFFFF', width: '100%', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
      {/* Aquí puedes agregar el contenido del pie de página */}
      <p style={{ fontSize: '20px', margin: '0' }}>Derechos de Autor © {new Date().getFullYear()} LABORATORIOS FORGAMA S.A DE C.V. Todos los derechos reservados.</p>
      {/* Otros elementos del pie de página, como enlaces adicionales, pueden ir aquí */}
    </footer>
    </div>
    )
}

export default RegistroVentas;