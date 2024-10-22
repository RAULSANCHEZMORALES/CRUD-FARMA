import { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import LoadingTerminados from '../components/LoadingTerminados';


function ProductosTerminados() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulando un tiempo de carga (por ejemplo, 3 segundos)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
    // Variables a utilizar para registro empleados
  const [nombre_producto,setNombre_Producto] = useState("");
  const [estatus_producto,setEstatus_Producto] = useState("");
  const [lote,setLote] = useState("");
  const [fecha_caducidad,setFecha_Caducidad] = useState('');
  const [piezas,setPiezas] = useState("");
  const [codigo_producto_terminado,setCodigo_Producto_Terminado] = useState("");
  const [fecha_fabricacion,setFecha_Fabricacion] = useState("");
  const [observaciones,setObservaciones] = useState("");
  const [id_producto,setId_Producto] = useState("");

  const [nombreProductoValido, setNombreProductoValido] = useState(true);
  const [loteValido, setLoteValido] = useState(true);
  const [piezasValidas, setPiezasValidas] = useState(true);
  const [codigoProductoValido, setCodigoProductoValido] = useState(true);


  const [editar,setEditar] = useState(false);
  const [productos_Terminados_List,setProductos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(15);  

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = productos_Terminados_List.slice(indexOfFirstResult, indexOfLastResult);

  const nextPage = () => {
      setCurrentPage(currentPage + 1);
    };
    
  const previousPage = () => {
      setCurrentPage(currentPage - 1);
    };

// Función de validación para el campo "nombre_producto"
const validateNombreProducto = (value) => {
  const regex = /^[a-zA-Z0-9\s\-]+$/; // Se agregó el guion "-" al regex
  return regex.test(value);
};


  // Función de validación para el campo "lote"
  const validateLote = (value) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(value);
  };

// Función de validación para el campo "piezas"
const validatePiezas = (value) => {
  const parsedValue = parseInt(value);
  return !isNaN(parsedValue) && parsedValue >= 0;
};

  // Función de validación para el campo "codigo_producto_terminado"
  const validateCodigoProductoTerminado = (value) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(value);
  };
 
  //Funcion use effect, se ejecuta cuando inicia el programa
  useEffect(() => {
    getProductos_Terminados();
   },[])

   //Función de añadir nuevos productos terminados
  const add = (val) =>{
     // Validar campos aquí
  if (!nombre_producto || !estatus_producto || !lote || !fecha_caducidad || !piezas || !codigo_producto_terminado || !fecha_fabricacion || !observaciones) {
    Swal.fire({
      title: 'Campos incompletos',
      text: 'Por favor, completa todos los campos antes de registrar el producto terminado.',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido'
    });
    return;
  }

    Swal.fire({
      title: 'Verifica Datos',
      html: "<i>Seguro que quieres registrar el producto terminado <strong>"+nombre_producto+"</strong> ? </i>",
      icon: 'warning',
      showCancelButton: true,
        confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Registrar Producto'
    }).then((result) => {
      if (result.isConfirmed) {
     Axios.post("http://localhost:3001/productosTerminados/registrar_Producto_Terminado",{
     nombre_producto:nombre_producto,
     estatus_producto:estatus_producto,
     lote:lote,
     fecha_caducidad:fecha_caducidad,
     piezas:piezas,
     codigo_producto_terminado:codigo_producto_terminado,
     fecha_fabricacion:fecha_fabricacion,
     observaciones:observaciones
    }).then(()=>{
      getProductos_Terminados();
     limpiarCampos();
     Swal.fire({
      title: "<strong>¡Registro exitoso!</strong>",
      html: "<i>Se agrego el producto <strong>"+nombre_producto+"</strong> correctamente </i>",
      icon: 'success',
      timer:5000
    })
    });
         }
     });
   }

    // Funcion boton actualizar info producto terminado
  const actualizar = () =>{
    Axios.put("http://localhost:3001/productosTerminados/actualizar_Producto_Terminado",{
     id_producto:id_producto,
     nombre_producto:nombre_producto,
     estatus_producto:estatus_producto,
     lote:lote,
     fecha_caducidad:fecha_caducidad,
     piezas:piezas,
     codigo_producto_terminado:codigo_producto_terminado,
     fecha_fabricacion:fecha_fabricacion,
     observaciones:observaciones
    }).then(()=>{
      getProductos_Terminados();
     limpiarCampos();
     Swal.fire({
      title: "<strong>¡Registro editado!</strong>",
      html: "<i>Se edito la información del producto <strong>"+nombre_producto+"</strong> correctamente </i>",
      icon: 'success',
      timer:5000
    })
    });
   }

     // Funcion boton eliminar producto terminado
  const eliminar = (val) =>{
    Swal.fire({
      title: 'Espera...',
      html: "<i>Seguro que quieres eliminar el producto <strong>"+val.nombre_producto+"</strong> ? </i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar Producto'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/productosTerminados/eliminar_Producto_Terminado/${val.id_producto}`,
        ).then(()=>{
         getProductos_Terminados();
         limpiarCampos();
         Swal.fire(
          'Producto Terminado',
          val.nombre_producto+' Ha sido eliminado correctamente',
          'success'
        );
        }).catch(function(err){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido eliminar el producto!',
            footer: JSON.parse(JSON.stringify(err)).message==="Network Error"?"Error en el servidor":JSON.parse(JSON.stringify(err)).messag
          })
        });
       
      }
    });
   }


   // Funcion para limpiar campos

   const limpiarCampos = () =>{
    setNombre_Producto("");
    setEstatus_Producto("");
    setLote("");
    setFecha_Caducidad("");
    setPiezas("");
    setCodigo_Producto_Terminado("");
    setFecha_Fabricacion("");
    setObservaciones("");
    setEditar(false);
   }

   const editarProductos_Terminados = (val)=>{
       setEditar(true);
       setNombre_Producto(val.nombre_producto);
       setEstatus_Producto(val.estatus_producto);
       setLote(val.lote);
       setFecha_Caducidad(val.fecha_caducidad);
       setPiezas(val.piezas);
       setCodigo_Producto_Terminado(val.codigo_producto_terminado);
       setFecha_Fabricacion(val.fecha_fabricacion);
       setObservaciones(val.observaciones);
       setId_Producto(val.id_producto);   

   }
     
   //Obtener los productos terminados función
  const getProductos_Terminados = () =>{
    Axios.get("http://localhost:3001/productosTerminados/obtener_Producto_Terminado")
    .then((response)=>{
     setProductos(response.data);
    })
    .catch(err => {
      console.log(err)
    });
   }
   useEffect(() => {
    getProductos_Terminados();
}, []);

