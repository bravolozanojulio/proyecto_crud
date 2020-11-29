import { leerTeclado } from '../intCadena'

export const menu1 = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Añadir instalacion')
    console.log('2.- Realizar calculo placas fotovoltaicas')
    console.log('3 - Realizar calculo baterias')
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}

