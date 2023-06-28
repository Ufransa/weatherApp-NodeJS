require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer')
const Busquedas = require('./models/busquedas')

const main = async () => {

    console.clear()

    const busquedas = new Busquedas()
    let opcion

    do {

        opcion = await inquirerMenu()

        switch (opcion) {
            case 1:

            //Mostrar mensaje
            const termino = await leerInput('Ciudad: ')

            //Buscar lugares
            const lugares = await busquedas.ciudad( termino )

            //Seleccionar lugar
            const id = await listarLugares(lugares)
            if( id === '0' ) continue

            const lugarSeleccionado = lugares.find( l => l.id === id )

            //Guardar en DB
            busquedas.agregarHistorial( lugarSeleccionado.nombre )

            //Clima
            const clima = await busquedas.climaLugar( lugarSeleccionado.lat, lugarSeleccionado.lng )



            //Mostrar resultados
            console.log('\nInformación de la ciudad'.green)
            console.log('');
            console.log(`Ciudad => ${lugarSeleccionado.nombre.green}`);
            console.log(`Latitud => ${lugarSeleccionado.lat}`);
            console.log(`Longitud => ${lugarSeleccionado.lng}`);
            console.log();
            console.log(`Como está el clima => ${clima.desc.green}`);
            console.log(`Temperatura => ${clima.temp}º`);
            console.log(`Max => ${clima.min}º`);
            console.log(`Min => ${clima.max}º`);



                
            break;

            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${i + 1 }.`.green
                    console.log(`${ idx } ${ lugar }`);
                })
            
            break
        }

        if (opcion !== 0) await pausa()

    } while (opcion !== 0)

    



}

main()