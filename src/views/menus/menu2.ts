import { leerTeclado } from '../intCadena'

export const menu2 = async () => {
    let n2: number
    console.log('¿Desea introducir otro tecnico? \n')
    console.log('1.- Agregar otro tecnico')
    console.log('0.- Salir')
    n2 = parseInt( await leerTeclado('--OPCIÓN--') )
    return n2
}