const [productos_Buscar, setProductos_Buscar] = useState([]);
const [busqueda, setBusqueda] = useState('');


const handleChange = (e) => {
  const terminoBusqueda = e.target.value;
  setBusqueda(terminoBusqueda);

  if (terminoBusqueda) {
    const resultadosBusqueda = productos_Terminados_List.filter((elemento) => {
      const nombre = elemento.nombre_producto.toString().toLowerCase();
      const lote = elemento.lote.toString().toLowerCase();
      const codigo = elemento.codigo_producto_terminado.toString().toLowerCase();
    
      return (
        nombre.includes(terminoBusqueda.toLowerCase()) ||
        lote.includes(terminoBusqueda.toLowerCase()) ||
        codigo.includes(terminoBusqueda.toLowerCase())
      );
    });

    setProductos_Buscar(resultadosBusqueda);
  }
};

    return (
      <div className="container">
        {isLoading ? (
        <LoadingTerminados />
      ) : (
        <div>
          {/* Contenido principal de tu componente */}
          {/* ... */}
        </div>
      )}
          <div className="card text-center">
            <div className="card-header">
            <strong>REGISTRO DE NUEVOS PRODUCTOS TERMINADOS</strong>
            </div>
            <div className="card-body">
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Nombre Producto:</strong></span>
              <input type="text" 
               onChange={(event)=>{
                const value = event.target.value;
                setNombreProductoValido(validateNombreProducto(value));
                setNombre_Producto(value);
              }}
              className={`form-control ${
                !nombreProductoValido ? "is-invalid" : ""
              }`} value={nombre_producto} placeholder="Nombre Producto" aria-label="Username" aria-describedby="basic-addon1"/>
              {!nombreProductoValido && (
          <div className="invalid-feedback">Ingrese solo letras y numeros.</div>
        )}
            </div>

                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#80AAF2" }}>
                    <strong>Estatus Producto:</strong>
                </span>
                <div className="d-flex align-items-center">
                <div className="form-check">
                    <input
                    type="checkbox"
                    className="form-check-input"
                    id="option1"
                    value={estatus_producto}
                    checked={estatus_producto === "Cuarentena"}
                    onChange={(event) => {
                        setEstatus_Producto(event.target.checked ? "Cuarentena" : "");
                    }}
                    />
                    <label className="form-check-label" htmlFor="option1" style={{ backgroundColor: estatus_producto === "Cuarentena" ? "rgba(255, 255, 0, 0.5)" : "" }}>
                    Cuarentena
                    </label>
                </div>
                <div className="form-check">
                    <input
                    type="checkbox"
                    className="form-check-input"
                    id="option2"
                    value={estatus_producto}
                    checked={estatus_producto === "Rechazado"}
                    onChange={(event) => {
                        setEstatus_Producto(event.target.checked ? "Rechazado" : "");
                    }}
                    />
                    <label className="form-check-label" htmlFor="option2" style={{ backgroundColor: estatus_producto === "Rechazado" ? "rgba(255, 0, 0, 0.5)" : "" }}>
                    Rechazado
                    </label>
                </div>
                <div className="form-check">
                    <input
                    type="checkbox"
                    className="form-check-input"
                    id="option3"
                    value={estatus_producto}
                    checked={estatus_producto === "Aprobado"}
                    onChange={(event) => {
                        setEstatus_Producto(event.target.checked ? "Aprobado" : "");
                    }}
                    />
                    <label className="form-check-label" htmlFor="option3" style={{ backgroundColor: estatus_producto === "Aprobado" ? "rgba(0, 255, 0, 0.5)" : "" }}>
                    Aprobado
                    </label>
                </div>
                </div>
                </div>

        
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Lote:</strong></span>
              <input type="text" 
              onChange={(event)=>{
                const value = event.target.value;
                setLoteValido(validateLote(value));
                setLote(value);
              }}
              className={`form-control ${!loteValido ? "is-invalid" : ""}`} value={lote} placeholder="Lote" aria-label="Username" aria-describedby="basic-addon1"/>
              {!loteValido && (
          <div className="invalid-feedback">Ingrese solo letras y números.</div>
        )}
            </div>
          

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Fecha Caducidad:</strong></span>
              <input type="date" 
              onChange={(event)=>{
              setFecha_Caducidad(event.target.value);
              }}
              className="form-control" value={fecha_caducidad} placeholder="Fecha Caducidad" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Piezas:</strong></span>
              <input type="number" 
              onChange={(event)=>{
                const value = event.target.value;
                setPiezasValidas(validatePiezas(value));
                setPiezas(value);
              }}
              className={`form-control ${!piezasValidas ? "is-invalid" : ""}`} value={piezas} placeholder="Piezas" aria-label="Username" aria-describedby="basic-addon1"/>
               {!piezasValidas && (
          <div className="invalid-feedback">
            Ingrese solo números positivos
          </div>
               )}
            </div>

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Codigo Producto Terminado:</strong></span>
              <input type="text" 
              onChange={(event)=>{
                const value = event.target.value;
                setCodigoProductoValido(validateCodigoProductoTerminado(value));
                setCodigo_Producto_Terminado(value);
              }}
              className={`form-control ${
                !codigoProductoValido ? "is-invalid" : ""
              }`}
                  value={codigo_producto_terminado} placeholder="Codigo Producto Terminado " aria-label="Username" aria-describedby="basic-addon1"/>
          {!codigoProductoValido && (
          <div className="invalid-feedback">
            Ingrese solo letras y números.
          </div>
        )}
      </div>
      

        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Fecha Fabricacion:</strong></span>
              <input type="date" 
              onChange={(event)=>{ 
                setFecha_Fabricacion(event.target.value);
              }}
              className="form-control" value={fecha_fabricacion} placeholder="Fecha Fabricacion" aria-label="Username" aria-describedby="basic-addon1"/>
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
          <button className='btn btn-success justify-content-center m-2' onClick={actualizar}>Actualizar Información Producto Terminado</button> 
          <button className='btn btn-danger justify-c:ontent-center m-2' onClick={limpiarCampos}>Cancelar</button>
        </div>
       :  <button className='btn btn-success' style={{ marginTop: '20px' }} onClick={add}>Registrar Producto Terminado</button>
      
        
       }
      


      <div className="containerInput d-flex mt-4">
            <input
              className="form-control inputBuscar"
              value={busqueda}
              placeholder="Búsqueda por Nombre Insumo o Fabricante"
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
              <th scope="col">Nombre Producto</th>
              <th scope="col">Estatus Producto</th>
              <th scope="col">Lote Producto</th>
              <th scope="col">Fecha Caducidad</th>
              <th scope="col">Piezas</th>
              <th scope="col">Codigo Producto Terminado</th>
              <th scope="col">Fecha Fabricacion</th>
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
                  disabled={indexOfLastResult >= productos_Terminados_List.length}
                  className="btn btn-secondary m-2"
                >
                  Siguiente
                </button>
              </div>
              <p>
              Productos Terminados Totales: 
              <span style={{ textDecoration: 'underline', color: 'rgba(0, 0, 255, 0.8)' }}>{productos_Terminados_List.length}</span>
            </p>
            </tr>
        
          </thead>

          <tbody>
                
          {
        // Listas todos los componentes de empleados
        busqueda ?
        productos_Buscar.map((val,key)=>{
          return <tr key={val.id_producto}>
                    <th>{val.id_producto}</th>
                    <td>{val.nombre_producto}</td>
                    <td style={{ backgroundColor: val.estatus_producto === "Rechazado" ? "rgba(255, 0, 0, 0.5)" : val.estatus_producto === "Aprobado" ? "rgba(0, 255, 0, 0.5)" : val.estatus_producto === "Cuarentena" ? "rgba(255, 255, 0, 0.5)" : "" }}>  {val.estatus_producto} </td>
                    <td>{val.lote}</td>
                    <td>{val.fecha_caducidad}</td>
                    <td>{val.piezas}</td>
                    <td>{val.codigo_producto_terminado}</td>
                    <td>{val.fecha_fabricacion}</td>
                    <td>{val.observaciones}</td>
                    <td>
                          <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button"
                          onClick={()=>{
                            editarProductos_Terminados(val);
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
          return <tr key={val.id_producto}>
          <th>{val.id_producto}</th>
          <td>{val.nombre_producto}</td>
          <td style={{ backgroundColor: val.estatus_producto === "Rechazado" ? "rgba(255, 0, 0, 0.5)" : val.estatus_producto === "Aprobado" ? "rgba(0, 255, 0, 0.5)" : val.estatus_producto === "Cuarentena" ? "rgba(255, 255, 0, 0.5)" : "" }}>  {val.estatus_producto} </td>
          <td>{val.lote}</td>
          <td>{val.fecha_caducidad}</td>
          <td>{val.piezas}</td>
          <td>{val.codigo_producto_terminado}</td>
          <td>{val.fecha_fabricacion}</td>
          <td>{val.observaciones}</td>
          <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button"
                onClick={()=>{
                  editarProductos_Terminados(val);
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

export default ProductosTerminados;