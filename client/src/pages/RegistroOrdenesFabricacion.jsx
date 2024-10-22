import { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'

function RegistroOrdenesFabricacion() {

  const [producto_generico, setProducto_Generico] = useState("");
  const [forma_farmaceutica, setForma_Farmaceutica] = useState("");
  const [concentracion, setConcentracion] = useState("");
  const [fecha_caducidad, setFecha_Caducidad] = useState("");
  const [num_lote_anterior, setNum_Lote_Anterior] = useState("");
  const [num_lote_fabricar, setNum_Lote_Fabricar] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [tam_lote_kg, setTam_Lote_Kg] = useState("");
  const [tam_lote_gr, setTam_Lote_Gr] = useState("");
  const [tam_lote_piezas, setTam_Lote_Piezas] = useState("");
  const [rendimiento, setRendimiento] = useState("");
  const [merma, setMerma] = useState("");
  const [total_mg_sobre, setTotal_Mg_Sobre] = useState("");
  const [total_peso_peso, setTotal_Peso_Peso] = useState("");
  const [total_peso_lote, setTotal_Peso_Lote] = useState("");
  const [persona_emitio, setPersona_Emitio] = useState("");
  const [persona_verifico2, setPersona_Verifico2] = useState("");
  const [persona_ejecuto, setPersona_Ejecuto] = useState("");
  const [fecha1, setFecha1] = useState("");
  const [fecha2, setFecha2] = useState("");
  const [fecha3, setFecha3] = useState("");
  const [peso_por_sobre, setPeso_Por_Sobre] = useState("");
  const [motivo_fabricacion, setMotivo_Fabricacion] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const areAllFieldsFilled = () => {
    const fields = [
      producto_generico,
      forma_farmaceutica,
      concentracion,
      fecha_caducidad,
      num_lote_anterior,
      num_lote_fabricar,
      fabricante,
      tam_lote_kg,
      tam_lote_gr,
      tam_lote_piezas,
      rendimiento,
      merma,
      total_mg_sobre,
      total_peso_lote,
      peso_por_sobre
    ];
  
    return fields.every(field => field !== "");
  };
  



  /////////////////////////////////////////////////////////////////
  const [inputs, setInputs] = useState([
    {
      codigo_insumo: "",
      cantidad_ocupar_insumo: "",
      nombre_insumo: "",
      tabla_insumo: "",
      lote_insumo: "",
      peso_porcentaje: "",
      peso_lote: "",
      peso_persona: "",
      persona_verifico: ""
    },
  ]);

  const [inputs2, setInputs2] = useState([
    {
      codigo_insumo_2: "",
      cantidad_ocupar_insumo_2: "",
      nombre_insumo_2: "",
      tabla_insumo_2: "",
      lote_insumo_2: "",
      peso_lote_2: "",
      peso_persona_2: "",
      persona_verifico_2: ""
    }
  ]);

  const [inputs3, setInputs3] = useState([
    {
      codigo_insumo_3: "",
      cantidad_ocupar_insumo_3: "",
      nombre_insumo_3: "",
      tabla_insumo_3: "",
      lote_insumo_3: "",
      peso_lote_3: "",
      peso_persona_3: "",
      persona_verifico_3: ""
    }
  ]);


  /////////////////////////////////////////////////////////////
  const handleInputChange = (index, event) => {
    const values = [...inputs];
    values[index] = {
      ...values[index],
      [event.target.name]: parseFloat(event.target.value) || null
    };
    setInputs(values);

    // Actualizar los valores de los Mg/Sobre en mgSobreValues
    const mgSobreArray = values.map((input) => input.cantidad_ocupar_insumo || 0);
    setMgSobreValues(mgSobreArray);

    // Actualizar los valores de los %PESO / PESO en pesoPesoValues
    const pesoPesoArray = values.map((input) => input.peso_porcentaje || 0);
    setPesoPesoValues(pesoPesoArray);

    // Actualizar los valores de los peso/lote en pesoLoteValues  
    const pesoLoteArray = values.map((input) => input.peso_lote || 0);
    setPesoPesoLoteValues(pesoLoteArray);

    // Calcular peso_porcentaje
    const totalPesoMg = mgSobreArray.reduce((acc, val) => acc + val, 0);
    const updatedInputs = values.map((input) => {
      if (input.cantidad_ocupar_insumo && totalPesoMg) {
        const pesoPorcentaje = (input.cantidad_ocupar_insumo * 100) / totalPesoMg;
        return {
          ...input,
          peso_porcentaje: pesoPorcentaje
        };
      } else {
        return input;
      }
    });
    setInputs(updatedInputs);
  };

  const handleInputChange3 = (index, event) => {
    const values = [...inputs2];
    values[index] = {
      ...values[index],
      [event.target.name]: parseFloat(event.target.value) || null,
    };
    setInputs2(values);

    // Obtén los valores necesarios para el cálculo
    const cantidadOcuparInsumo2 = parseFloat(event.target.value) || 0;
    const tamLoteGr = parseFloat(tam_lote_gr) || 0;

    // Calcula el peso del lote usando la fórmula proporcionada
    const pesoLote2 = (cantidadOcuparInsumo2 * tamLoteGr) / (total_mg_sobre + cantidadOcuparInsumo2);

    // Establece el valor calculado en el estado
    values[index].peso_lote_2 = pesoLote2;
    setInputs2(values);
  };


  const handleInputChange6 = (index, event) => {
    const values = [...inputs3];
    values[index] = {
      ...values[index],
      [event.target.name]: parseFloat(event.target.value) || null
    };
    setInputs3(values);

    // Calcula el peso del lote y establece el valor en el estado
    const cantidadOcuparInsumo3 = parseFloat(event.target.value) || 0;
    const tamLotePiezas = parseFloat(tam_lote_piezas) || 0;
    const pesoLote3 = cantidadOcuparInsumo3 * tamLotePiezas;
    values[index].peso_lote_3 = pesoLote3;
  };
  ////////////////////////////////////////////////////////////////////////

  const handleAddInput = () => {
    const newInput = {
      codigo_insumo: "",
      cantidad_ocupar_insumo: "",
      nombre_insumo: "",
      tabla_insumo: "",
      lote_insumo: "",
      peso_porcentaje: "",
      peso_lote: "",
      peso_persona: "",
      persona_verifico: ""
    };

    setInputs((prevInputs) => [...prevInputs, newInput]);

    console.log(newInput);
  };

  const handleRemoveInput = (index) => {
    if (inputs.length === 1) {
      Swal.fire({
        icon: 'warning',
        title: 'No puedes borrar este campo',
        text: 'Debes tener al menos un campo vacio.',
      });
      return;
    }

    const values = [...inputs];
    values.splice(index, 1);
    setInputs(values);
  };



  const handleAddInput2 = () => {
    const newInput2 = {
      codigo_insumo_2: "",
      cantidad_ocupar_insumo_2: "",
      nombre_insumo_2: "",
      tabla_insumo_2: "",
      lote_insumo_2: "",
      peso_lote_2: "",
      peso_persona_2: "",
      persona_verifico_2: ""
    };

    setInputs2((prevInputs) => [...prevInputs, newInput2]);

    console.log(newInput2);
  };

  const handleRemoveInput2 = (index) => {
    if (inputs2.length === 1) {
      Swal.fire({
        icon: 'warning',
        title: 'No puedes borrar este campo',
        text: 'Debes tener al menos un campo vacio.',
      });
      return;
    }

    const values = [...inputs2];
    values.splice(index, 1);
    setInputs2(values);
  };



  const handleAddInput3 = () => {
    const newInput3 = {
      codigo_insumo_3: "",
      cantidad_ocupar_insumo_3: "",
      nombre_insumo_3: "",
      tabla_insumo_3: "",
      lote_insumo_3: "",
      peso_lote_3: "",
      peso_persona_3: "",
      persona_verifico_3: ""
    };

    setInputs3((prevInputs) => [...prevInputs, newInput3]);

    console.log(newInput3);
  };

  const handleRemoveInput3 = (index) => {
    if (inputs3.length === 1) {
      Swal.fire({
        icon: 'warning',
        title: 'No puedes borrar este campo',
        text: 'Debes tener al menos un campo vacio.',
      });
      return;
    }

    const values = [...inputs3];
    values.splice(index, 1);
    setInputs3(values);
  };






  //////////////////////////////////////////////////////////////////////////////////

  const [insumosDisponibles, setInsumosDisponibles] = useState([]);
  const [insumosClientes, setInsumosClientes] = useState([]);

  useEffect(() => {
    // Primera solicitud para obtener insumos
    Axios.get('http://localhost:3001/insumos/obtener_Insumos')
      .then(response => {
        setInsumosDisponibles(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // Segunda solicitud para obtener insumos de clientes
    Axios.get('http://localhost:3001/insumosClientes/obtener_Insumos_Clientes')
      .then(response => {
        console.log(response.data);
        setInsumosClientes(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const [insumosDisponibles2, setInsumosDisponibles2] = useState([]);
  const [insumosClientes2, setInsumosClientes2] = useState([]);


  useEffect(() => {
    Axios.get('http://localhost:3001/insumos/obtener_Insumos')
      .then(response => {
        setInsumosDisponibles2(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // Segunda solicitud para obtener insumos de clientes
    Axios.get('http://localhost:3001/insumosClientes/obtener_Insumos_Clientes')
      .then(response => {
        setInsumosClientes2(response.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  const [insumosDisponibles3, setInsumosDisponibles3] = useState([]);
  const [insumosClientes3, setInsumosClientes3] = useState([]);


  useEffect(() => {
    Axios.get('http://localhost:3001/insumos/obtener_Insumos')
      .then(response => {
        setInsumosDisponibles3(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // Segunda solicitud para obtener insumos de clientes
    Axios.get('http://localhost:3001/insumosClientes/obtener_Insumos_Clientes')
      .then(response => {
        setInsumosClientes3(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  /////////////////////////////////////////////////////////////////////////////

  function handleInputChange2(event) {
    const searchTerm = event.target.value;
    const selectedInsumo = insumosDisponibles.find(
      (insumo) => insumo.nombre_insumo === searchTerm
    );

    if (selectedInsumo) {
      const codigoInsumo = obtenerCodigoInsumo(selectedInsumo.nombre_insumo);
      const updatedInput = {
        ...inputs[inputs.length - 1],
        codigo_insumo: codigoInsumo,
        nombre_insumo: selectedInsumo.nombre_insumo,
        lote_insumo: selectedInsumo.lote,
        tabla_insumo: selectedInsumo.tabla_insumo
      };

      const updatedInputs = [...inputs.slice(0, inputs.length - 1), updatedInput];
      setInputs(updatedInputs);
    } else {
      // Si no se encuentra en insumosDisponibles, buscamos en insumosClientes
      const selectedInsumoCliente = insumosClientes.find(
        (insumoCliente) => insumoCliente.nombre_insumos === searchTerm
      );

      if (selectedInsumoCliente) {
        const codigoInsumo = obtenerCodigoInsumo(selectedInsumoCliente.nombre_insumos);
        const updatedInput = {
          ...inputs[inputs.length - 1],
          codigo_insumo: codigoInsumo,
          nombre_insumo: selectedInsumoCliente.nombre_insumos,
          lote_insumo: selectedInsumoCliente.lote,
          tabla_insumo: selectedInsumoCliente.tabla_insumo
        };

        const updatedInputs = [...inputs.slice(0, inputs.length - 1), updatedInput];
        setInputs(updatedInputs);
      } else {
        const updatedInput = {
          ...inputs[inputs.length - 1],
          nombre_insumo: searchTerm
        };

        const updatedInputs = [...inputs.slice(0, inputs.length - 1), updatedInput];
        setInputs(updatedInputs);
      }
    }
  }



  function handleSelectInsumo(selectedInsumo) {
    const insumoEnTablaDisponibles = insumosDisponibles.find(
      (insumo) => insumo.nombre_insumo === selectedInsumo
    );

    if (insumoEnTablaDisponibles) {
      const updatedInputs = inputs.map((input, index) => {
        if (index === inputs.length - 1) {
          return {
            ...input,
            codigo_insumo: obtenerCodigoInsumo(selectedInsumo), // Usamos la función para obtener el código del insumo
            nombre_insumo: selectedInsumo,
            lote_insumo: insumoEnTablaDisponibles.lote, // Aquí asumimos que insumosDisponibles tiene la propiedad "lote"
            tabla_insumo: insumoEnTablaDisponibles.tabla_insumo
          };
        }
        return input;
      });

      setInputs(updatedInputs);
    } else {
      const insumoEnTablaClientes = insumosClientes.find(
        (insumoCliente) => insumoCliente.nombre_insumos === selectedInsumo
      );

      if (insumoEnTablaClientes) {
        const updatedInputs = inputs.map((input, index) => {
          if (index === inputs.length - 1) {
            return {
              ...input,
              codigo_insumo: insumoEnTablaClientes.id_insumos,
              nombre_insumo: insumoEnTablaClientes.nombre_insumos,
              lote_insumo: insumoEnTablaClientes.lote, // Aquí asumimos que insumosClientes tiene la propiedad "lote"
              tabla_insumo: insumoEnTablaClientes.tabla_insumo
            };
          }
          return input;
        });

        setInputs(updatedInputs);

      }
    }
  }


  function obtenerCodigoInsumo(nombreInsumo) {
    // Buscar en insumosDisponibles
    const insumoEnTablaDisponibles = insumosDisponibles.find(
      (insumo) => insumo.nombre_insumo === nombreInsumo
    );

    if (insumoEnTablaDisponibles) {
      return insumoEnTablaDisponibles.id_insumo;
    } else {
      // Si no se encuentra en insumosDisponibles, buscar en insumosClientes
      const insumoEnTablaClientes = insumosClientes.find(
        (insumoCliente) => insumoCliente.nombre_insumos === nombreInsumo
      );

      return insumoEnTablaClientes ? insumoEnTablaClientes.id_insumos : "";
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////
  function handleInputChange4(event) {
    const searchTerm = event.target.value;
    const selectedInsumo2 = insumosDisponibles2.find(
      (insumo2) => insumo2.nombre_insumo === searchTerm
    );

    if (selectedInsumo2) {
      const codigoInsumo2 = obtenerCodigoInsumo2(selectedInsumo2.nombre_insumo);
      const updatedInput2 = {
        ...inputs2[inputs2.length - 1],
        codigo_insumo_2: codigoInsumo2,
        nombre_insumo_2: selectedInsumo2.nombre_insumo,
        lote_insumo_2: selectedInsumo2.lote,
        tabla_insumo_2: selectedInsumo2.tabla_insumo
      };

      const updatedInputs2 = [...inputs2.slice(0, inputs2.length - 1), updatedInput2];
      setInputs2(updatedInputs2);

    } else {
      // Si no se encuentra en insumosDisponibles, buscamos en insumosClientes
      const selectedInsumoCliente2 = insumosClientes2.find(
        (insumoCliente2) => insumoCliente2.nombre_insumos === searchTerm
      );

      if (selectedInsumoCliente2) {
        const codigoInsumo2 = obtenerCodigoInsumo2(selectedInsumoCliente2.nombre_insumos);
        const updatedInput2 = {
          ...inputs2[inputs2.length - 1],
          codigo_insumo_2: codigoInsumo2,
          nombre_insumo_2: selectedInsumoCliente2.nombre_insumos,
          lote_insumo_2: selectedInsumoCliente2.lote,
          tabla_insumo_2: selectedInsumoCliente2.tabla_insumo
        };

        const updatedInputs2 = [...inputs2.slice(0, inputs2.length - 1), updatedInput2];
        setInputs2(updatedInputs2);
      } else {
        const updatedInput2 = {
          ...inputs2[inputs2.length - 1],
          nombre_insumo_2: searchTerm
        };

        const updatedInputs2 = [...inputs2.slice(0, inputs2.length - 1), updatedInput2];
        setInputs2(updatedInputs2);
      }
    }
  }


  function handleSelectInsumo2(selectedInsumo2) {
    const insumoEnTablaDisponibles = insumosDisponibles2.find(
      (insumo2) => insumo2.nombre_insumo === selectedInsumo2
    );

    if (insumoEnTablaDisponibles) {
      const updatedInputs2 = inputs2.map((input, index) => {
        if (index === inputs2.length - 1) {
          return {
            ...input,
            codigo_insumo_2: obtenerCodigoInsumo(selectedInsumo2), // Usamos la función para obtener el código del insumo
            nombre_insumo_2: selectedInsumo2,
            lote_insumo_2: insumoEnTablaDisponibles.lote, // Aquí asumimos que insumosDisponibles tiene la propiedad "lote"
            tabla_insumo_2: insumoEnTablaDisponibles.tabla_insumo
          };
        }
        return input;
      });

      setInputs2(updatedInputs2);
    } else {
      const insumoEnTablaClientes = insumosClientes2.find(
        (insumoCliente2) => insumoCliente2.nombre_insumos === selectedInsumo2
      );

      if (insumoEnTablaClientes) {
        const updatedInputs2 = inputs2.map((input, index) => {
          if (index === inputs2.length - 1) {
            return {
              ...input,
              codigo_insumo_2: insumoEnTablaClientes.id_insumos,
              nombre_insumo_2: insumoEnTablaClientes.nombre_insumos,
              lote_insumo_2: insumoEnTablaClientes.lote, // Aquí asumimos que insumosClientes tiene la propiedad "lote"
              tabla_insumo_2: insumoEnTablaClientes.tabla_insumo
            };
          }
          return input;
        });

        setInputs2(updatedInputs2);
      }
    }
  }

  function obtenerCodigoInsumo2(nombreInsumo) {
    // Buscar en insumosDisponibles
    const insumoEnTablaDisponibles = insumosDisponibles2.find(
      (insumo2) => insumo2.nombre_insumo === nombreInsumo
    );
    if (insumoEnTablaDisponibles) {
      return insumoEnTablaDisponibles.id_insumo;
    } else {
      // Si no se encuentra en insumosDisponibles, buscar en insumosClientes
      const insumoEnTablaClientes = insumosClientes.find(
        (insumoCliente2) => insumoCliente2.nombre_insumos === nombreInsumo
      );

      return insumoEnTablaClientes ? insumoEnTablaClientes.id_insumos : "";
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////
  function handleInputChange8(event) {
    const searchTerm = event.target.value;
    const selectedInsumo3 = insumosDisponibles3.find(
      (insumo3) => insumo3.nombre_insumo === searchTerm
    );

    if (selectedInsumo3) {
      const codigoInsumo3 = obtenerCodigoInsumo3(selectedInsumo3.nombre_insumo);
      const updatedInput3 = {
        ...inputs3[inputs3.length - 1],
        codigo_insumo_3: codigoInsumo3,
        nombre_insumo_3: selectedInsumo3.nombre_insumo,
        lote_insumo_3: selectedInsumo3.lote,
        tabla_insumo_3: selectedInsumo3.tabla_insumo
      };

      const updatedInputs3 = [...inputs3.slice(0, inputs3.length - 1), updatedInput3];
      setInputs3(updatedInputs3);
    } else {

      // Si no se encuentra en insumosDisponibles, buscamos en insumosClientes
      const selectedInsumoCliente3 = insumosClientes3.find(
        (insumoCliente3) => insumoCliente3.nombre_insumos === searchTerm
      );

      if (selectedInsumoCliente3) {
        const codigoInsumo3 = obtenerCodigoInsumo3(selectedInsumoCliente3.nombre_insumos);
        const updatedInput3 = {
          ...inputs3[inputs3.length - 1],
          codigo_insumo_3: codigoInsumo3,
          nombre_insumo_3: selectedInsumoCliente3.nombre_insumos,
          lote_insumo_3: selectedInsumoCliente3.lote,
          tabla_insumo_3: selectedInsumoCliente3.tabla_insumo
        };

        const updatedInputs3 = [...inputs3.slice(0, inputs3.length - 1), updatedInput3];
        setInputs3(updatedInputs3);
      } else {
        const updatedInput3 = {
          ...inputs3[inputs3.length - 1],
          nombre_insumo_3: searchTerm
        };

        const updatedInputs3 = [...inputs3.slice(0, inputs3.length - 1), updatedInput3];
        setInputs3(updatedInputs3);
      }
    }
  }



  function handleSelectInsumo3(selectedInsumo3) {
    const insumoEnTablaDisponibles = insumosDisponibles3.find(
      (insumo3) => insumo3.nombre_insumo === selectedInsumo3
    );

    if (insumoEnTablaDisponibles) {
      const updatedInputs3 = inputs3.map((input, index) => {
        if (index === inputs3.length - 1) {
          return {
            ...input,
            codigo_insumo_3: obtenerCodigoInsumo(selectedInsumo3), // Usamos la función para obtener el código del insumo
            nombre_insumo_3: selectedInsumo3,
            lote_insumo_3: insumoEnTablaDisponibles.lote, // Aquí asumimos que insumosDisponibles tiene la propiedad "lote"
            tabla_insumo_3: insumoEnTablaDisponibles.tabla_insumo
          };
        }
        return input;
      });

      setInputs3(updatedInputs3);
    } else {
      const insumoEnTablaClientes = insumosClientes3.find(
        (insumoCliente3) => insumoCliente3.nombre_insumos === selectedInsumo3
      );

      if (insumoEnTablaClientes) {
        const updatedInputs3 = inputs3.map((input, index) => {
          if (index === inputs3.length - 1) {
            return {
              ...input,
              codigo_insumo_3: insumoEnTablaClientes.id_insumos,
              nombre_insumo_3: insumoEnTablaClientes.nombre_insumos,
              lote_insumo_3: insumoEnTablaClientes.lote, // Aquí asumimos que insumosClientes tiene la propiedad "lote"
              tabla_insumo_3: insumoEnTablaClientes.tabla_insumo
            };
          }
          return input;
        });

        setInputs3(updatedInputs3);
      }
    }
  }

  function obtenerCodigoInsumo3(nombreInsumo) {
    // Buscar en insumosDisponibles
    const insumoEnTablaDisponibles = insumosDisponibles3.find(
      (insumo3) => insumo3.nombre_insumo === nombreInsumo
    );
    if (insumoEnTablaDisponibles) {
      return insumoEnTablaDisponibles.id_insumo;
    } else {
      // Si no se encuentra en insumosDisponibles, buscar en insumosClientes
      const insumoEnTablaClientes = insumosClientes.find(
        (insumoCliente3) => insumoCliente3.nombre_insumos === nombreInsumo
      );

      return insumoEnTablaClientes ? insumoEnTablaClientes.id_insumos : "";
    }
  }
  ////////////////////// PARA LA SUMA DE TOTAL MG/SOBRE Y PESO PESO Y PESO LOTE //////////////
  const [mgSobreValues, setMgSobreValues] = useState([]);
  const [pesoPesoValues, setPesoPesoValues] = useState([]);
  const [pesoPesoLoteValues, setPesoPesoLoteValues] = useState([]);


  useEffect(() => {
    const sum = mgSobreValues.reduce((acc, val) => acc + val, 0);
    const sum2 = pesoPesoValues.reduce((acc, val) => acc + val, 0);
    const sum3 = pesoPesoLoteValues.reduce((acc, val) => acc + val, 0);
    setTotal_Mg_Sobre(sum);
    setTotal_Peso_Peso(sum2);
    setTotal_Peso_Lote(sum3);
  }, [mgSobreValues, pesoPesoValues, pesoPesoLoteValues]);


  function calculatePesoLote(cantidadOcuparInsumo, tamLoteGr, totalMgSobre) {
    if (!cantidadOcuparInsumo || !tamLoteGr || !totalMgSobre) {
      return "";
    }

    return (cantidadOcuparInsumo * tamLoteGr) / totalMgSobre;
  }

  // Efecto para calcular y actualizar el campo "peso_lote"
  useEffect(() => {
    const updatedInputs = inputs.map((input) => {
      const pesoLote = calculatePesoLote(
        input.cantidad_ocupar_insumo,
        tam_lote_gr,
        total_mg_sobre
      );

      return {
        ...input,
        peso_lote: pesoLote,
      };
    });

    setInputs(updatedInputs);
  }, [inputs, tam_lote_gr, total_mg_sobre]);

  // Efecto para calcular y actualizar el campo "tam_lote_piezas"

  useEffect(() => {
    // Verificamos que ambos campos necesarios para el cálculo tengan valores numéricos válidos
    if (parseFloat(tam_lote_gr) && parseFloat(peso_por_sobre)) {
      const tamLotePiezasValue = parseFloat(tam_lote_gr) / parseFloat(peso_por_sobre);
      // Actualizamos el estado del input "tam_lote_piezas" con el resultado del cálculo
      setTam_Lote_Piezas(tamLotePiezasValue);
    } else {
      // Si alguno de los campos no tiene valor numérico válido, dejamos el valor vacío
      setTam_Lote_Piezas('');
    }
  }, [tam_lote_gr, peso_por_sobre]);


  useEffect(() => {
    // Calcula el peso del lote y establece el valor en el estado
    const cantidadOcuparInsumo2 = parseFloat(inputs2[inputs2.length - 1]?.cantidad_ocupar_insumo_2) || 0;
    const tamLoteGr = parseFloat(tam_lote_gr) || 0;
    const pesoLote2 = (cantidadOcuparInsumo2 * tamLoteGr) / (total_mg_sobre + cantidadOcuparInsumo2);
    setInputs2(prevInputs => {
      const updatedInputs = [...prevInputs];
      updatedInputs[prevInputs.length - 1].peso_lote_2 = pesoLote2;
      return updatedInputs;
    });
  }, [tam_lote_gr, total_mg_sobre, inputs2]);




  ////////////////////// PARA LA SUMA DE TOTAL MG/SOBRE Y PESO PESO Y PESO LOTE //////////////
  const add = async (val) => {
    if (!areAllFieldsFilled()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de realizar la orden de fabricacion.',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton: 'my-confirm-button-class',
        },
      });
      return; // Stop execution if fields are not filled
    }

    Swal.fire({
      title: 'Verifica Datos',
      html: `<i>Seguro que quieres realizar la orden de fabricacion del lote <strong>${num_lote_fabricar}</strong> ? </i>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Realizar Orden Fabricacion'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const verificacion = await Axios.post(
            "http://localhost:3001/ordenesFabricacion/verificar_realizacion_Ordenes_Fabricacion",
            {
              datos: inputs,
              datos2: inputs2,
              datos3: inputs3,
            }
          );

          const resultado = verificacion.data;

          if (resultado.success) {
            Swal.fire({
              icon: 'success',
              title: 'Exito en la orden',
              text: 'La orden de fabricación se ha realizado correctamente.',
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'my-confirm-button-class',
              },
            });

          } else {
            let errorMessages = ''; //CAMBIAR ESTO
            for (const msg of resultado.errorMessages) {
              errorMessages += `<strong><p>${msg}</strong></p>`;
            }


            Swal.fire({
              icon: 'error',
              title: 'Error en la orden',
              html: errorMessages,
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'my-confirm-button-class',
              },
            }).fire();
          }
        } catch (error) {
          // Manejar errores de petición aquí si es necesario
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="card-container">
          <div className="card text">
            <div className="card-header" style={{ backgroundColor: "#243A60", color: "#FFFFFF" }}>
              <strong>PRODUCTO GENERICO--------------FORMA FARMACEUTICA----------CONCENTRACION----------------CADUCIDAD------------------------NO. LOTE ANTERIOR--------------NO. LOTE A FABRICAR</strong>
            </div>
            <div className="card-body d-flex">
              <div className="input-group flex-grow-1">
                <input
                  type="text"
                  onChange={(event) => {
                    setProducto_Generico(event.target.value);
                  }}
                  className="form-control"
                  value={producto_generico}
                  placeholder="Producto Generico"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
              </div>

              <div className="input-group flex-grow-1">
                <input
                  type="text"
                  onChange={(event) => {
                    setForma_Farmaceutica(event.target.value);
                  }}
                  className="form-control"
                  value={forma_farmaceutica}
                  placeholder="Nombre Forma Farmaceutica"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
              </div>

              <div className="input-group flex-grow-1">
                <input
                  type="text"
                  onChange={(event) => {
                    setConcentracion(event.target.value);
                  }}
                  className="form-control"
                  value={concentracion}
                  placeholder="Tipo de concentracion"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
              </div>

              <div className="input-group flex-grow-1">
                <input
                  type="date"
                  onChange={(event) => {
                    setFecha_Caducidad(event.target.value);
                  }}
                  className="form-control"
                  value={fecha_caducidad}
                  placeholder="Fecha Caducidad"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
              </div>

              <div className="input-group flex-grow-1">
                <input
                  type="text"
                  onChange={(event) => {
                    setNum_Lote_Anterior(event.target.value);
                  }}
                  className="form-control"
                  value={num_lote_anterior}
                  placeholder="Num Lote Anterior"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
              </div>

              <div className="input-group flex-grow-1">
                <input
                  type="text"
                  onChange={(event) => {
                    setNum_Lote_Fabricar(event.target.value);
                  }}
                  className="form-control"
                  value={num_lote_fabricar}
                  placeholder="Num Lote A Fabricar"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
              </div>
            </div>
          </div>
          <div className="card text">
            <div className="card-header" style={{ backgroundColor: "#243A60", color: "#FFFFFF" }}>
              <strong> FABRICANTE------------------------TAMAÑO DE LOTE ESTANDAR----------TAMAÑO DE LOTE (G)-------------TAMAÑO DE LOTE (PZAS)----------RENDIMIENTO (%)-------------MERMA (%)----PESO X PIEZA</strong>
            </div>
            <div className="card-body d-flex">
              <div className="input-group flex-grow-1">
                <input
                  type="text"
                  onChange={(event) => {
                    setFabricante(event.target.value);
                  }}
                  className="form-control"
                  value={fabricante}
                  placeholder="Fabricante"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
              </div>

              <div className="input-group flex-grow-1">
                <input
                  type="number"
                  onChange={(event) => {
                    setTam_Lote_Kg(event.target.value);
                  }}
                  className="form-control"
                  value={tam_lote_kg !== "" ? parseFloat(tam_lote_kg).toFixed(0) : ""}
                  placeholder="Tamaño Lote Estandar"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
                <span className="input-group-text" id="basic-addon1">
                  kg
                </span>
              </div>

              <div className="input-group flex-grow-1">
                <input
                  type="number"
                  onChange={(event) => {
                    setTam_Lote_Gr(event.target.value);
                  }}
                  className="form-control"
                  value={tam_lote_gr}
                  placeholder="Tamaño Lote GR"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
                <span className="input-group-text" id="basic-addon1">
                  g
                </span>
              </div>

              <div className="input-group flex-grow-1">
                <input
                  type="number"
                  onChange={(event) => {
                    setTam_Lote_Piezas(event.target.value);
                  }}
                  className="form-control"
                  value={tam_lote_piezas}
                  placeholder="Tamaño Lote Piezas"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
                <span className="input-group-text" id="basic-addon1">
                  pzs
                </span>
              </div>

              <div className="input-group flex-grow-1">
                <input
                  type="number"
                  onChange={(event) => {
                    setRendimiento(event.target.value);
                  }}
                  className="form-control"
                  value={rendimiento}
                  placeholder="Rendimiento %"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
                <span className="input-group-text" id="basic-addon1">
                  %
                </span>
              </div>

              <div className="input-group flex-grow-1">
                <input
                  type="number"
                  onChange={(event) => {
                    setMerma(event.target.value);
                  }}
                  className="form-control"
                  value={merma}
                  placeholder="Merma %"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
                <div className="input-group flex-grow-1">
                  <input
                    type="number"
                    onChange={(event) => {
                      setPeso_Por_Sobre(event.target.value);
                    }}
                    className="form-control"
                    value={peso_por_sobre}
                    placeholder="Peso X Pieza"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ fontWeight: "bold" }}
                  />
                </div>
              </div>
            </div>
          </div>


          <div className="card text">
            <div className="card-header" style={{ backgroundColor: "#243A60", color: "#FFFFFF" }}>
              <strong> CODIGO INSUMO-------CANTIDAD X UNIDAD (mg)-----------NOMBRE INSUMO--------------TABLA INSUMO--------LOTE INSUMO------------%PESO / PESO----------PESO/LOTE-------------PESÓ------------VERIFICÓ</strong>
            </div>
            <div>
              {inputs.map((input, index) => (
                <div className="input-group flex-grow-1" key={index}>
                  {/* Campo Código Insumo */}
                  <input
                    type="number"
                    name="codigo_insumo"
                    onChange={(event) => handleInputChange(index, event)}
                    className="form-control"
                    value={input.codigo_insumo}
                    placeholder="Codigo Insumo"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ fontWeight: "bold", width: "55px", marginRight: "10px" }} // Ajusta el ancho del campo numérico aquí
                  />

                  {/* Campo Cantidad X Unidad */}
                  <input
                    type="number"
                    name="cantidad_ocupar_insumo"
                    onChange={(event) => handleInputChange(index, event)}
                    className="form-control"
                    value={input.cantidad_ocupar_insumo}
                    placeholder="Cantidad X Unidad"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ fontWeight: "bold", width: "80px", marginRight: "10px" }} // Ajusta el ancho del campo numérico aquí
                  />

                  {/* Campo Nombre Insumo */}
                  <input
                    type="text"
                    name="nombre_insumo"
                    onChange={handleInputChange2}
                    className="form-control"
                    value={input.nombre_insumo}
                    placeholder="Nombre Insumo"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ fontWeight: "bold", width: "200px" }} // Ajusta el ancho del campo de texto aquí
                    list="insumos-list"
                  />
                  <datalist id="insumos-list">
                    {[
                      ...insumosDisponibles.map((insumo) => ({
                        nombre: insumo.nombre_insumo,
                        total: insumo.total,
                        caducidad: insumo.fecha_caducidad,
                      })),
                      ...insumosClientes.map((insumoCliente) => ({
                        nombre: insumoCliente.nombre_insumos,
                        total: insumoCliente.total,
                        caducidad: insumoCliente.fecha_caducidad,
                      })),
                    ].map((insumo, index) => (
                      <option
                        key={index}
                        value={insumo.nombre}
                        onInput={() => handleSelectInsumo(insumo)}
                      >
                        {insumo.nombre} - Total: {insumo.total}gr - Caducidad: {insumo.caducidad}
                      </option>
                    ))}
                  </datalist>



                  <input
                    type="text"
                    name="tabla_insumo"
                    onChange={(event) => handleInputChange(index, event)}
                    className="form-control"
                    value={input.tabla_insumo}
                    placeholder="Tabla Insumo"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ fontWeight: "bold", width: "60px" }}
                  />
                  <input
                    type="text"
                    name="lote_insumo"
                    onChange={(event) => handleInputChange(index, event)}
                    className="form-control"
                    value={input.lote_insumo}
                    placeholder="Lote"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ fontWeight: "bold", width: "80px" }}
                  />

                  <input
                    type="number"
                    name="peso_porcentaje"
                    onChange={(event) => handleInputChange(index, event)}
                    className="form-control"
                    value={input.peso_porcentaje !== "" ? parseFloat(input.peso_porcentaje).toFixed(4) : ""}
                    placeholder="% Peso / Peso"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ fontWeight: "bold" }}

                  />
                  <span className="input-group-text" id="basic-addon1">
                    %
                  </span>


                  <input
                    type="number"
                    name="peso_lote"
                    onChange={(event) => handleInputChange(index, event)}
                    className="form-control"
                    value={input.peso_lote !== "" ? parseFloat(input.peso_lote).toFixed(4) : ""}
                    placeholder="Peso/ Lote"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ fontWeight: "bold" }}
                    disabled
                  />
                  <span className="input-group-text" id="basic-addon1">
                    g
                  </span>

                  <input
                    type="text"
                    name="peso_persona"
                    onChange={(event) => handleInputChange(index, event)}
                    className="form-control"
                    value={input.peso_persona}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ fontWeight: "bold" }}
                  />
                  <input
                    type="text"
                    name="persona_verifico"
                    onChange={(event) => handleInputChange(index, event)}
                    className="form-control"
                    value={input.persona_verifico}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ fontWeight: "bold" }}
                  />

                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
                <button
                  onClick={handleAddInput}
                  className="btn btn-success"
                  style={{ marginRight: "10px" }}
                >
                  Agregar campo
                </button>

                <button
                  onClick={() => handleRemoveInput(inputs.length - 1)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>

            </div>
          </div>
        </div>


        <div className="card text">
          <div className="card-header center" style={{ backgroundColor: "#243A60", color: "#FFFFFF" }}>
            <strong> INSUMOS ADICIONALES (NO AFECTA TOTAL X UNIDAD, NO AFECTA TOTAL %, NO AFECTA G--------------------------------------------------------------------------------------------PESÓ---------------------VERIFICÓ)</strong>
          </div>
          {inputs2.map((input, index) => (
            <div className="input-group flex-grow-1" key={index}>
              {/* Campo Código Insumo */}
              <input
                type="number"
                name="codigo_insumo"
                onChange={(event) => handleInputChange3(index, event)}
                className="form-control"
                value={input.codigo_insumo_2}
                placeholder="Codigo Insumo"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold", width: "3px", marginRight: "10px" }} // Ajusta el ancho del campo numérico aquí
              />

              {/* Campo Cantidad X Unidad */}
              <input
                type="number"
                name="cantidad_ocupar_insumo_2"
                onChange={(event) => handleInputChange3(index, event)}
                className="form-control"
                value={input.cantidad_ocupar_insumo_2}
                placeholder="Cantidad X Unidad"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold", width: "5px", marginRight: "10px" }} // Ajusta el ancho del campo numérico aquí
              />

              {/* Campo Nombre Insumo */}
              <input
                type="text"
                name="nombre_insumo"
                onChange={handleInputChange4}
                className="form-control"
                value={input.nombre_insumo_2}
                placeholder="Nombre Insumo"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold", width: "170px" }} // Ajusta el ancho del campo de texto aquí
                list="insumos-list2"
              />

              <datalist id="insumos-list2">
                {[
                  ...insumosDisponibles2.map((insumo2) => ({
                    nombre: insumo2.nombre_insumo,
                    total: insumo2.total,
                    caducidad: insumo2.fecha_caducidad,
                  })),
                  ...insumosClientes2.map((insumoCliente2) => ({
                    nombre: insumoCliente2.nombre_insumos,
                    total: insumoCliente2.total,
                    caducidad: insumoCliente2.fecha_caducidad,
                  })),
                ].map((insumo2, index) => (
                  <option
                    key={index}
                    value={insumo2.nombre}
                    onInput={() => handleSelectInsumo2(insumo2)}
                  >
                    {insumo2.nombre} - Total: {insumo2.total}gr - Caducidad: {insumo2.caducidad}
                  </option>
                ))}
              </datalist>


              <input
                type="text"
                name="tabla_insumo_2"
                onChange={(event) => handleInputChange3(index, event)}
                className="form-control"
                value={input.tabla_insumo_2}
                placeholder="Tabla Insumo"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold", width: "60px" }}
              />
              <input
                type="text"
                name="lote_insumo"
                onChange={(event) => handleInputChange3(index, event)}
                className="form-control"
                value={input.lote_insumo_2}
                placeholder="Lote"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold" }}
              />


              <input
                type="number"
                name="peso_lote_2"
                onChange={(event) => handleInputChange3(index, event)}
                className="form-control"
                value={input.peso_lote_2 !== "" ? parseFloat(input.peso_lote_2).toFixed(4) : ""}
                placeholder="Peso/ Lote"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold" }}
                disabled
              />
              <span className="input-group-text" id="basic-addon1">
                g
              </span>

              <input
                type="text"
                name="peso_persona"
                onChange={(event) => handleInputChange(index, event)}
                className="form-control"
                value={input.peso_persona}
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold" }}
              />
              <input
                type="text"
                name="persona_verifico"
                onChange={(event) => handleInputChange(index, event)}
                className="form-control"
                value={input.persona_verifico}
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold" }}
              />

            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
            <button
              onClick={handleAddInput2}
              className="btn btn-success"
              style={{ marginRight: "10px" }}
            >
              Agregar campo
            </button>

            <button
              onClick={() => handleRemoveInput2(inputs2.length - 1)}
              className="btn btn-danger"
            >
              Eliminar
            </button>
          </div>

          <div className="card text">
            <div className="card-header center" style={{ backgroundColor: "#243A60", color: "#FFFFFF" }}>
              <strong>INSUMOS ACONDICIONAMIENTO ---------------------------------------------------------------------------------------------------------------------------------------------------------------------PESÓ----------------VERIFICÓ</strong>
            </div>
          </div>

          {inputs3.map((input, index) => (
            <div className="input-group flex-grow-1" key={index}>
              {/* Campo Código Insumo */}
              <input
                type="number"
                name="codigo_insumo_3"
                onChange={(event) => handleInputChange6(index, event)}
                className="form-control"
                value={input.codigo_insumo_3}
                placeholder="Codigo Insumo"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold", width: "3px", marginRight: "10px" }} // Ajusta el ancho del campo numérico aquí
              />

              {/* Campo Cantidad X Unidad */}
              <input
                type="number"
                name="cantidad_ocupar_insumo_3"
                onChange={(event) => handleInputChange6(index, event)}
                className="form-control"
                value={input.cantidad_ocupar_insumo_3}
                placeholder="Pieza X Unidad"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold", width: "5px", marginRight: "10px" }} // Ajusta el ancho del campo numérico aquí
              />

              {/* Campo Nombre Insumo */}
              <input
                type="text"
                name="nombre_insumo_3"
                onChange={(event) => handleInputChange8(event)}
                className="form-control"
                value={input.nombre_insumo_3}
                placeholder="Nombre Insumo"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold", width: "170px" }} // Ajusta el ancho del campo de texto aquí
                list="insumos-list3"
              />

              <datalist id="insumos-list3">
                {[
                  ...insumosDisponibles3.map((insumo3) => ({
                    nombre: insumo3.nombre_insumo,
                    total: insumo3.total,
                    caducidad: insumo3.fecha_caducidad,
                  })),
                  ...insumosClientes3.map((insumoCliente3) => ({
                    nombre: insumoCliente3.nombre_insumos,
                    total: insumoCliente3.total,
                    caducidad: insumoCliente3.fecha_caducidad,
                  })),
                ].map((insumo3, index) => (
                  <option
                    key={index}
                    value={insumo3.nombre}
                    onInput={() => handleSelectInsumo3(insumo3)}
                  >
                    {insumo3.nombre} - Total: {insumo3.total}gr - Caducidad: {insumo3.caducidad}
                  </option>
                ))}
              </datalist>


              <input
                type="text"
                name="tabla_insumo"
                onChange={(event) => handleInputChange6(index, event)}
                className="form-control"
                value={input.tabla_insumo_3}
                placeholder="Tabla Insumo"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold", width: "60px" }}
              />

              <input
                type="text"
                name="lote_insumo_3"
                onChange={(event) => handleInputChange6(index, event)}
                className="form-control"
                value={input.lote_insumo_3}
                placeholder="Lote"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold" }}
              />

              <input
                type="text"
                name="peso_lote_3"
                onChange={(event) => handleInputChange6(index, event)}
                className="form-control"
                value={input.peso_lote_3 !== "" ? parseFloat(input.peso_lote_3).toFixed(0) : ""}
                placeholder="Pieza X Lote"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold" }}
                disabled // Para evitar que el usuario modifique este valor manualmente
              />
              <span className="input-group-text" id="basic-addon1">
                pzas x lote
              </span>


              <input
                type="text"
                name="peso_persona_3"
                onChange={(event) => handleInputChange(index, event)}
                className="form-control"
                value={input.peso_persona}
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold" }}
              />

              <input
                type="text"
                name="persona_verifico_3"
                onChange={(event) => handleInputChange(index, event)}
                className="form-control"
                value={input.persona_verifico}
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold" }}
              />
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
            <button
              onClick={handleAddInput3}
              className="btn btn-success"
              style={{ marginRight: "10px" }}
            >
              Agregar campo
            </button>

            <button
              onClick={() => handleRemoveInput3(inputs3.length - 1)}
              className="btn btn-danger"
            >
              Eliminar
            </button>
          </div>




          <div className="card text">
            <div className="card-header" style={{ backgroundColor: "#243A60", color: "#FFFFFF", textAlign: "left" }}>
              <strong> PESO POR ML (MG)--TOTAL MG/SOBRE-------------------------------------------TOTAL PESO / PESO %------------------------------------------------------------TOTAL PESO/LOTE G</strong>
            </div>
            <div className="card-body" style={{ display: "flex", justifyContent: "center" }}>
              <div className="input-group flex-grow-1" style={{ marginRight: "20px" }}>
                <input
                  type="number"
                  onChange={(event) => {
                    setTotal_Mg_Sobre(parseInt(event.target.value) || null);
                  }}
                  className="form-control"
                  value={total_mg_sobre}
                  placeholder="Total Mg/Sobre"
                  aria-label="Total Mg/Sobre"
                  style={{ fontWeight: "bold" }}
                  disabled
                />
                <span style={{ marginLeft: "5px", fontSize: "25px", color: "#999", fontStyle: "italic" }}>TOTAL X UNIDAD</span>
              </div>
              <div className="input-group flex-grow-1" style={{ marginRight: "20px" }}>
                <input
                  type="number"
                  onChange={(event) => {
                    setTotal_Peso_Peso(parseInt(event.target.value) || null);
                  }}
                  className="form-control"
                  value={total_peso_peso}
                  placeholder="Total Peso/Peso"
                  aria-label="Total Peso/Peso"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                  disabled
                />
                <span style={{ marginLeft: "5px", fontSize: "25px", color: "#999", fontStyle: "italic" }}>TOTAL %</span>
              </div>
              <div className="input-group flex-grow-1">
                <input
                  type="number"
                  onChange={(event) => {
                    setTotal_Peso_Lote(parseInt(event.target.value) || null);
                  }}
                  className="form-control"
                  value={total_peso_lote}
                  placeholder="Total Peso/Lote"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                  disabled
                />
                <span style={{ marginLeft: "5px", fontSize: "25px", color: "#999", fontStyle: "italic" }}>TOTAL G</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card text center">
        <div className="card-header center" style={{ backgroundColor: "#243A60", color: "#FFFFFF" }}>
          <strong>EMITIO--------------------------------------------------------------------------------------------------VERIFICÓ-------------------------------------------------------------------------------------EJECUTÓ</strong>
        </div>
        <div className="card-body">
          <div className="card-body d-flex">
            <div className="input-group flex-grow-1">
              <input
                type="text"
                onChange={(event) => {
                  setPersona_Emitio(event.target.value);
                }}
                className="form-control"
                value={persona_emitio}
                placeholder="Emitió"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold" }}
              />
              <div className="input-group flex-grow-1">
                <input
                  type="date"
                  onChange={(event) => {
                    setFecha1(event.target.value);
                  }}
                  className="form-control"
                  value={fecha1}
                  placeholder="Fecha"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
              </div>
            </div>

            <div className="input-group flex-grow-1">
              <input
                type="text"
                onChange={(event) => {
                  setPersona_Verifico2(event.target.value);
                }}
                className="form-control"
                value={persona_verifico2}
                placeholder="Verificó"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold" }}
              />
              <div className="input-group flex-grow-1">
                <input
                  type="date"
                  onChange={(event) => {
                    setFecha2(event.target.value);
                  }}
                  className="form-control"
                  value={fecha2}
                  placeholder="Fecha"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
              </div>
            </div>

            <div className="input-group flex-grow-1">
              <input
                type="text"
                onChange={(event) => {
                  setPersona_Ejecuto(event.target.value);
                }}
                className="form-control"
                value={persona_ejecuto}
                placeholder="Ejecutó"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ fontWeight: "bold" }}
              />
              <div className="input-group flex-grow-1">
                <input
                  type="date"
                  onChange={(event) => {
                    setFecha3(event.target.value);
                  }}
                  className="form-control"
                  value={fecha3}
                  placeholder="Fecha"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ fontWeight: "bold" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="col">
            <div className="form-group">
              <label htmlFor="motivo_fabricacion" style={{ fontWeight: "bold" }}>
                Motivo de Fabricación:
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="motivo_fabricacion"
                  onChange={(event) => {
                    setMotivo_Fabricacion(event.target.value);
                  }}
                  value={motivo_fabricacion}
                  placeholder="Motivo de Fabricación"
                  aria-label="Motivo de Fabricación"
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="observaciones" style={{ fontWeight: "bold" }}>
                Observaciones:
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="observaciones"
                  onChange={(event) => {
                    setObservaciones(event.target.value);
                  }}
                  value={observaciones}
                  placeholder="Observaciones"
                  aria-label="Observaciones"
                />
              </div>
            </div>
          </div>
        </div>



        <button className='btn btn-success' style={{ marginTop: '20px' }} onClick={add}>Fabricar Orden</button>



      </div>
      <footer style={{ backgroundColor: '#243A60', color: '#FFFFFF', width: '100%', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
        {/* Aquí puedes agregar el contenido del pie de página */}
        <p style={{ fontSize: '20px', margin: '0' }}>Derechos de Autor © {new Date().getFullYear()} LABORATORIOS FORGAMA S.A DE C.V. Todos los derechos reservados.</p>
        {/* Otros elementos del pie de página, como enlaces adicionales, pueden ir aquí */}
      </footer>
    </div>
  )
}

export default RegistroOrdenesFabricacion;  