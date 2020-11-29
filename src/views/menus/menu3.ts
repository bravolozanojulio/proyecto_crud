import { leerTeclado } from '../intCadena'

export const menu3 = async () => {
    let n3: number
    console.log('¿Desea introducir otro aparato electrico? \n')
    console.log('1.- Agregar otro aparato electrico')
    console.log('0.- Salir')
    n3 = parseInt( await leerTeclado('--OPCIÓN--') )
    return n3
}

