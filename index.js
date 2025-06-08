const exp = require('express');
const app = exp();

const logger = require('morgan');
/*app.use(logger('dev'));

app.use(exp.urlencoded({extended: false}));
app.use(exp.json())

app.listen(process.env.PORT, ()=>{
    console.log("servidor en linea");
})

*/


//Productos
let modeloProducto = require('./backend/models/productos.model')

app.get('/productos/:ref', async(req, res)=>{

    let productoEncontrado = await modeloProducto.findOne({referencia:req.params.ref});
    if(productoEncontrado)
        res.status(200).json(productoEncontrado)
    else
        res.status(404).json({"error":"Producto no encontrado"})
    
})


app.post('/envio', async(req, res)=>{
    const nuevoProducto = {
        referencia: req.body.referenciaProducto,
        nombre: req.body.nombreProducto,
        descripcion: req.body.descripcionProducto,
        precio: req.body.precioProducto,
        stock: req.body.stockProducto,
        imagen: req.body.imagenProdcuto,
        habilitado: true,
    };

    let Insercion = await modeloProducto.create(nuevoProducto);
    if(Insercion)
        res.status(200).json({"mensaje":"Registro exitoso"})
    else
        res.status(404).json({"mensaje": "Se presento un error"})
})

app.listen(process.env.PORT,()=>{
    console.log("servidor en linea")
})


app.put('/productos/:ref', async(req, res)=>{
    const productoEditado = {
        referencia: req.params.ref,
        nombre: req.body.nombreProducto,
        descripcion: req.body.descripcionProducto,
        precio: req.body.precioProducto,
        stock: req.body.stockProducto,
        imagen: req.body.imagenProdcuto,
        habilitado: true,
    };

    let Actualizacion = await modeloProducto.findOneAndUpdate({referencia:req.params.ref}, productoEditado);
    if(Actualizacion)
        res.status(200).json({"mensaje":"Actualizacion exitoso"})
    else
        res.status(404).json({"mensaje": "Se presento un error"})
})


//Eliminacion
app.delete('/productos/:id', async(req, res)=>{
    console.log(req.params.id, req.body.referenciaProducto)
    let eliminacion = await modeloProducto.findOneAndDelete({referencia:req.params.id});
    if(eliminacion)
        res.status(200).json({"mensaje":"Eliminacion exitoso"})
    else
        res.status(404).json({"mensaje": "Se presento un error"})
})