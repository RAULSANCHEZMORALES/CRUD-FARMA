const router = require('express').Router();
const empleadoRouter = require('./rutas-tablas/empleados');
const insumosRouter = require('./rutas-tablas/insumos');
const insumosClientesRouter = require('./rutas-tablas/insumosClientes')
const ordenesFabricacionRouter = require('./rutas-tablas/ordenesFabricacion');
const registroVentasRouter = require('./rutas-tablas/registroVentas');
const productosTerminados = require('./rutas-tablas/productosTerminados');

router.get('/', (req,res) => {
    res.json({msg: 'Bienvenido a mi server'});
});

router.use('/empleado', empleadoRouter);
router.use('/insumos', insumosRouter);
router.use('/ordenesFabricacion', ordenesFabricacionRouter);
router.use('/insumosClientes', insumosClientesRouter);
router.use('/registroVentas',registroVentasRouter);
router.use('/productosTerminados',productosTerminados);


module.exports = router; 