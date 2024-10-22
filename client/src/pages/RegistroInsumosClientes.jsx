import { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import LoadingClientes from '../components/LoadingClientes';
import "../components/styles.css";
import "../App.css";



function RegistroInsumos() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulando un tiempo de carga (por ejemplo, 3 segundos)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
     // Variables a utilizar para registro de insumos clientes
  const [id_insumos,setId_Insumos] = useState("");
  const [nombre_cliente,setNombre_Cliente] = useState("");
  const [nombre_insumos,setNombre_Insumos] = useState("");
  const [unidad_medicion,setUnidad_Medicion] = useState("");
  const [fabricante,setFabricante] = useState("");
  const [distribuidora,setDistribuidora] = useState("");
  const [lote,setLote] = useState("");
  const [tabla_insumo,setTabla_Insumo] = useState("");
  const [fecha_ingreso,setFecha_Ingreso] = useState("");
  const [fecha_caducidad, setFecha_Caducidad] = useState("");
  const [no_Aplica_Fabricante, setNo_Aplica_Fabricante] = useState(false);
  const [no_Aplica_Lote, setNo_Aplica_Lote] = useState(false);
  const [no_Aplica_Fecha, setNo_Aplica_Fecha] = useState(false);
  const [no_Aplica_Distribuidora, setNo_Aplica_Distribuidora] = useState(false);
  const [num_piezas,setNum_Piezas] = useState("");
  const [cantidad_unidad,setCantidad_Unidad] = useState("");
  const [total,setTotal] = useState("");
  const [codigo_insumo,setCodigo_Insumo] = useState("");
  const [codigo_categoria,setCodigo_Categoria] = useState(false);
  const [codigo_estatus,setCodigo_Estatus] = useState('');
  const [codigo_final,setCodigo_Final] = useState("");
  const [observaciones,setObservaciones] = useState("");
  const [editar,setEditar] = useState(false);
 
  const [insumosList,setInsumos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(15);  

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = insumosList.slice(indexOfFirstResult, indexOfLastResult);

  const nextPage = () => {
      setCurrentPage(currentPage + 1);
    };
    
  const previousPage = () => {
      setCurrentPage(currentPage - 1);
    };


  //Funcion use effect, se ejecuta cuando inicia el programa
  useEffect(() => {
    getInsumos();
   },[])

   //Función de añadir nuevos insumos clientes
  const add = (val) =>{

     // Validar campos aquí
  if (!nombre_cliente || !nombre_insumos || !unidad_medicion || !fabricante || !distribuidora || !lote || !tabla_insumo || !fecha_ingreso || !fecha_caducidad || !num_piezas || !cantidad_unidad || !total || !codigo_insumo || !codigo_categoria || !codigo_estatus || !observaciones) {
    Swal.fire({
      title: 'Campos incompletos',
      text: 'Por favor, completa todos los campos antes de registrar el insumo del cliente.',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido'
    });
    return;
  }
  
    // Conversion de unidades para el registro de insumo clientes
    let unidadTotalEnGramos = parseFloat(total);

    switch(unidad_medicion) {
      case 'Gramos' :
        unidadTotalEnGramos *= 1;
        break;
       case 'Kilogramos':
        unidadTotalEnGramos *= 1000;  
        break;
       case 'Mililitros':
        unidadTotalEnGramos *= 1;
        break;
        case 'Piezas':
        unidadTotalEnGramos *= 1;
        break; 
     }

    console.log(unidadTotalEnGramos)

      const codigoCategoriaMapping = {
      'Materia Prima': '01',
      'Material Envase Empaque': '02',
    };

    const codigoCategoria = codigoCategoriaMapping[codigo_categoria] || '';
    const codigoFinalValue = codigoCategoria + lote + codigo_insumo;
    setCodigo_Final(codigoFinalValue);

    Swal.fire({
      title: 'Verifica Datos',
      html: "<i>Seguro que quieres registrar al insumo <strong>"+nombre_insumos+"</strong> del cliente <strong>"+nombre_cliente+"</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Registrar Insumo'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("http://localhost:3001/insumosClientes/registrar_Insumos_Clientes",{
          id_insumos:id_insumos,
          nombre_cliente:nombre_cliente,
          nombre_insumos:nombre_insumos,
          unidad_medicion:unidad_medicion,
          fabricante:fabricante,
          distribuidora:distribuidora,
          lote:lote,
          tabla_insumo:tabla_insumo,
          fecha_ingreso:fecha_ingreso,
          fecha_caducidad:fecha_caducidad,
          num_piezas:num_piezas,
          cantidad_unidad:cantidad_unidad,
          total:unidadTotalEnGramos,
          codigo_insumo:codigo_insumo,
          codigo_categoria:codigo_categoria,
          codigo_estatus:codigo_estatus,
          codigo_final:codigoFinalValue,
          observaciones:observaciones
        }).then(()=>{
          getInsumos();
          limpiarCampos();
          Swal.fire({
            title: "<strong>¡Registro exitoso!</strong>",
            html: "<i>Se agrego el insumo <strong>"+nombre_insumos+"</strong> correctamente </i>",
            icon: 'success',
            timer:5000
        })
    });
         }
     });
  }

  // Funcion boton actualizar informacion insumos
  const actualizar = () =>{
     // Conversion de unidades para el registro de insumo
     let unidadTotalEnGramos = parseFloat(total);

     switch(unidad_medicion) {
      case 'Gramos' :
        unidadTotalEnGramos *= 1;
        break;
       case 'Kilogramos':
        unidadTotalEnGramos *= 1000;  
        break;
       case 'Mililitros':
        unidadTotalEnGramos *= 1;
        break;
        case 'Piezas':
        unidadTotalEnGramos *= 1;
        break; 
     }
 
     console.log(unidadTotalEnGramos)

    const codigoCategoriaMapping = {
      'Materia Prima': '01',
      'Material Envase Empaque': '02',
    };

    const codigoCategoria = codigoCategoriaMapping[codigo_categoria] || '';
    const codigoFinalValue = codigoCategoria + lote + codigo_insumo;
    setCodigo_Final(codigoFinalValue);
    Axios.put("http://localhost:3001/insumosClientes/actualizar_Insumos_Clientes",{
     id_insumos:id_insumos,
     nombre_cliente:nombre_cliente,
     nombre_insumos:nombre_insumos,
     unidad_medicion:unidad_medicion,
     fabricante:fabricante,
     distribuidora:distribuidora,
     lote:lote,
     tabla_insumo:tabla_insumo,
     fecha_ingreso:fecha_ingreso,
     fecha_caducidad:fecha_caducidad,
     num_piezas:num_piezas,
     cantidad_unidad:cantidad_unidad,
     total:unidadTotalEnGramos,
     codigo_insumo:codigo_insumo,
     codigo_categoria:codigo_categoria,
     codigo_estatus:codigo_estatus,
     codigo_final:codigoFinalValue,
     observaciones:observaciones
    }).then(()=>{
      getInsumos();
     limpiarCampos();
     Swal.fire({
      title: "<strong>¡Registro editado!</strong>",
      html: "<i>Se edito la información del insumo <strong>"+nombre_insumos+"</strong> correctamente </i>",
      icon: 'success',
      timer:5000
    })
    });
   }

     // Funcion boton eliminar insumo
  const eliminar = (val) =>{
    Swal.fire({
      title: 'Espera...',
      html: "<i>Seguro que quieres eliminar el insumo <strong>"+val.nombre_insumos+"</strong> ? </i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar insumo'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/insumosClientes/eliminar_Insumos_Clientes/${val.id_insumos}`,
        ).then(()=>{
         getInsumos();
         limpiarCampos();
         Swal.fire(
          'Insumo Eliminado',
          val.nombre_insumos+' se ha borrado correctamente!',
          'success'
        );
        }).catch(function(err){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido eliminar el insumo!',
            footer: JSON.parse(JSON.stringify(err)).message==="Network Error"?"Error en el servidor":JSON.parse(JSON.stringify(err)).messag
          })
        });
       
      }
    });
   }


   // Funcion para limpiar campos Insumos

   const limpiarCampos = () =>{
    setId_Insumos("");

    setNombre_Cliente("");
    setNombre_Insumos("");
    setUnidad_Medicion("");
    setFabricante("");
    setDistribuidora("");
    setLote("");
    setTabla_Insumo("");
    setFecha_Ingreso("");
    setFecha_Caducidad("");
    setNum_Piezas("");
    setCantidad_Unidad("");
    setTotal("");
    setCodigo_Insumo("");
    setCodigo_Categoria("");
    setCodigo_Estatus("");
    setCodigo_Final("");
    setObservaciones("");
    setEditar(false);

   }

   const editarInsumos = (val)=>{
       setEditar(true);

       setNombre_Cliente(val.nombre_cliente);
       setNombre_Insumos(val.nombre_insumos);
       setUnidad_Medicion(val.unidad_medicion);
       setFabricante(val.fabricante);
       setDistribuidora(val.distribuidora);
       setLote(val.lote);
       setTabla_Insumo(val.tabla_insumo);
       setFecha_Ingreso(val.fecha_ingreso);
       setFecha_Caducidad(val.fecha_caducidad);
       setNum_Piezas(val.num_piezas);
       setCantidad_Unidad(val.cantidad_unidad);
       setTotal(val.total);
       setCodigo_Insumo(val.codigo_insumo);
       setCodigo_Categoria(val.codigo_categoria);
       setCodigo_Estatus(val.codigo_estatus);
       setCodigo_Final(val.codigo_final);
       setObservaciones(val.observaciones);
       setId_Insumos(val.id_insumos);
       

   }
     
   //Obtener los insumos función
  const getInsumos = () =>{
    Axios.get("http://localhost:3001/insumosClientes/obtener_Insumos_Clientes")
    .then((response)=>{
     setInsumos(response.data);
    })
    .catch(err => {
      console.log(err)
    });
   }
 
   useEffect(() => {
    getInsumos();
}, []);

