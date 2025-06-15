const exp = require('express');
const app = exp();


const logger = require('morgan');

//Productos
let modeloProducto = require('./backend/models/productos.model')
let modeloClientes = require('./backend/models/productos.model')

app.get('/productos', async (req, res) => {
    let listaProductos = await modeloProducto.find();
    if (listaProductos) {
        res.status(200).json(listaProductos)
    } else {
        res.status(404).json({ error: "No se encontraron Productos" })
    }

})

app.listen(process.env.PORT, () => {
    console.log("servidor en linea")
})

app.get('/productos/:ref', async (req, res) => {
    let productoEncontrado = await modeloProducto.findOne({ referencia: req.params.ref })
    if (productoEncontrado) {
        res.status(200).json(productoEncontrado);
    } else {
        res.status(404).json({ error: "Producto no encontrado" })
    }

})



app.use(exp.json())
app.use(exp.urlencoded({ extended: true }))
//insercion
app.post('/productos', async (req, res) => {
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
    if (Insercion) {
        res.status(200).json({ "mensaje": "Registro exitoso" })
    } else {
        res.status(404).json({ error: "Se presento un error" })
    }

})



//actualizacion
app.put('/productos/:ref', async (req, res) => {
    const productoEditado = {
        referencia: req.params.referenciaProducto,
        nombre: req.body.nombreProducto,
        descripcion: req.body.descripcionProducto,
        precio: req.body.precioProducto,
        stock: req.body.stockProducto,
        imagen: req.body.imagenProdcuto,
        habilitado: true,
    };

    let Actualizacion = await modeloProducto.findOneAndUpdate({ referencia: req.params.ref }, productoEditado);
    if (Actualizacion)
        res.status(200).json({ "mensaje": "Actualizacion exitoso" })
    else
        res.status(404).json({ error: "Se presento un error" })
})


//Eliminacion
app.delete('/productos/:ref', async (req, res) => {
    let eliminacion = await modeloProducto.findOneAndDelete({ referencia: req.params.ref });
    if (eliminacion)
        res.status(200).json({ "mensaje": "Eliminacion exitoso" })
    else
        res.status(404).json({ error: "Se presento un error" })
})



//editarCliente


app.put('/clientes/:email', async (req, res) => {
    console.log(req.body)
    /*let clienteEditado = {
        nombreCompleto : req.body.nombre,
        edad : req.body.edad,
        correo : req.params.email
    }*/
    let clienteEditado = req.body;
    let resultado = await modeloClientes.findOneAndUpdate({ correo: req.params.email }, clienteEditado)
    if (resultado) {
        res.status(200).json({ "mensaje": "Actualizacion exitoso" })
    } else {
        res.status(500).json({ error: "Se presento un error" })
    }
})