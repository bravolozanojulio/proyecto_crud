// Realizaremos una importacion de los componentes que utilizaremos de mongoose
// En este caso el recurso "Schema", y el recurso "Model"

import {Schema,model} from 'mongoose'

import {Aparato, aparatoSchema} from './aparato'

import {leerTeclado} from '../views/intCadena'


export class Instalacion{
    private _ident:string
    private _fecha:Date
    private _garantia:boolean
    private _direc:string
    private _tec: Array<string>
    private _aparatos: Array<Aparato>
    private "_soldiario": number
    private "_asolar":number
    private "_autonomia":number




    constructor(ident:string, fecha: Date, garantia:boolean, direc: string, tec: Array<string>, aparatos: Array<Aparato>) {
        this._ident= ident
        this._fecha= fecha
        this._garantia= garantia
        this._direc= direc
        this._tec= tec
        this._aparatos= aparatos
    }

// Definiremos los metodos tipo Get y set para cada elemento

get ident(){
    return this._ident
}

set ident(ident:string){
    this._ident=ident
}

get fecha(){
    return this._fecha
}

set fecha(fecha:Date){
    this._fecha=fecha
}

get garantia(){
    return this._garantia
}

set garantia(garantia:boolean){
    this._garantia=garantia
}


get direc(){
    return this._direc
}

set direc(direc:string){
    this._direc=direc
}


get tec(){
    return this._tec
}

set tec(tec:Array<string>){
    this._tec=tec
}


get aparatos(){
    return this._aparatos
}

set aparatos(aparatos:Array<Aparato>){
    this._aparatos=aparatos
}



// Definiremos los calculos 

calculo1(){
    let total=0
    for (let a of this._aparatos){
       console.log(a.carga)
    }

    
}



// A continuación definiremo el type
}



export type tInstalacion = {
    _ident: string,
    _fecha: Date,
    _garantia: boolean,
    _direc: string,
    _tec: Array<string>
    _aparatos: Array <Aparato>
}


// A continuación defineremos el esquema 

const instalacionSchema = new Schema ({
    _ident: {
        type: String,
        required:true,
        unique:true // Deberemos crear un indice en nuestra conexion a la base de datis
    },
    _fecha:{
        type: Date,
        required:true
    },
    _garantia:{
        type: Boolean,
        required:true,
    },
    _direc:{
        type: String,
        required:true,
    },
    _tec: {
        type: [String],
        required:true
    },
    _aparatos:{
        type:[aparatoSchema],
        required:true,
    },
})


// Exportaremos la coleccion Aparatos de la BD

// Se indicara el nombre de la clase en plurar en nuestro caso instalacion

export const Instalaciones = model('Instalaciones', instalacionSchema)