const [insumos_Buscar, setInsumos_Buscar] = useState([]);
const [busqueda, setBusqueda] = useState('');


const handleChange = (e) => {
  const terminoBusqueda = e.target.value;
  setBusqueda(terminoBusqueda);

  if (terminoBusqueda) {
    const resultadosBusqueda = insumosList.filter((elemento) => {
      const nombre = elemento.nombre_insumos.toString().toLowerCase();
      const nombre_cliente = elemento.nombre_cliente.toString().toLowerCase();
      const fabricante = elemento.fabricante.toString().toLowerCase();
      const distribuidora = elemento.distribuidora.toString().toLowerCase();
      const lote = elemento.lote.toString().toLowerCase();
      const codigoFinal = elemento.codigo_final.toString().toLowerCase();

      return (
        nombre.includes(terminoBusqueda.toLowerCase()) ||
        nombre_cliente.includes(terminoBusqueda.toLowerCase()) ||
        fabricante.includes(terminoBusqueda.toLowerCase()) ||
        distribuidora.includes(terminoBusqueda.toLowerCase()) ||
        lote.includes(terminoBusqueda.toLowerCase()) ||
        codigoFinal.includes(terminoBusqueda.toLowerCase())
      );
    });

    setInsumos_Buscar(resultadosBusqueda);
  }
};

  return (
  <div className="container">
     {isLoading ? (
        <LoadingClientes />
      ) : (
        <div>
          {/* Contenido principal de tu componente */}
          {/* ... */}
        </div>
      )}
  <div className="row">
    <div className="col-md-6">
      <div className="card text-center">
        <div className="card-header">
        <strong>REGISTRO DE NUEVOS INSUMOS DE CLIENTES</strong>
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Nombre Cliente:</strong></span>
            <input
              type="text"
              onChange={(event) => {
                setNombre_Cliente(event.target.value);
              }}
              className="form-control"
              value={nombre_cliente}
              placeholder="Nombre Cliente"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Nombre Insumo:</strong></span>
            <input
              type="text"
              onChange={(event) => {
                setNombre_Insumos(event.target.value);
              }}
              className="form-control"
              value={nombre_insumos}
              placeholder="Ingresa el nombre del insumo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        
          <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#80AAF2" }}>
    <strong>Unidad Medicion:</strong>
  </span>
  <div className="d-flex align-items-center">
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id="option1"
        value={unidad_medicion}
        checked={unidad_medicion === "Gramos"}
        onChange={(event) => {
          setUnidad_Medicion(event.target.checked ? "Gramos" : "");
        }}
      />
      <label className="form-check-label" htmlFor="option1">
        Gramos
      </label>
    </div>

    <div className="form-check ml-3">
      <input
        type="checkbox"
        className="form-check-input"
        id="option2"
        value={unidad_medicion}
        checked={unidad_medicion === "Kilogramos"}
        onChange={(event) => {
          setUnidad_Medicion(event.target.checked ? "Kilogramos" : "");
        }}
      />
      <label className="form-check-label" htmlFor="option2">
        Kilogramos
      </label>
    </div>

    <div className="form-check ml-3">
      <input
        type="checkbox"
        className="form-check-input"
        id="option3"
        value={unidad_medicion}
        checked={unidad_medicion === "Mililitros"}
        onChange={(event) => {
          setUnidad_Medicion(event.target.checked ? "Mililitros" : "");
        }}
      />
      <label className="form-check-label" htmlFor="option3">
        Mililitros
      </label>
    </div>

    <div className="form-check ml-3">
      <input
        type="checkbox"
        className="form-check-input"
        id="option4"
        value={unidad_medicion}
        checked={unidad_medicion === "Piezas"}
        onChange={(event) => {
          setUnidad_Medicion(event.target.checked ? "Piezas" : "");
        }}
      />
      <label className="form-check-label" htmlFor="option4">
        Piezas
      </label>
    </div>
  </div>
</div>

          <div className="input-group mb-3">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: '#80AAF2' }}
      >
        <strong>Fabricante:</strong>
      </span>
      <div className="input-group-prepend">
        <div className="input-group-text">
          <input
            type="checkbox"
            onChange={(event) => {
              const isChecked = event.target.checked;
              setNo_Aplica_Fabricante(isChecked);
              setFabricante(isChecked ? "Sin datos" : "");
            }}
            aria-label="Checkbox for no expiry date"
          />
          <span style={{ marginLeft: '5px' }}>Sin Datos</span>
        </div>
      </div>
      <input
        type="text"
        onChange={(event) => {
          setFabricante(event.target.value);
        }}
        className="form-control date-input"
        value={fabricante}
        placeholder="Fabricante"
        aria-label="Fabricante"
        aria-describedby="basic-addon1"
        style={{ borderRadius: '10px', border: '1px solid #ccc' }}
        disabled={no_Aplica_Fabricante}
      />
    </div>

          <div className="input-group mb-3">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: '#80AAF2' }}
      >
        <strong>Distribuidora:</strong>
      </span>
      <div className="input-group-prepend">
        <div className="input-group-text">
          <input
            type="checkbox"
            onChange={(event) => {
              const isChecked = event.target.checked;
              setNo_Aplica_Distribuidora(isChecked);
              setDistribuidora(isChecked ? "Si Datos" : "");
            }}
            aria-label="Checkbox for no expiry date"
          />
          <span style={{ marginLeft: '5px' }}>Sin Datos</span>
        </div>
      </div>
      <input
        type="text"
        onChange={(event) => {
          setDistribuidora(event.target.value);
        }}
        className="form-control date-input"
        value={distribuidora}
        placeholder="Distribuidora"
        aria-label="Distribuidora"
        aria-describedby="basic-addon1"
        style={{ borderRadius: '10px', border: '1px solid #ccc' }}
        disabled={no_Aplica_Distribuidora}
      />
    </div>
          
         
          <div className="input-group mb-3">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: '#80AAF2' }}
      >
        <strong>Lote:</strong>
      </span>
      <div className="input-group-prepend">
        <div className="input-group-text">
          <input
            type="checkbox"
            onChange={(event) => {
              const isChecked = event.target.checked;
              setNo_Aplica_Lote(isChecked);
              setLote(isChecked ? 'Sin Datos' : 'Sin Datos');
            }}
            aria-label="Checkbox for no apply"
          />
          <span style={{ marginLeft: '5px' }}>Sin Datos</span>
        </div>
      </div>
      <input
        type="text"
        onChange={(event) => {
          setLote(event.target.value);
        }}
        className="form-control date-input" 
        value={lote}
        placeholder="Lote"
        aria-label="Lote"
        aria-describedby="basic-addon1"
        style={{ borderRadius: '10px', border: '1px solid #ccc' }}
        disabled={no_Aplica_Lote}
      />
    </div>
    <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#80AAF2" }}>
    <strong>Tabla Insumo:</strong>
  </span>
  <div className="d-flex align-items-center">
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id="tabla-insumo"
        value={tabla_insumo}
        checked={tabla_insumo === "insumos_clientes"}
        onChange={(event) => {
          setTabla_Insumo(event.target.checked ? "insumos_clientes" : "");
        }}
      />
      <label
        className="form-check-label"
        htmlFor="tabla-insumo"
        style={{ backgroundColor: tabla_insumo === "insumos_clientes" ? "rgba(255, 255, 0, 1)" : "" }}
      >
        Insumos Clientes
      </label>
    </div>
    </div>
   </div> 

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Fecha Ingreso:</strong></span>
            <input
              type="date"
              onChange={(event) => {
                setFecha_Ingreso(event.target.value);
              }}
              className="form-control date-input"
              value={fecha_ingreso}
              placeholder="Fecha Ingreso"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ borderRadius: '10px', border: '1px solid #ccc' }}
            />
          </div> 

          <div className="input-group mb-3">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: '#80AAF2' }}
      >
        <strong>Fecha Caducidad:</strong>
      </span>
      <div className="input-group-prepend">
        <div className="input-group-text">
          <input
            type="checkbox"
            onChange={(event) => {
              const isChecked = event.target.checked;
              setNo_Aplica_Fecha(isChecked);
              setFecha_Caducidad(isChecked ? "No Expira" : "No Expira");
            }}
            aria-label="Checkbox for no expiry date"
          />
          <span style={{ marginLeft: '5px' }}>No Expira</span>
        </div>
      </div>
      <input
        type="date"
        onChange={(event) => {
          setFecha_Caducidad(event.target.value);
        }}
        className="form-control date-input"
        value={fecha_caducidad}
        placeholder="No Expira"
        aria-label="No Expira"
        aria-describedby="basic-addon1"
        style={{ borderRadius: '10px', border: '1px solid #ccc' }}
        disabled={no_Aplica_Fecha}
      />
    </div>
        </div>
      </div>
    </div>

    <div className="col-md-6">
      <div className="card text-center">
        <div className="card-header">
        <strong>REGISTRO DE NUEVOS INSUMOS DE CLIENTES</strong>
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Numero # Piezas:</strong></span>
            <input
              type="number"
              onChange={(event) => {
                setNum_Piezas(event.target.value);
              }}
              onBlur={(e) => {
                if(cantidad_unidad !== "") {
                  const num_piezas_entero = parseFloat(num_piezas);
                  const cantidad_unidad_entero = parseFloat(cantidad_unidad);

                  let multiplicacion = num_piezas_entero * cantidad_unidad_entero;

                  setTotal(multiplicacion.toString())
                } 
              }}
              className="form-control"
              value={num_piezas}
              placeholder="Numero de Piezas"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Cantidad X Unidad:</strong></span>
            <input
              type="number"
              onChange={(event) => {
                setCantidad_Unidad(event.target.value);

              }}
              onBlur={(e) => {
                if(num_piezas !== "") {
                  const num_piezas_entero = parseFloat(num_piezas);
                  const cantidad_unidad_entero = parseFloat(cantidad_unidad);

                  let multiplicacion = num_piezas_entero * cantidad_unidad_entero;

                  setTotal(multiplicacion.toString())
                } 
              }}
              className="form-control"
              value={cantidad_unidad}
              placeholder="Cantidad X Unidad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Total:</strong></span>
            <input
              type="number"
              onChange={(event) => {
                setTotal(event.target.value);
              }}
              className="form-control"
              value={total}
              disabled
              placeholder="Total"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Codigo Insumo:</strong></span>
            <input
              type="number"
              onChange={(event) => {
                setCodigo_Insumo(event.target.value);
              }}
              className="form-control"
              value={codigo_insumo}
              placeholder="Codigo Insumo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#80AAF2" }}>
    <strong>Codigo Categoria:</strong>
  </span>
  <div className="d-flex align-items-center">
    <div className="check-container d-flex justify-content-center">
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input custom-checkbox"
          id="codigo-1"
          value={codigo_categoria}
          checked={codigo_categoria === "Materia Prima"}
          onChange={(event) => {
            setCodigo_Categoria(event.target.checked ? "Materia Prima" : "");
          }}
          style={{ transform: codigo_categoria === "Materia Prima" ? "scale(1.2)" : "none", border: "2px solid #80AAF2" }}
        />
        <label className="form-check-label" htmlFor="codigo-1" title="Materia Prima: 01">
          Codigo 01
        </label>
      </div>
      <div className="form-check ml-5">
        <input
          type="checkbox"
          className="form-check-input custom-checkbox"
          id="codigo-2"
          value={codigo_categoria}
          checked={codigo_categoria === "Material Envase Empaque"}
          onChange={(event) => {
            setCodigo_Categoria(event.target.checked ? "Material Envase Empaque" : "");
          }}
          style={{ transform: codigo_categoria === "Material Envase Empaque" ? "scale(1.2)" : "none", border: "2px solid #80AAF2" }}
        />
        <label className="form-check-label" htmlFor="codigo-2" title="Material Envase Empaque: 02">
          Codigo 02
        </label>
      </div>
    </div>
  </div>
