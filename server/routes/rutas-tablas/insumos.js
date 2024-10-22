const router = require('express').Router();
const db = require('../../database/conexion');

// Declaracion de parametros para la insercion de insumos //////////////////// INSUMOS /////////////////////////////////////////////////////////////////////

router.post("/registrar_Insumo",(req,res)=>{
    const nombre_insumo = req.body.nombre_insumo;
    const unidad_medicion = req.body.unidad_medicion;
    const fabricante = req.body.fabricante;
    const distribuidora = req.body.distribuidora;
    const lote = req.body.lote;
    const tabla_insumo = req.body.tabla_insumo;
    const fecha_ingreso = req.body.fecha_ingreso;
    const fecha_caducidad = req.body.fecha_caducidad;
    const num_piezas = req.body.num_piezas;
    const cantidad_unidad = req.body.cantidad_unidad;
    const total = req.body.total;
    const codigo_insumo = req.body.codigo_insumo;
    const codigo_categoria = req.body.codigo_categoria;
    const codigo_estatus = req.body.codigo_estatus;
    const codigo_final = req.body.codigo_final;
    const observaciones = req.body.observaciones;

 
    // Instruccion SQL para la insercionn de insumos con sus respectivos parametros //////////////////// INSUMOS /////////////////
    db.query('INSERT INTO insumos(nombre_insumo,unidad_medicion,fabricante,distribuidora,lote,tabla_insumo,fecha_ingreso,fecha_caducidad,num_piezas,cantidad_unidad,total,codigo_insumo,codigo_categoria,codigo_estatus,codigo_final,observaciones) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[nombre_insumo,unidad_medicion,fabricante,distribuidora,lote,tabla_insumo,fecha_ingreso,fecha_caducidad,num_piezas,cantidad_unidad,total,codigo_insumo,codigo_categoria,codigo_estatus,codigo_final,observaciones],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Consulta para traer a todos los insumos //////////////////// INSUMOS /////////////////
router.get("/obtener_Insumos",(req,res)=>{
    console.log('insumos')
    db.query('SELECT * FROM insumos',
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Metodo Actualizar //////////////////// INSUMOS /////////////////

router.put("/actualizar_Insumo",(req,res)=>{
    const id_insumo = req.body.id_insumo;
    const nombre_insumo = req.body.nombre_insumo;
    const unidad_medicion = req.body.unidad_medicion;
    const fabricante = req.body.fabricante;
    const distribuidora = req.body.distribuidora;
    const lote = req.body.lote;
    const tabla_insumo = req.body.tabla_insumo;
    const fecha_ingreso = req.body.fecha_ingreso;
    const fecha_caducidad = req.body.fecha_caducidad;
    const num_piezas = req.body.num_piezas;
    const cantidad_unidad = req.body.cantidad_unidad;
    const total = req.body.total;
    const codigo_insumo = req.body.codigo_insumo;
    const codigo_categoria = req.body.codigo_categoria;
    const codigo_estatus = req.body.codigo_estatus;
    const codigo_final = req.body.codigo_final;    
    const observaciones = req.body.observaciones;
    
    
    // Instruccion SQL para actualizar la informacion de los insumos //////////////////// INSUMOS /////////////////
    db.query('UPDATE insumos SET nombre_insumo=?,unidad_medicion=?,fabricante=?,distribuidora=?,lote=?,tabla_insumo=?,fecha_ingreso=?,fecha_caducidad=?,num_piezas=?,cantidad_unidad=?,total=?,codigo_insumo=?,codigo_categoria=?,codigo_estatus=?,codigo_final=?,observaciones=? WHERE id_insumo=?',[nombre_insumo,unidad_medicion,fabricante,distribuidora,lote,tabla_insumo,fecha_ingreso,fecha_caducidad,num_piezas,cantidad_unidad,total,codigo_insumo,codigo_categoria,codigo_estatus,codigo_final,observaciones,id_insumo],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Metodo para eliminar registros //////////////////// INSUMOS /////////////////

router.delete("/eliminar_Insumo/:id_insumo",(req,res)=>{
    
    const id_insumo = req.params.id_insumo;
    
    // Instruccion SQL para la eliminacion de empleados //////////////////// INSUMOS /////////////////
    db.query('DELETE FROM insumos WHERE id_insumo=?',id_insumo,
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
    }
    );
});



module.exports = router;