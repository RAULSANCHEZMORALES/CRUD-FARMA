const router = require('express').Router();
const db = require('../../database/conexion');

// Declaracion de parametros para la insercion de insumos clientes //////////////////// INSUMOS CLIENTES /////////////////////////////////////////////////////////////////////

router.post("/registrar_Insumos_Clientes",(req,res)=>{
    
    const nombre_cliente = req.body.nombre_cliente;
    const nombre_insumos = req.body.nombre_insumos;
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


 
    // Instruccion SQL para la insercionn de insumos con sus respectivos parametros //////////////////// INSUMOS CLIENTES /////////////////
    db.query('INSERT INTO insumos_clientes(nombre_cliente,nombre_insumos,unidad_medicion,fabricante,distribuidora,lote,tabla_insumo,fecha_ingreso,fecha_caducidad,num_piezas,cantidad_unidad,total,codigo_insumo,codigo_categoria,codigo_estatus,codigo_final,observaciones) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[nombre_cliente,nombre_insumos,unidad_medicion,fabricante,distribuidora,lote,tabla_insumo,fecha_ingreso,fecha_caducidad,num_piezas,cantidad_unidad,total,codigo_insumo,codigo_categoria,codigo_estatus,codigo_final,observaciones],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Consulta para traer a todos los insumos clientes //////////////////// INSUMOS CLIENTES /////////////////
router.get("/obtener_Insumos_Clientes",(req,res)=>{
    console.log('insumos clientes')
    db.query('SELECT * FROM insumos_clientes',
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Metodo Actualizar Insumos Clientes //////////////////// INSUMOS CLIENTES /////////////////

router.put("/actualizar_Insumos_Clientes",(req,res)=>{
    const id_insumos = req.body.id_insumos;
    const nombre_cliente = req.body.nombre_cliente;
    const nombre_insumos = req.body.nombre_insumos;
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
    
    
    // Instruccion SQL para actualizar la informacion de los insumos clientes //////////////////// INSUMOS CLIENTES /////////////////
    db.query('UPDATE insumos_clientes SET nombre_cliente=?,nombre_insumos=?,unidad_medicion=?,fabricante=?,distribuidora=?,lote=?,tabla_insumo=?,fecha_ingreso=?,fecha_caducidad=?,num_piezas=?,cantidad_unidad=?,total=?,codigo_insumo=?,codigo_categoria=?,codigo_estatus=?,codigo_final=?,observaciones=? WHERE id_insumos=?',[nombre_cliente,nombre_insumos,unidad_medicion,fabricante,distribuidora,lote,tabla_insumo,fecha_ingreso,fecha_caducidad,num_piezas,cantidad_unidad,total,codigo_insumo,codigo_categoria,codigo_estatus,codigo_final,observaciones,id_insumos],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Metodo para eliminar registros Insumos Clientes //////////////////// INSUMOS CLIENTES /////////////////

router.delete("/eliminar_Insumos_Clientes/:id_insumos",(req,res)=>{
    
    const id_insumos = req.params.id_insumos;
    
    // Instruccion SQL para la eliminacion de empleados //////////////////// INSUMOS /////////////////
    db.query('DELETE FROM insumos_clientes WHERE id_insumos=?',id_insumos,
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