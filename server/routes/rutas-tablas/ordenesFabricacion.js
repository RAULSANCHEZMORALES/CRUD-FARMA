const router = require('express').Router();
const db = require('../../database/conexion');

// Declaracion de parametros para la generacion de ordenes de fabricacion //////////////////// ORDENES FABRICACION /////////////////////////////////////////////////////////////////////

router.post("/verificar_realizacion_Ordenes_Fabricacion", async (req, res) => {

  const { datos, datos2, datos3 } = req.body;

  //Guardar las diferencias en la primera vuelta en caso que se llegue a actualizar
  const diferencia_datos = [];
  const diferencia_datos2 = [];
  const diferencia_datos3 = [];

  //Arreglo donde se guardan todos los insumos que son insuficientes para después mostrarlos
  const error_insuficientes = [];

  //VERIFICACION/////////////////////////////////////////////////////////////////////
  // DATOS 1ED   
  for (const dato of datos) {
    //Obtener el total del insumo y verificar si existe

    try {
      const resultadoBD = new Promise((resolve, reject) => {
        db.query(`SELECT total FROM ${dato.tabla_insumo} WHERE id_insumo${dato.tabla_insumo==="insumos_clientes" ? 's':''}=${dato.codigo_insumo}`, (err, resultado) => {
          if (err) {
            reject("Hubo un problema al obtener el total del insumo1");
          }
          resolve(resultado[0]); //Un objeto viene dentro de un arreglo por eso se toma la posición cero para agarrar el objeto
        });
      })

      const resultado = await resultadoBD;
      //Imprimir resultado del resultado de la base de datos
      console.log('Resultado');
      console.log(resultado);

      //Checar si el resultado de la operación de trae algo
      if (!resultado || !resultado.total) {
        error_insuficientes.push(`No se encontró el insumo con ID ${dato.codigo_insumo}`);
        console.log('Resultado no encontrado del insumo con ID ' + dato.codigo_insumo);
        continue;
      }

      //Si trae algo se puede obtener el total del resultado
      const total = resultado.total;
      const cantidadRestar = Number.parseFloat(dato.peso_lote);

      //Verificar si es suficiente realizar la resta
      if (cantidadRestar > total) {
        error_insuficientes.push(
          `El insumo ${dato.nombre_insumo} con el ID ${dato.codigo_insumo} en la tabla de ${dato.tabla_insumo} es insuficiente CANTIDAD A PEDIR: ${cantidadRestar}gr, CANTIDAD EN EXISTENCIA: ${total}gr`
        );
      }
      else {
        //Guardar la diferencia de la resta
        const diferencia = total - cantidadRestar;
        diferencia_datos.push({
          'codigo_insumo': dato.codigo_insumo,
          'tabla': dato.tabla_insumo,
          'diferencia': diferencia
        });
      }
    }
    catch (err) {
      console.log(`Dentro del catch ${err}`);
      error_insuficientes.push(`No se encontró el insumo con ID ${dato.codigo_insumo}`);
      console.log('Resultado no encontrado del insumo con ID ' + dato.codigo_insumo);
      continue;
    }
  

  }

  // DATOS 2
  for (const dato of datos2) {
    //Obtener el total del insumo y verificar si existe

    try {
      const resultado = await new Promise((resolve, reject) => {
        db.query(`SELECT total FROM ${dato.tabla_insumo_2} WHERE id_insumo${dato.tabla_insumo_2==="insumos_clientes" ? 's':''}=${dato.codigo_insumo_2}`, (err, resultado) => {
          if (err) {
            reject("Hubo un problema al obtener el total del insumo1");
          }
          else {
            resolve(resultado[0]); //Un objeto viene dentro de un arreglo por eso se toma la posición cero para agarrar el objeto
          }
        });
      });

      //Imprimir resultado del resultado de la base de datos
      console.log('Resultado');
      console.log(resultado);

      //Checar si el resultado de la operación de trae algo
      if (!resultado || !resultado.total) {
        error_insuficientes.push(`No se encontró el insumo con ID ${dato.codigo_insumo_2}`);
        console.log('Resultado no encontrado del insumo con ID ' + dato.codigo_insumo_2);
        continue;
      }

      //Si trae algo se puede obtener el total del resultado
      const total = resultado.total;
      const cantidadRestar = Number.parseFloat(dato.peso_lote_2);

      //Verificar si es suficiente realizar la resta
      if (cantidadRestar > total) {
        error_insuficientes.push(
          `El insumo ${dato.nombre_insumo_2} con el ID ${dato.codigo_insumo_2} en la tabla de ${dato.tabla_insumo_2}  es insuficiente CANTIDAD A PEDIR: ${cantidadRestar}gr, CANTIDAD EN EXISTENCIA: ${total}gr`
        );
      }
      else {
        //Guardar la diferencia de la resta
        const diferencia = total - cantidadRestar;
        diferencia_datos2.push({
          'codigo_insumo': dato.codigo_insumo_2,
          'tabla': dato.tabla_insumo_2,
          'diferencia': diferencia
        });
      }
    }
    catch (err) {
      console.log(`Dentro del catch ${err}`);
      error_insuficientes.push(`No se encontró el insumo con ID ${dato.codigo_insumo_2}`);
      console.log('Resultado no encontrado del insumo con ID ' + dato.codigo_insumo_2);
    }
  }

  // DATOS 3
  for (const dato of datos3) {
    //Obtener el total del insumo y verificar si existe
    try {
      const resultado = await new Promise((resolve, reject) => {
        db.query(`SELECT total FROM ${dato.tabla_insumo_3} WHERE id_insumo${dato.tabla_insumo_3==="insumos_clientes" ? 's':''}=${dato.codigo_insumo_3}`, (err, resultado) => {
          if (err) {
            reject("Hubo un problema al obtener el total del insumo1");
          }
          else {
            resolve(resultado[0]); //Un objeto viene dentro de un arreglo por eso se toma la posición cero para agarrar el objeto
          }
        });
      });

      //Imprimir resultado del resultado de la base de datos
      console.log('Resultado');
      console.log(resultado);

      //Checar si el resultado de la operación de trae algo
      if (!resultado || !resultado.total) {
        error_insuficientes.push(`No se encontró el insumo con ID ${dato.codigo_insumo_3}`);
        console.log('Resultado no encontrado del insumo con ID ' + dato.codigo_insumo_3);
        continue;
      }

      //Si trae algo se puede obtener el total del resultado
      const total = resultado.total;
      const cantidadRestar = Number.parseFloat(dato.peso_lote_3);

      //Verificar si es suficiente realizar la resta
      if (cantidadRestar > total) {
        error_insuficientes.push(
          `El insumo ${dato.nombre_insumo_3} con el ID ${dato.codigo_insumo_3} en la tabla de ${dato.tabla_insumo_3}  es insuficiente CANTIDAD A PEDIR: ${cantidadRestar}gr, CANTIDAD EN EXISTENCIA: ${total}gr`
        );
      }
      else {
        //Guardar la diferencia de la resta
        const diferencia = total - cantidadRestar;
        diferencia_datos3.push({
          'codigo_insumo': dato.codigo_insumo_3,
          'tabla': dato.tabla_insumo_3,
          'diferencia': diferencia
        });
      }
    }
    catch (err) {
      console.log(`Dentro del error ${err}`)
      error_insuficientes.push(`No se encontró el insumo con ID ${dato.codigo_insumo_3}`);
      console.log('Resultado no encontrado del insumo con ID ' + dato.codigo_insumo_3);
    }
  }

  //CHECAR SI HAY DATOS INSUFICIENTES
  if (error_insuficientes.length > 0) {
    console.log("Insumos Insuficientes");
    console.log(error_insuficientes);
    res.json({ success: false, errorMessages:error_insuficientes });
  }
  else {
    //ACTUALIZACIÓN/////////////////////////////////////////////////////////////////////

    // DATOS 1
    for (const dato of diferencia_datos) {

      try {
        const actualizacion_promesa = await new Promise((resolve, reject) => {
          db.query(`UPDATE ${dato.tabla} SET total=? WHERE id_insumo${dato.tabla==="insumos_clientes" ? 's':''}=?`, [dato.diferencia, dato.codigo_insumo], (err, result) => {
            if (err) reject(err);
            else {
              resolve(`Actualización de la tabla con el código de insumo ${dato.codigo_insumo}`);
            }
          });
        });

        console.log(actualizacion_promesa)
      }
      catch(err) {
        console.log(`Hubo un error al realizar la actualización del insumo ${dato.codigo_insumo}`)
      }
        
    }

    // DATOS 2
    for (const dato of diferencia_datos2) {

      try {
        const actualizacion_promesa = await new Promise((resolve, reject) => {
          db.query(`UPDATE ${dato.tabla} SET total=? WHERE id_insumo${dato.tabla==="insumos_clientes" ? 's':''}=?`, [dato.diferencia, dato.codigo_insumo], (err, result) => {
            if (err) reject(err);
            else {
              resolve(`Actualización de la tabla con el código de insumo ${dato.codigo_insumo}`);
            }
          });
        });
  
        console.log(actualizacion_promesa)
      }
      catch(err) {
        console.log(`Hubo un error al realizar la actualización del insumo ${dato.codigo_insumo}`)
      }
    }

    // DATOS 3
    for (const dato of diferencia_datos3) {

      try {
        const actualizacion_promesa = await new Promise((resolve, reject) => {
          db.query(`UPDATE ${dato.tabla} SET total=? WHERE id_insumo${dato.tabla==="insumos_clientes" ? 's':''}=?`, [dato.diferencia, dato.codigo_insumo], (err, result) => {
            if (err) reject(err);
            else {
              resolve(`Actualización de la tabla con el código de insumo ${dato.codigo_insumo}`);
            }
          });
        });

        console.log(actualizacion_promesa)
      }
      catch(err) {
        console.log(`Hubo un error al realizar la actualización del insumo ${dato.codigo_insumo}`)
      }

    }

    res.json({ success: true, 'msg': 'Se ha realizado la operación con éxito :)' });
  }

});

module.exports = router;
