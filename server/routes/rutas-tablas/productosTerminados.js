const router = require('express').Router();
const db = require('../../database/conexion');


// Declaracion de parametros para la insercion de productos terminados //////////////////// PRODUCTOS TERMINADOS ////////////////////////////////////////////////////////

router.post("/registrar_Producto_Terminado",(req,res)=>{
    const nombre_producto = req.body.nombre_producto;
    const estatus_producto = req.body.estatus_producto;
    const lote = req.body.lote;
    const fecha_caducidad = req.body.fecha_caducidad;
    const piezas = req.body.piezas;
    const codigo_producto_terminado = req.body.codigo_producto_terminado;
    const fecha_fabricacion = req.body.fecha_fabricacion;
    const observaciones = req.body.observaciones;

    // Instruccion SQL para la insercionn de productos con sus respectivos parametros //////////////////// PRODUCTOS TERMINADOS /////////////////
    db.query('INSERT INTO productos_terminados(nombre_producto,estatus_producto,lote,fecha_caducidad,piezas,codigo_producto_terminado,fecha_fabricacion,observaciones) VALUES(?,?,?,?,?,?,?,?)',[nombre_producto,estatus_producto,lote,fecha_caducidad,piezas,codigo_producto_terminado,fecha_fabricacion,observaciones],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Consulta para traer a todos los productos terminados //////////////////// PRODUCTOS TERMINADOS /////////////////
router.get("/obtener_Producto_Terminado",(req,res)=>{
    console.log('ventas')
    db.query('SELECT * FROM productos_terminados',
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Metodo Actualizar //////////////////// PRODUCTOS TERMINADOS /////////////////

router.put("/actualizar_Producto_Terminado",(req,res)=>{
    const id_producto = req.body.id_producto;
    const nombre_producto = req.body.nombre_producto;
    const estatus_producto = req.body.estatus_producto;
    const lote = req.body.lote;
    const fecha_caducidad = req.body.fecha_caducidad;
    const piezas = req.body.piezas;
    const codigo_producto_terminado = req.body.codigo_producto_terminado;
    const fecha_fabricacion = req.body.fecha_fabricacion;
    const observaciones = req.body.observaciones;
    
    // Instruccion SQL para actualizar la informacion de la venta //////////////////// VENTAS /////////////////
    db.query('UPDATE productos_terminados SET nombre_producto=?,estatus_producto=?,lote=?,fecha_caducidad=?,piezas=?,codigo_producto_terminado=?,fecha_fabricacion=?,observaciones=? WHERE id_producto=?',[nombre_producto,estatus_producto,lote,fecha_caducidad,piezas,codigo_producto_terminado,fecha_fabricacion,observaciones,id_producto],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Metodo para eliminar productos Terminados //////////////////// PRODUCTO TERMINADO /////////////////

router.delete("/eliminar_Producto_Terminado/:id_producto",(req,res)=>{
    
    const id_producto= req.params.id_producto;
    
    // Instruccion SQL para la eliminacion de las ventas //////////////////// VENTAS /////////////////
    db.query('DELETE FROM productos_terminados WHERE id_producto=?',id_producto,
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