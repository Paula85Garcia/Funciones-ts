import * as readline from 'readline';

interface Reserva {
    huesped: string;
    noches: number;
    precioPorNoche: number;
}

let reservas: Reserva[] = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Bienvenido al sistema de reservas del hotel");

const mostrarMenu = () => {
    console.log(`
Seleccione una opción:
1. Agregar nueva reserva.
2. Buscar reserva por nombre del huésped.
3. Calcular ingreso total del hotel.
4. Salir.
    `);
};

const preguntar = (pregunta: string): Promise<string> => {
    return new Promise(resolve => rl.question(pregunta, resolve));
};

const iniciarMenu = async () => {
    while (true) {
        mostrarMenu();
        const opcion = await preguntar(`Ingrese una opción: `);
        
        switch (Number(opcion)) {
            case 1:
                const huesped = await preguntar(`Ingrese el nombre del huésped: `);
                const noches = await preguntar(`Ingrese la cantidad de noches de la reserva: `);
                const precio = await preguntar(`Ingrese el precio por noche: `);
                const nochesNumero = Number(noches);
                const precioNumero = Number(precio);
                if (huesped && !isNaN(nochesNumero) && !isNaN(precioNumero)) {
                    reservas.push({ huesped, noches: nochesNumero, precioPorNoche: precioNumero });
                    console.log(`Reserva para ${huesped} por ${nochesNumero} noches a ${precioNumero} por noche agregada correctamente.`);
                }
                break;
            case 2:
                const buscarHuesped = await preguntar(`Ingrese el nombre del huésped que desea buscar: `);
                const reservaEncontrada = reservas.find(reserva => reserva.huesped === buscarHuesped);
                if (reservaEncontrada) {
                    console.log(`Reserva encontrada para ${reservaEncontrada.huesped}: ${reservaEncontrada.noches} noches a ${reservaEncontrada.precioPorNoche} por noche.`);
                } else {
                    console.log(`No se encontró ninguna reserva para el huésped ${buscarHuesped}.`);
                }
                break;
            case 3:
                if (reservas.length === 0) {
                    console.log(`No hay reservas disponibles.`);
                } else {
                    const ingresoTotal = reservas.reduce((acumulado, reserva) => acumulado + (reserva.noches * reserva.precioPorNoche), 0);
                    console.log(`El ingreso total del hotel es de ${ingresoTotal}.`);
                }
                break;
            case 4:
                console.log(`Gracias por usar el sistema de reservas. ¡Hasta luego!`);
                rl.close();
                return;
            default:
                console.log(`Opción no válida. Por favor seleccione una opción válida.`);
                break;
        }
    }
};

iniciarMenu();