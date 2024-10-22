const router = require('express').Router();
const db = require('../../database/conexion');

// Declaracion de parametros para la insercion de empleados //////////////////// EMPLEADOS ////////////////////////////////////////////////////////

router.post("/registrar_Empleado",(req,res)=>{
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const genero = req.body.genero;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const formacion_academica = req.body.formacion_academica;
    const puesto_empleado = req.body.puesto_empleado;
    const correo = req.body.correo;
    const rfc = req.body.rfc;
    const imss = req.body.imss;
    const curp = req.body.curp;
    const estatus_empleado = req.body.estatus_empleado;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const contrato = req.body.contrato;
    
    // Instruccion SQL para la insercionn de empleados con sus respectivos parametros //////////////////// EMPLEADOS /////////////////
    db.query('INSERT INTO empleados(nombre,apellidos,genero,fecha_nacimiento,formacion_academica,puesto_empleado,correo,rfc,imss,curp,estatus_empleado,direccion,telefono,contrato) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[nombre,apellidos,genero,fecha_nacimiento,formacion_academica,puesto_empleado,correo,rfc,imss,curp,estatus_empleado,direccion,telefono,contrato],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Consulta para traer a todos los empleados //////////////////// EMPLEADOS /////////////////
router.get("/obtener_Empleados",(req,res)=>{
    console.log('empleados')
    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log('This is my error:')
            console.log(err)
            console.log('Mensaje '+err.message)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Metodo Actualizar //////////////////// EMPLEADOS /////////////////

router.put("/actualizar_Empleado",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const genero = req.body.genero;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const formacion_academica = req.body.formacion_academica;
    const puesto_empleado = req.body.puesto_empleado;
    const correo = req.body.correo;
    const rfc = req.body.rfc;
    const imss = req.body.imss;
    const curp = req.body.curp;
    const estatus_empleado = req.body.estatus_empleado;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const contrato = req.body.contrato;
    
    
    // Instruccion SQL para actualizar la informacion del empleado //////////////////// EMPLEADOS /////////////////
    db.query('UPDATE empleados SET nombre=?,apellidos=?,genero=?,fecha_nacimiento=?,formacion_academica=?,puesto_empleado=?,correo=?,rfc=?,imss=?,curp=?,estatus_empleado=?,direccion=?,telefono=?,contrato=? WHERE id=?',[nombre,apellidos,genero,fecha_nacimiento,formacion_academica,puesto_empleado,correo,rfc,imss,curp,estatus_empleado,direccion,telefono,contrato,id],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
        
    }
    );
});

// Metodo para eliminar registros //////////////////// EMPLEADOS /////////////////

router.delete("/eliminar_Empleado/:id",(req,res)=>{
    
    const id = req.params.id;
    
    // Instruccion SQL para la eliminacion de empleados //////////////////// EMPLEADOS /////////////////
    db.query('DELETE FROM empleados WHERE id=?',id,
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