</div>



<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#80AAF2" }}>
    <strong>Codigo Estatus:</strong>
  </span>
  <div className="d-flex align-items-center">
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id="estatus-1"
        value={codigo_estatus}
        checked={codigo_estatus === "Cuarentena"}
        onChange={(event) => {
          setCodigo_Estatus(event.target.checked ? "Cuarentena" : "");
        }}
      />
      <label
        className="form-check-label"
        htmlFor="estatus-1"
        style={{ backgroundColor: codigo_estatus === "Cuarentena" ? "rgba(255, 255, 0, 0.5)" : "" }}
      >
        Cuarentena
      </label>
    </div>
    <div className="form-check ml-3">
      <input
        type="checkbox"
        className="form-check-input"
        id="estatus-2"
        value={codigo_estatus}
        checked={codigo_estatus === "Rechazado"}
        onChange={(event) => {
          setCodigo_Estatus(event.target.checked ? "Rechazado" : "");
        }}
      />
      <label
        className="form-check-label"
        htmlFor="estatus-2"
        style={{ backgroundColor: codigo_estatus === "Rechazado" ? "rgba(255, 0, 0, 0.5)" : "" }}
      >
        Rechazado
      </label>
    </div>
    <div className="form-check ml-3">
      <input
        type="checkbox"
        className="form-check-input"
        id="estatus-3"
        value={codigo_estatus}
        checked={codigo_estatus === "Aprobado"}
        onChange={(event) => {
          setCodigo_Estatus(event.target.checked ? "Aprobado" : "");
        }}
      />
      <label
        className="form-check-label"
        htmlFor="estatus-3"
        style={{ backgroundColor: codigo_estatus === "Aprobado" ? "rgba(0, 255, 0, 0.5)" : "" }}
      >
        Aprobado
      </label>
    </div>
  </div>
