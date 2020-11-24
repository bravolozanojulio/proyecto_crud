// Realizaremos una importacion de los componentes que utilizaremos de mongoose
// En este caso el recurso "Schema", y el recurso "Model"

import {Schema, model } from 'mongoose'

export class Aparato {
    private _nombre: string
    private _cant: number
    private _carga: number
    private _uso: number

    constructor(nombre:string,cant:number,carga:number,uso:number){
        this._nombre=nombre
        this._cant=cant
        this._carga=carga
        this._uso=uso
    }
get nombre(){
    return this._nombre
}
get cant(){
    return this._cant
}

get carga(){
    return this._carga
}

get uso(){
    return this._uso
}

}


// A continuación definiremo el type

export type tAparato= {
    _nombre: string,
    _cant: number,
    _carga: number,
    _uso: number
}




// A continuación defineremos el esquema 


export const aparatoSchema = new Schema ({
    _nombre: {
        type: String,
        required:true,
        maxlength:30,
    },
    _cant:{
        type: Number,
        required:true,
        min: 1
    },
    _carga:{
        type: Number,
        required:true,
        min:0
    },
    _uso:{
        type: Number,
        required:true,
        min:0.30,
        max:24
    },
})

// Exportaremos la coleccion Aparatos de la BD

// Se indicara el nombre de la clase en plurar en nuestro caso aparato

export const aparatos = model('aparatos', aparatoSchema)