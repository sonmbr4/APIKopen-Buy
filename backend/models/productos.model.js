const { describe } = require("pm2");
const mongoose = require("../config/database");

const schemaCliente = mongoose.Schema({
    
    nombreCompleto:{
        type: String,
        minLenght: 3,
        maxLenght: 230
    },
    edad:{
        type : Number,
        maxLenght: 230
    },
    correo: {
        type: String,
        required: [true, "El documento es obligatorio"]
    }
});



const schemaProducto= new mongoose.Schema({
    referencia:{
        type: String,
        required:[true, 'la referencia es obligatoria']
    },
    nombre:{
        type: String,
        requeried:[true, 'Asignar un nombre es obligatorio']
    },
    descripcion:{
        type: String,
        required:[true, 'la descripción es obligatoria']
    },
    precio:{
        type: Number,
        default:[0, 'El precio por defecto es 0'],
        min:[0, 'el precio mínimo es cero']
    },
    stock:{
        type: Number,
        default:[0, 'El stock por defecto es cero'],
        min:[0, 'El stock por defecto es cero']
    },
    imagen:{
        type:String,
        required:[true, 'No existe la imagen o ruta a la imagen por defecto']
    },
    habilitado:{
        type: Boolean,
        default: true
    }
})


const producto = mongoose.model("producto", schemaProducto);
const cliente = mongoose.model('clientes', schemaCliente);

module.exports= producto, cliente;


