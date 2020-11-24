// Realizaremos una importacion de los componentes que utilizaremos de mongoose
// En este caso el recurso "Schema", y el recurso "Model"

import {Schema,model} from 'mongoose'
import {Aparato, aparatoSchema} from './aparatos'

export class Instalacion{
    private _id:string
    private _fecha:Date
    private _garantia:boolean
    private _direc:string
    private _tec: Array<string>
    private _aparatos: Array<Aparato>

    constructor(id:string, fecha: Date, garantia:boolean, direc: string, tec: Array<string>, aparatos: Array<Aparato>) {
        this._id= id
        this._fecha= fecha
        this._garantia= garantia
        this._direc= direc
        this._tec= tec
        this._aparatos= aparatos
    }

// Definiremos los metodos tipo Get para obtener la informacion almacenada en los campos

get id(){
    return this._id 
}

get fecha(){
    return this._fecha

}

get garantia(){
    return this._garantia
}
get direc(){
    return this._direc
}

get tec(){
    return this._tec
}

get aparatos(){
    return this._aparatos

}


}

// A continuación definiremo el type

export type tInstalacion = {
    _id: string,
    _fecha: Date,
    _garantia: Boolean,
    _direc: string,
    _tec: Array<string>
    _aparatos: Array <Aparato>
}


// A continuación defineremos el esquema 

const instalacionSchema = new Schema ({
    _id: {
        type: String,
        required:true,
        unique:true // Deberemos crear un indice en nuestra conexion a la base de datis
    },
    _fecha:{
        type: Date,
        required:true,
        min: ""
    },
    _garantia:{
        type: Boolean,
        required:true,
    },
    _direc:{
        type: String,
        required:true,
    },
    _tec:{
        type: Array,
        required:true,
        items:{type: String},
        minItems:1,
        maxitema:3,
    },
    _aparatos:{
        type:[aparatoSchema],
        required:true,
    }

})


// Exportaremos la coleccion Aparatos de la BD

// Se indicara el nombre de la clase en plurar en nuestro caso instalacion

export const instalaciones = model('instalaciones', instalacionSchema)