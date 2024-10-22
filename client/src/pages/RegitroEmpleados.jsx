import { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import LoadingEmpleado from '../components/LoadingEmpleados';

function RegistroEmpleados() {

  const [isLoading, setIsLoading] = useState(true);

  // Simulando un tiempo de carga (por ejemplo, 3 segundos)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


    // Variables a utilizar para registro empleados
  const [nombre,setNombre] = useState("");
  const [apellidos,setApellidos] = useState("");
  const [genero,setGenero] = useState("");
  const [fecha_nacimiento,setFecha_Nacimiento] = useState('');
  const [formacion_academica,setFormacion_Academica] = useState("");
  const [puesto_empleado,setPuesto_Empleado] = useState("");
  const [correo,setCorreo] = useState("");
  const [rfc,setRfc] = useState("");
  const [imss,setImss] = useState("");
  const [curp,setCurp] = useState("");
  const [estatus_empleado,setEstatus_Empleado] = useState("");
  const [direccion,setDireccion] = useState("");
  const [telefono,setTelefono] = useState("");
  const [contrato,setContrato] = useState("");
  const [id,setId] = useState("");

  const [nombreEmpleadoValido, setNombreEmpleadoValido] = useState(true);
  const [apellidosEmpleadoValido, setApellidosEmpleadoValido] = useState(true);
  const [rfcEmpleadoValido, setRfcEmpleadoValido] = useState(true);
  const [imssEmpleadoValido, setImssEmpleadoValido] = useState(true);
  const [curpEmpleadoValido, setCurpEmpleadoValido] = useState(true);
  const [numeroEmpleadoValido, setNumeroEmpleadoValido] = useState(true);
   

  const [editar,setEditar] = useState(false);

  const [empleadosList,setEmpleados] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(15);  

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = empleadosList.slice(indexOfFirstResult, indexOfLastResult);

  const nextPage = () => {
      setCurrentPage(currentPage + 1);
    };
    
  const previousPage = () => {
      setCurrentPage(currentPage - 1);
    };


  
  const exportToExcel = () => {
    // Crear una matriz para almacenar los datos
    const data = [
      [
        'ID',
        'Nombre',
        'Apellidos',
        'Género',
        'Fecha de Nacimiento',
        'Formación Académica',
        'Puesto de Empleado',
        'Correo',
        'RFC',
        'IMSS',
        'CURP',
        'Estatus de Empleado',
        'Dirección',
        'Teléfono',
        'Contrato'
      ]
    ];
  
    // Agregar los datos de cada empleado a la matriz
    empleadosList.forEach((val) => {
      const empleado = [
        val.id,
        val.nombre,
        val.apellidos,
        val.genero,
        val.fecha_nacimiento,
        val.formacion_academica,
        val.puesto_empleado,
        val.correo,
        val.rfc,
        val.imss,
        val.curp,
        val.estatus_empleado,
        val.direccion,
        val.telefono,
        val.contrato
      ];
      data.push(empleado);
    });
  
    // Crear una hoja de cálculo
    const ws = XLSX.utils.aoa_to_sheet(data);
  
    // Aplicar estilos a las celdas
    const headerCellStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center' },
      fill: { patternType: 'solid', fgColor: { rgb: 'DDDDDD' } }
    };
  
    const cellStyle = {
      alignment: { horizontal: 'left' },
      fill: { patternType: 'solid', fgColor: { rgb: 'FFFFFF' } },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } }
      }
    };
  
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = ws[cellAddress];
  
        // Establecer estilos para la primera fila (encabezados)
        if (row === 0) {
          cell.s = headerCellStyle;
        } else {
          cell.s = cellStyle;
        }
  
        // Personalizar estilos de campos específicos
        if (row > 0) {
          // Personalizar el estilo del campo 'Nombre'
          if (col === 1) {
            cell.s = {
              cellStyle,
              font: { bold: true, color: { rgb: '0000FF' } }
            };
          }
  
          // Personalizar el estilo del campo 'Correo'
          if (col === 7) {
            cell.s = {
              cellStyle,
              fill: { patternType: 'solid', fgColor: { rgb: 'CCFFCC' } }
            };
          }

        }
      }
    }
  
    // Establecer ancho de columna automático
    const columnWidths = data[0].map(() => ({ width: 15 }));
    ws['!cols'] = columnWidths;
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Empleados');
  
    // Generar el archivo Excel
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const fileName = 'empleados.xlsx';
    const fileBlob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  
    // Descargar el archivo Excel
    saveAs(fileBlob, fileName);
  };
  
  // Función auxiliar para convertir una cadena en un ArrayBuffer
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };
  
  //Funcion use effect, se ejecuta cuando inicia el programa
  useEffect(() => {
    getEmpleados();
   },[])


   ///////////////////////// VALIDACIONES DE CAMPOS /////////////////
      // Función de validación para el campo "nombre_empleado"
      const validateNombreEmpleado = (value) => {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(value);
      };

      // Función de validación para el campo "Apellidos_Empleado"
      const validateApellidosEmpleado = (value) => {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(value);
      };

     
      const handleChange2 = (event) => {
        setCorreo(event.target.value);
      };
    
      const placeholderExample = 'Ejemplo: correo@example.com';

          
      // Función de validación para el campo "RFC"
      const validateRfcEmpleado = (value) => {
      const regex = /^[a-zA-Z0-9]{12,13}$/;
      return regex.test(value);
    };

 
      // Función de validación para el campo "IMSS"      
      const validateImssEmpleado = (value) => {
      const regex = /^\d{11}$/;
      return regex.test(value);
    };

    // Funcion de validacion para CURP
    const validateCurpEmpleado = (value) => {
      const regex = /^[a-zA-Z0-9]{18}$/;
      return regex.test(value);
    };
    
    
    // Funcion validar numero telefonico
    const validateNumeroEmpleado = (value) => {
      const regex = /^\d{10}$/;
      return regex.test(value);
    };
    

  
   ///////////////////////// VALIDACIONES DE CAMPOS /////////////////
   //Función de añadir nuevos empleados
  const add = (val) =>{
      // Validar campos aquí
  if (!nombre || !apellidos || !genero || !fecha_nacimiento || !formacion_academica || !puesto_empleado || !correo || !rfc || !imss || !curp || !estatus_empleado || !direccion || !telefono || !contrato) {
    Swal.fire({
      title: 'Campos incompletos',
      text: 'Por favor, completa todos los campos antes de registrar al empleado.',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido'
    });
    return;
  }
    Swal.fire({
      title: 'Verifica Datos',
      html: "<i>Seguro que quieres registrar al empleado <strong>"+nombre+"</strong> ? </i>",
      icon: 'warning',
      showCancelButton: true,
        confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Registrar Empleado'
    }).then((result) => {
      if (result.isConfirmed) {
     Axios.post("http://localhost:3001/empleado/registrar_Empleado",{
     nombre:nombre,
     apellidos:apellidos,
     genero:genero,
     fecha_nacimiento:fecha_nacimiento,
     formacion_academica:formacion_academica,
     puesto_empleado:puesto_empleado,
     correo:correo,
     rfc:rfc,
     imss:imss,
     curp:curp,
     estatus_empleado:estatus_empleado,
     direccion:direccion,
     telefono:telefono,
     contrato:contrato
    }).then(()=>{
      getEmpleados();
     limpiarCampos();
     Swal.fire({
      title: "<strong>¡Registro exitoso!</strong>",
      html: "<i>Se agrego al empleado <strong>"+nombre+"</strong> correctamente </i>",
      icon: 'success',
      timer:5000
    })
    });
         }
     });
   }

    // Funcion boton actualizar info empleado
  const actualizar = () =>{
    Axios.put("http://localhost:3001/empleado/actualizar_Empleado",{
     id:id,
     nombre:nombre,
     apellidos:apellidos,
     genero:genero,
     fecha_nacimiento:fecha_nacimiento,
     formacion_academica:formacion_academica,
     puesto_empleado:puesto_empleado,
     correo:correo,
     rfc:rfc,
     imss:imss,
     curp:curp,
     estatus_empleado:estatus_empleado,
     direccion:direccion,
     telefono:telefono,
     contrato:contrato
    }).then(()=>{
      getEmpleados();
     limpiarCampos();
     Swal.fire({
      title: "<strong>¡Registro editado!</strong>",
      html: "<i>Se edito la información del empleado <strong>"+nombre+"</strong> correctamente </i>",
      icon: 'success',
      timer:5000
    })
    });
   }

     // Funcion boton eliminar empleado
  const eliminar = (val) =>{
    Swal.fire({
      title: 'Espera...',
      html: "<i>Seguro que quieres eliminar al empleado <strong>"+val.nombre+"</strong> ? </i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar empleado'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/empleado/eliminar_Empleado/${val.id}`,
        ).then(()=>{
         getEmpleados();
         limpiarCampos();
         Swal.fire(
          'Empleado Eliminado',
          val.nombre+' Ha sido eliminado correctamente',
          'success'
        );
        }).catch(function(err){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido eliminar al empleado!',
            footer: JSON.parse(JSON.stringify(err)).message==="Network Error"?"Error en el servidor":JSON.parse(JSON.stringify(err)).messag
          })
        });
       
      }
    });
   }


   // Funcion para limpiar campos

   const limpiarCampos = () =>{
    setNombre("");
    setApellidos("");
    setGenero("");
    setFecha_Nacimiento("");
    setFormacion_Academica("");
    setPuesto_Empleado("");
    setCorreo("");
    setRfc("");
    setImss("");
    setCurp("");
    setEstatus_Empleado("");
    setDireccion("");
    setTelefono("");
    setContrato("");
    setEditar(false);
   }

   const editarEmpleado = (val)=>{
       setEditar(true);

       setNombre(val.nombre);
       setApellidos(val.apellidos);
       setGenero(val.genero);
       setFecha_Nacimiento(val.fecha_nacimiento);
       setFormacion_Academica(val.formacion_academica);
       setPuesto_Empleado(val.puesto_empleado);
       setCorreo(val.correo);
       setRfc(val.rfc);
       setImss(val.imss);
       setCurp(val.curp);
       setEstatus_Empleado(val.estatus_empleado);
       setDireccion(val.direccion);
       setTelefono(val.telefono);
       setContrato(val.contrato);
       setId(val.id);
       

   }
     
   //Obtener los empleados función
  const getEmpleados = () =>{
    Axios.get("http://localhost:3001/empleado/obtener_Empleados")
    .then((response)=>{
     setEmpleados(response.data);
    })
    .catch(err => {
      console.log('ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
      console.log(err)
    });
   }
   useEffect(() => {
    getEmpleados();
  }, []);
  
  const [empleados_Buscar, setEmpleados_Buscar] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  
  const handleChange = (e) => {
    const terminoBusqueda = e.target.value;
    setBusqueda(terminoBusqueda);
  
    if (terminoBusqueda) {
      const resultadosBusqueda = empleadosList.filter((elemento) => {
        const nombre = elemento.nombre.toString().toLowerCase();
        const correo = elemento.correo.toString().toLowerCase();
        const rfc = elemento.rfc.toString().toLowerCase();
        const imss = elemento.imss.toString().toLowerCase();
  
        return (
          nombre.includes(terminoBusqueda.toLowerCase()) ||
          correo.includes(terminoBusqueda.toLowerCase()) ||
          rfc.includes(terminoBusqueda.toLowerCase()) ||
          imss.includes(terminoBusqueda.toLowerCase())
        );
      });
  
      setEmpleados_Buscar(resultadosBusqueda);
    }
  };
    return (
      
      <div className="container">
         {isLoading ? (
        <LoadingEmpleado />
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
            <strong>REGISTRO DE NUEVOS EMPLEADOS</strong>
            </div>
            <div className="card-body">
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Nombre Empleado:</strong></span>
              <input type="text" 
               onChange={(event)=>{
                const value = event.target.value;
                setNombreEmpleadoValido(validateNombreEmpleado(value));
                setNombre(value);
              }}
              className={`form-control ${
                !nombreEmpleadoValido ? "is-invalid" : ""
              }`} value={nombre} placeholder="Nombre Empleado" aria-label="Username" aria-describedby="basic-addon1"/>
              {!nombreEmpleadoValido && (
          <div className="invalid-feedback">Ingrese solo letras.</div>
        )}
            </div>
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Apellidos Empleado:</strong></span>
              <input type="text" 
               onChange={(event)=>{
                const value = event.target.value;
                setApellidosEmpleadoValido(validateApellidosEmpleado(value));
                setApellidos(value);
              }}
              className={`form-control ${
                !apellidosEmpleadoValido ? "is-invalid" : ""
              }`} value={apellidos} placeholder="Apellidos Empleado" aria-label="Username" aria-describedby="basic-addon1"/>
              {!apellidosEmpleadoValido && (
          <div className="invalid-feedback">Ingrese solo letras.</div>
        )}
        </div>
            
           

            <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#80AAF2" }}>
        <strong>Genero:</strong>
      </span>
      <div className="d-flex align-items-center">
      <div className="form-check 3">
        <input
          type="checkbox"
          className="form-check-input 3"
          id="option3"
          value={genero}
          checked={genero === "Masculino"}
          onChange={(event) => {
            setGenero(event.target.checked ? "Masculino" : "");
          }}
        />
        <label className="form-check-label 3" htmlFor="option3" style={{ backgroundColor: genero === "Masculino" ? "rgba(0, 0, 255, 0.5)" : "" }}>
          Masculino
        </label>
      </div>
      <div className="form-check 4">
        <input
          type="checkbox"
          className="form-check-input 4"
          id="option4"
          value={genero}
          checked={genero === "Femenino"}
          onChange={(event) => {
            setGenero(event.target.checked ? "Femenino" : "");
          }}
        />
        <label className="form-check-label 4" htmlFor="option4"style={{ backgroundColor: genero === "Femenino" ?  "rgba(255, 0, 255, 0.5)" : "" }}> 
          Femenino
        </label>
      </div>
    </div>
    </div>
          
            
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Fecha Nacimiento:</strong></span>
              <input type="date" 
              onChange={(event)=>{
              setFecha_Nacimiento(event.target.value);
              }}
              className="form-control" value={fecha_nacimiento} placeholder="Escribe la fecha" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
          

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Formacion Academica:</strong></span>
              <input type="text" 
              onChange={(event)=>{
              setFormacion_Academica(event.target.value);
              }}
              className="form-control" value={formacion_academica} placeholder="Formacion Academica" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Puesto Empleado:</strong></span>
              <input type="text" 
              onChange={(event)=>{
              setPuesto_Empleado(event.target.value);
              }}
              className="form-control" value={puesto_empleado} placeholder="Puesto Empleado" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

                      <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#80AAF2" }}>
                  <strong>Correo:</strong>
                </span>
                <input
                  type="text"
                  onChange={handleChange2}
                  className="form-control"
                  value={correo}
                  placeholder={placeholderExample}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>
        </div>
    
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-header">
            <strong>REGISTRO DE NUEVOS EMPLEADOS</strong>
            </div>
            <div className="card-body">
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>RFC:</strong></span>
              <input type="text" 
               onChange={(event)=>{
                const value = event.target.value;
                setRfcEmpleadoValido(validateRfcEmpleado(value));
                setRfc(value);
              }}
              className={`form-control ${
                !rfcEmpleadoValido ? "is-invalid" : ""
              }`} value={rfc} placeholder="RFC" aria-label="Username" aria-describedby="basic-addon1"/>
              {!rfcEmpleadoValido && (
          <div className="invalid-feedback">Ingresa entre 12 y 13 caracteres</div>
        )}
            </div>

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>IMSS:</strong></span>
              <input type="number" 
               onChange={(event)=>{
                const value = event.target.value;
                setImssEmpleadoValido(validateImssEmpleado(value));
                setImss(value);
              }}
              className={`form-control ${
                !imssEmpleadoValido ? "is-invalid" : ""
              }`} value={imss} placeholder="IMSS" aria-label="Username" aria-describedby="basic-addon1"/>
              {!imssEmpleadoValido && (
          <div className="invalid-feedback">Ingresa 11 digitos numericos</div>
        )}

        </div>
             <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>CURP:</strong></span>
              <input type="text" 
               onChange={(event)=>{
                const value = event.target.value;
                setCurpEmpleadoValido(validateCurpEmpleado(value));
                setCurp(value);
              }}
              className={`form-control ${
                !curpEmpleadoValido ? "is-invalid" : ""
              }`} value={curp} placeholder="CURP" aria-label="Username" aria-describedby="basic-addon1"/>
              {!curpEmpleadoValido && (
          <div className="invalid-feedback">Ingresa 18 numeros y letras</div>
        )}
        </div>
        
           
      <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#80AAF2" }}>
        <strong>Estatus Empleado:</strong>
      </span>
      <div className="d-flex align-items-center">
      <div className="form-check 1">
        <input
          type="checkbox"
          className="form-check-input 1"
          id="option1"
          value={estatus_empleado}
          checked={estatus_empleado === "Inactivo"}
          onChange={(event) => {
            setEstatus_Empleado(event.target.checked ? "Inactivo" : "");
          }}
        />
        <label className="form-check-label 1" htmlFor="option1" style={{ backgroundColor: estatus_empleado === "Inactivo" ? "rgba(255, 0, 0, 0.5)" : "" }}>
          Inactivo
        </label>
      </div>
      <div className="form-check 2">
        <input
          type="checkbox"
          className="form-check-input 2"
          id="option2"
          value={estatus_empleado}
          checked={estatus_empleado === "Activo"}
          onChange={(event) => {
            setEstatus_Empleado(event.target.checked ? "Activo" : "");
          }}
        />
        <label className="form-check-label 2" htmlFor="option2"style={{ backgroundColor: estatus_empleado === "Activo" ? "rgba(0, 255, 0, 0.5)" : "" }}>
          Activo
        </label>
      </div>
    </div>
    </div>

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Direccion:</strong></span>
              <input type="text" 
              onChange={(event)=>{
              setDireccion(event.target.value);
              }}
              className="form-control" value={direccion} placeholder="Direccion / Domicilio" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Telefono:</strong></span>
              <input type="number" 
               onChange={(event)=>{
                const value = event.target.value;
                setNumeroEmpleadoValido(validateNumeroEmpleado(value));
                setTelefono(value);
              }}
              className={`form-control ${
                !numeroEmpleadoValido ? "is-invalid" : ""
              }`} value={telefono} placeholder="Ejemplo: 4271235689" aria-label="Username" aria-describedby="basic-addon1"/>
              {!numeroEmpleadoValido && (
          <div className="invalid-feedback">Ingresa 10 digitos</div>
        )}
        </div>

            <div className="input-group mb-3 te">
            <span className="input-group-text" id="basic-addon1"style={{ backgroundColor: "#80AAF2" }}><strong>Contrato:  </strong></span>
              <input type="text" 
              onChange={(event)=>{
              setContrato(event.target.value);
              }}
              className="form-control" value={contrato} placeholder="Contrato Confidencialidad" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            </div>
          </div>
        </div>
    
        
          {editar ? 
          <div>
            <button className='btn btn-success justify-content-center m-2' onClick={actualizar}>Actualizar Información Empleado</button> 
            <button className='btn btn-danger justify-c:ontent-center m-2' onClick={limpiarCampos}>Cancelar</button>
          </div>
        :  <button className='btn btn-success' style={{ marginTop: '20px' }} onClick={add}>Registrar Nuevo Empleado</button>
            
            
          
        }
      

      <div className="containerInput d-flex mt-4">
            <input
              className="form-control inputBuscar"
              value={busqueda}
              placeholder="Búsqueda por Nombre,IMSS,correo o RFC"
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
              <th scope="col">Nombre</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Genero</th>
              <th scope="col">Fecha Nacimiento</th>
              <th scope="col">Formacion Academica</th>
              <th scope="col">Puesto Empleado</th>
              <th scope="col">Correo</th>
              <th scope="col">RFC</th>
              <th scope="col">IMSS</th>
              <th scope="col">CURP</th>
              <th scope="col">Estatus Empleado</th>
              <th scope="col">Direccion</th>
              <th scope="col">Telefono</th>
              <th scope="col">Contrato Confidencialidad</th>
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
                  disabled={indexOfLastResult >= empleadosList.length}
                  className="btn btn-secondary m-2"
                >
                  Siguiente
                </button>
              </div>
              <p>
              Empleados Totales: 
              <span style={{ textDecoration: 'underline', color: 'rgba(0, 0, 255, 0.8)' }}>{empleadosList.length}</span>
            </p>
            </tr>
          </thead>
          <tbody>
                
          {
        // Listas todos los componentes de empleados
     busqueda ?
     empleados_Buscar.map((val,key)=>{
          return <tr key={val.id}>
                    <th>{val.id}</th>
                    <td>{val.nombre}</td>
                    <td>{val.apellidos}</td>
                    <td style={{ backgroundColor: val.genero === "Masculino" ? "rgba(180, 200, 255, 0.5)" : val.genero === "Femenino" ? "rgba(255, 180, 200, 0.5)" : "" }}> {val.genero} </td>
                    <td>{val.fecha_nacimiento}</td>
                    <td>{val.formacion_academica}</td>
                    <td>{val.puesto_empleado}</td>
                    <td>{val.correo}</td>
                    <td>{val.rfc}</td>
                    <td>{val.imss}</td>
                    <td>{val.curp}</td>
                    <td style={{ backgroundColor: val.estatus_empleado === "Inactivo" ? "rgba(255, 0, 0, 0.5)" : val.estatus_empleado === "Activo" ? "rgba(0, 255, 0, 0.5)":  "" }}>  {val.estatus_empleado} </td>
                    <td>{val.direccion}</td>
                    <td>{val.telefono}</td>
                    <td>{val.contrato}</td>
                    <td>
                          <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button"
                          onClick={()=>{
                            editarEmpleado(val);
                          }} className="btn btn-warning m-2">Editar</button>
                          <button type="button" onClick={()=>{
                            eliminar(val);
                          }} className="btn btn-danger m-2">Eliminar</button>
                        </div>
                        <button type="button" onClick={exportToExcel} className="btn btn-primary m-2">
                            Exportar a Excel
                        </button>
                    </td>
                  </tr>
        })
       : currentResults.map((val,key)=>{
        return <tr key={val.id}>
        <th>{val.id}</th>
        <td>{val.nombre}</td>
        <td>{val.apellidos}</td>
        <td style={{ backgroundColor: val.genero === "Masculino" ? "rgba(180, 200, 255, 0.5)" : val.genero === "Femenino" ? "rgba(255, 180, 200, 0.5)" : "" }}> {val.genero} </td>
        <td>{val.fecha_nacimiento}</td>
        <td>{val.formacion_academica}</td>
        <td>{val.puesto_empleado}</td>
        <td>{val.correo}</td>
        <td>{val.rfc}</td>
        <td>{val.imss}</td>
        <td>{val.curp}</td>
        <td style={{ backgroundColor: val.estatus_empleado === "Inactivo" ? "rgba(255, 0, 0, 0.5)" : val.estatus_empleado === "Activo" ? "rgba(0, 255, 0, 0.5)":  "" }}>  {val.estatus_empleado} </td>
        <td>{val.direccion}</td>
        <td>{val.telefono}</td>
        <td>{val.contrato}</td>
        <td>
              <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button"
              onClick={()=>{
                editarEmpleado(val);
              }} className="btn btn-warning m-2">Editar</button>
              <button type="button" onClick={()=>{
                eliminar(val);
              }} className="btn btn-danger m-2">Eliminar</button>
            </div>
            <button type="button" onClick={exportToExcel} className="btn btn-primary m-2">
                Exportar a Excel
            </button>
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





export default RegistroEmpleados;