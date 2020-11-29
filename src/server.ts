// Importaciones 

        // El menu 

        import {menu1} from './views/menus/menu1'
        import {menu2} from './views/menus/menu2'
        import {menu3} from './views/menus/menu3'


        // La funcion para introducir datos por teclado

        import {leerTeclado} from './views/intCadena'

        // La funcion para conectarnos a la base de datos

        import {DB} from './databases/mongoatlas'

        // Las clases con las que trabajaremos

        import {Instalacion, Instalaciones} from './models/instalacion'
        import {Aparato} from './models/aparato'



// Crearemos nuestra funcion principal (Tipo asincrona), esta ejecutara nuestro CRUD

const main = async () => {

        // A continuacion crearemos las varaibles que almacenará las opciones de los distintos menus.

          let n: number, n2:number, n3:number,n4:number


         // Campos Instalacion

           let ident:string, fecha:Date, garantia:boolean, direc:string,tec: Array<string>, aparatos: Array<Aparato>, _sold:number, _asolar:number, _autonomia:number, _evendedor:number


        // Objeto array aparatos 

            let nombre:string, cant:number, carga:number, uso: number
        

        // Implementaremos un menú utilizando un bucle do while (Se debe ejecutar al menos 1 vez), que se ejecutará hasta la variable N sea 0, es decir
        // hayamos seleccionado la opción 0 que es salir.
 
        do {
         n = await menu1()
                switch(n){
                    case 1:

                        // Definiremos dos variables una para la instalación y otra para los aparatos

                        let i1: Instalacion
                        let tec1:string
                        let a1: Aparato

                        // Introduciremos los datos para la instalación

                        ident= await leerTeclado('Introduzca el identificador único de la instalacion')
                        fecha= new Date(await leerTeclado('Introduzca la fecha con formato AAAA-MM-DD'))
                        garantia= Boolean((await leerTeclado ('Garantia: Introduzca true si tiene garantia, en caso contrario no introduzca nada')))
                        direc= await leerTeclado('Introduzca la direccion de instalación')
                        tec1= await leerTeclado('Introduzca el nombre del tecnico de la instalacion') 
                        
                        if(tec1 ==""){
                            console.log('Error no es introducido nada ');
                            
                        } 
                        tec= new Array(tec1)

                        // Utilizando un bucle do while, preguntaremos al usuario si quiere agregar más tecnicos o no.

                        do{
                            n2= await menu2()
                            
                            if(n2 == 1){
                                    let tec2:string
                                    tec2=await leerTeclado('Introduzca el nombre del tecnico de la instalacion') 
                                    tec.push(tec2)
                            }
                        }while(n2 != 0) {}
                        
                        // Almacenaremos valores en las variables del aparato para crear uno nuevo.

                        console.log("A continuación se le solicitaran los datos de los distintos aparatos electricos que posee")

                        nombre = await leerTeclado('Introduzca el nombre del aparato electrico')
                        cant= parseFloat(await leerTeclado('Introduzca la cantidad que posee de este aparato'))
                        carga=parseFloat (await leerTeclado('Introduzca la carga en Vatios que requiera este tipo aparato'))
                        uso=parseFloat (await leerTeclado('Introduzca las horas de uso de este aparato'))

                        a1= new Aparato(nombre,cant,carga,uso)
                        aparatos=new Array(a1)

                        // Utilizando un bucle do while, preguntaremos al usuario si quiere agregar más aparatos o no.

                        do{
                            n3= await menu3()
                            
                            if(n3 == 1){
                                    let a2:Aparato
                                
                                    nombre= await leerTeclado('Introduzca el nombre del aparato electrico')
                                    cant= parseFloat(await leerTeclado('Introduzca la cantidad que posee de este aparato'))
                                    carga=parseFloat (await leerTeclado('Introduzca la carga en Vatios que requiera este tipo aparato'))
                                    uso=parseFloat (await leerTeclado('Introduzca las horas de uso de este aparato'))
                                    a2= new Aparato(nombre,cant,carga,uso)

                                    aparatos.push(a2)
                            }
                        }while(n3 != 0) {}
                    
                                   
                        i1= new Instalacion(ident,fecha,garantia,direc,tec,aparatos)
                  

                        // A continuacion ejecutaremos la conexioón a la base de datos mediante el metodo que hemos importado anteriormente
                
                        await DB.conectarBD()

                        const dSchema={
                            _ident: i1.ident,
                            _fecha: i1.fecha,
                            _garantia: i1.garantia,
                            _direc: i1.direc,
                            _tec : i1.tec,
                            _aparatos: i1.aparatos
                        }

                        const oSchema = new Instalaciones(dSchema)
                        await oSchema.save()
                        await DB.desconectarBD()
                        break
                    case 2:
                        await DB.conectarBD()

                        let query: any   
                        let r2:any

                        ident= await leerTeclado('Introduzca el identificador único de la instalacion')
                        _sold= parseFloat(await leerTeclado('Introduzca numero de horas de sol diarias'))
                        _asolar= parseFloat(await leerTeclado('Introduzca el amperaje electrico de la placa'))
                       
                        query = await Instalaciones.find({'_ident': ident})

                        for (r2 of query){
                            
                            let aparatos : Array<Aparato> = new Array()
                            for (let a of r2._aparatos){
                                let na = new Aparato(a._nombre,a._cant,a._carga,a._uso)
                                aparatos.push(a)
                            }

                            let i2= new Instalacion(r2._ident,r2._fecha,r2._garantia,r2._direc,r2._tec,r2._aparatos)
                            i2.sold= _sold
                            i2.asolar=_asolar

                            console.log(`${i2.calculo1()}`)
                        }
                        await DB.desconectarBD()
                        break
                    case 3:
                            await DB.conectarBD()
                            let query1: any   
                            let r3:any
    
                            ident= await leerTeclado('Introduzca el identificador único de la instalacion')
                            _autonomia= parseFloat(await leerTeclado('Introduza el numero de dias de autonomia de la instalacion'))
                            _evendedor= parseFloat(await leerTeclado('Introduzca la capacidad de las baterias'))
                            
                            query1 = await Instalaciones.find({'_ident': ident})
    
                            for (r3 of query1){
                                
                                let aparatos : Array<Aparato> = new Array()

                                for (let a of r3._aparatos){
                                    let na = new Aparato(a._nombre,a._cant,a._carga,a._uso)
                                    aparatos.push(a)
                                }

                                let i2= new Instalacion(r3._ident,r3._fecha,r3._garantia,r3._direc,r3._tec,r3._aparatos)
                                i2.autonomia= _autonomia
                                i2.evendedor=_evendedor
                                
                                console.log(`${i2.calculo2()}`)
                            }
                            await DB.desconectarBD()
                            break
                    case 4:
                        await DB.conectarBD()
                        let query2: any   
                        ident= await leerTeclado('Introduzca el identificador único de la instalacion')
                        query2 = await Instalaciones.findOneAndDelete({'_ident': ident})
                        await DB.desconectarBD()
                        break
                    }
            }while (n != 0) {}
        }


// Ejecutaremos la función

main()