</div>


            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#80AAF2" }}>
                <strong>Codigo Final:</strong>
              </span>
              <input
                type="text"
                onChange={(event) => {
                  setCodigo_Final(event.target.value);
                }}
                className="form-control"
                value={codigo_final}
                disabled
                placeholder="Codigo Final"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              </div>

              <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Observaciones:</strong></span>
            <input
              type="text"
              onChange={(event) => {
                setObservaciones(event.target.value);
              }}
              className="form-control"
              value={observaciones}
              placeholder="Observaciones"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
             </div>            
            </div>
           </div>
          
      {editar ? 
        <div>
          <button className='btn btn-success justify-content-center m-2' onClick={actualizar}>Actualizar Información Insumo</button> 
          <button className='btn btn-danger justify-c:ontent-center m-2' onClick={limpiarCampos}>Cancelar</button>
        </div>
       :  <button className='btn btn-success' style={{ marginTop: '20px' }} onClick={add}>Registrar Nuevo Insumo Cliente</button>
      
        
       }
      
              <div className="containerInput d-flex mt-4">
            <input
              className="form-control inputBuscar"
              value={busqueda}
              placeholder="Búsqueda por Nombre Insumo , Nombre Cliente , Fabricante , Distribuidora , Lote O Codigo FInal"
              style={{ fontWeight: 'bold', '::placeholder': { color: 'red', border: '1px solid red', padding: '5px' } }}
              onChange={handleChange}
            />
            <button className="btn btn-success ml-2">
              <FontAwesomeIcon icon={faSearch} />
              <span className="iconText">Buscar</span>
            </button>
          </div>

   </div>
          <table className="table table-striped custom-table mt-3" style={{border: "2px solid black", margin: "10px 0", backgroundColor: "white", width: "calc(100% - 20px)", marginLeft: "-100px"}}>
          <thead>
            <tr>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}># ID</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Nombre Cliente</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Nombre Insumos</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Fabricante</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Distribuidora</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Lote</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Tabla Insumo</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Fecha Ingreso</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Fecha Caducidad</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Numero Piezas</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Cantidad X Unidad</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Total En Gramos O Piezas</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Codigo Insumo</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Codigo Categoria</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Codigo Estatus</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Codigo Final</th>
              <th scope="col" style={{textAlign: "left", padding: "2px"}}>Observaciones</th>
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
                  disabled={indexOfLastResult >= insumosList.length}
                  className="btn btn-secondary m-2"
                >
                  Siguiente
                </button>
              </div>
              <p>
              Insumos Totales Clientes: 
              <span style={{ textDecoration: 'underline', color: 'rgba(0, 0, 255, 0.8)' }}>{insumosList.length}</span>
            </p>
            </tr>
          </thead>
          <tbody>    
          {
        // Listas todos los componentes de insumos clientes
            busqueda ?
            insumos_Buscar.map((val,key)=>{
                return <tr key={val.id_insumos}>
                            <th>{val.id_insumos}</th>
                            <td>{val.nombre_cliente}</td>
                            <td>{val.nombre_insumos}</td>
                            <td>{val.fabricante === "Sin Datos" ? ( <span>Sin Datos</span> ) : (val.fabricante)}</td>
                            <td>{val.distribuidora === "Sin Datos" ? ( <span>Sin Datos</span> ) : (val.distribuidora)}</td>
                            <td>{val.lote === "Sin Datos" ? ( <span>Sin Datos</span> ) : (val.lote)}</td>
                            <td>{val.tabla_insumo}</td>
                            <td>{val.fecha_ingreso}</td>
                            <td>{val.fecha_caducidad === "No Expira" ? ( <span>No Expira</span> ) : (val.fecha_caducidad)}</td>
                            <td>{val.num_piezas}</td>
                            <td>{val.cantidad_unidad}<span>gr</span></td>
                            <td>{val.total}<span>gr/piezas</span></td>
                            <td>{val.codigo_insumo}</td>
                            <td>{val.codigo_categoria}</td>
                            <td style={{ backgroundColor: val.codigo_estatus === "Rechazado" ? "rgba(255, 0, 0, 0.5)" : val.codigo_estatus === "Aprobado" ? "rgba(0, 255, 0, 0.5)" : val.codigo_estatus === "Cuarentena" ? "rgba(255, 255, 0, 0.5)" : "" }}>  {val.codigo_estatus} </td>
                            <td>{val.codigo_final}</td>
                            <td>{val.observaciones}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button"
                                onClick={()=>{
                                    editarInsumos(val);
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
            return <tr key={val.id_insumos}>
                        <th>{val.id_insumos}</th>
                        <td>{val.nombre_cliente}</td>
                        <td>{val.nombre_insumos}</td>
                        <td>{val.fabricante === "Sin Datos" ? ( <span>Sin Datos</span> ) : (val.fabricante)}</td>
                        <td>{val.distribuidora === "Sin Datos" ? ( <span>Sin Datos</span> ) : (val.distribuidora)}</td>
                        <td>{val.lote === "Sin Datos" ? ( <span>Sin Datos</span> ) : (val.lote)}</td>
                        <td>{val.tabla_insumo}</td>
                        <td>{val.fecha_ingreso}</td>
                        <td>{val.fecha_caducidad === "No Expira" ? ( <span>No Expira</span> ) : (val.fecha_caducidad)}</td>
                        <td>{val.num_piezas}</td>
                        <td>{val.cantidad_unidad}<span>gr</span></td>
                        <td>{val.total}<span>gr/piezas</span></td>
                        <td>{val.codigo_insumo}</td>
                        <td>{val.codigo_categoria}</td>
                        <td style={{ backgroundColor: val.codigo_estatus === "Rechazado" ? "rgba(255, 0, 0, 0.5)" : val.codigo_estatus === "Aprobado" ? "rgba(0, 255, 0, 0.5)" : val.codigo_estatus === "Cuarentena" ? "rgba(255, 255, 0, 0.5)" : "" }}>  {val.codigo_estatus} </td>
                        <td>{val.codigo_final}</td>
                        <td>{val.observaciones}</td>
                        <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button"
                            onClick={()=>{
                                editarInsumos(val);
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
  );
}

export default RegistroInsumos;