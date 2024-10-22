const router = require('express').Router();
const db = require('../../database/conexion');

// Declaracion de parametros para la insercion de ventas //////////////////// VENTAS ////////////////////////////////////////////////////////

router.post("/registrar_Venta",(req,res)=>{
    const nombre_vendedor = req.body.nombre_vendedor;
    const nombre_cliente = req.body.nombre_cliente;
    const datos_cliente = req.body.datos_cliente;
    const nombre_producto = req.body.nombre_producto;
    const fecha_venta = req.body.fecha_venta;
    const cantidad = req.body.cantidad;
    const unidades = req.body.unidades;
    const observaciones = req.body.observaciones;

    
    // Instruccion SQL para la insercionn de ventas con sus respectivos parametros //////////////////// VENTAS /////////////////
    db.query('INSERT INTO ventas(nombre_vendedor,nombre_cliente,datos_cliente,nombre_producto,fecha_venta,cantidad,unidades,observaciones) VALUES(?,?,?,?,?,?,?,?)',[nombre_vendedor,nombre_cliente,datos_cliente,nombre_producto,fecha_venta,cantidad,unidades,observaciones],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Consulta para traer a todas las ordenes de ventas //////////////////// VENTAS /////////////////
router.get("/obtener_Venta",(req,res)=>{
    console.log('ventas')
    db.query('SELECT * FROM ventas',
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Metodo Actualizar //////////////////// VENTAS /////////////////

router.put("/actualizar_Venta",(req,res)=>{
    const id_venta = req.body.id_venta;
    const nombre_vendedor = req.body.nombre_vendedor;
    const nombre_cliente = req.body.nombre_cliente;
    const datos_cliente = req.body.datos_cliente;
    const nombre_producto = req.body.nombre_producto;
    const fecha_venta = req.body.fecha_venta;
    const cantidad = req.body.cantidad;
    const unidades = req.body.unidades;
    const observaciones = req.body.observaciones;
    
    // Instruccion SQL para actualizar la informacion de la venta //////////////////// VENTAS /////////////////
    db.query('UPDATE ventas SET nombre_vendedor=?,nombre_cliente=?,datos_cliente=?,nombre_producto=?,fecha_venta=?,cantidad=?,unidades=?,observaciones=? WHERE id_venta=?',[nombre_vendedor,nombre_cliente,datos_cliente,nombre_producto,fecha_venta,cantidad,unidades,observaciones,id_venta],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Metodo para eliminar ventas //////////////////// VENTAS /////////////////

router.delete("/eliminar_Venta/:id_venta",(req,res)=>{
    
    const id_venta= req.params.id_venta;
    
    // Instruccion SQL para la eliminacion de las ventas //////////////////// VENTAS /////////////////
    db.query('DELETE FROM ventas WHERE id_venta=?',id_venta,
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