import * as readline from 'readline';

interface Empleado {
    nombre: string;
    salario: number;
}

let empleados: Empleado[] = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Bienvenido al sistema de gestión de empleados");

const mostrarMenu = () => {
    console.log(`
Seleccione una opción:
1. Agregar Empleado.
2. Buscar Empleado por nombre.
3. Calcular salario promedio.
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
                const nuevoEmpleado = await preguntar(`Ingrese el nombre del empleado: `);
                const salario = await preguntar(`Ingrese el salario del empleado: `);
                const numeroSalario = Number(salario);
                if (nuevoEmpleado && !isNaN(numeroSalario)) {
                    empleados.push({ nombre: nuevoEmpleado, salario: numeroSalario });
                    console.log(`Empleado ${nuevoEmpleado} con salario de ${numeroSalario} agregado correctamente.`);
                }
                break;
            case 2:
                const buscarEmpleado = await preguntar(`Ingrese el nombre del empleado que desea buscar: `);
                const empleadoEncontrado = empleados.find(empleado => empleado.nombre === buscarEmpleado);
                if (empleadoEncontrado) {
                    console.log(`El empleado ${empleadoEncontrado.nombre} tiene un salario de ${empleadoEncontrado.salario}.`);
                } else {
                    console.log(`El empleado ${buscarEmpleado} no fue encontrado.`);
                }
                break;
            case 3:
                if (empleados.length === 0) {
                    console.log(`No hay empleados registrados.`);
                } else {
                    const totalSalarios = empleados.reduce((acumulado, empleado) => acumulado + empleado.salario, 0);
                    const salarioPromedio = totalSalarios / empleados.length;
                    console.log(`El salario promedio es de ${salarioPromedio}.`);
                }
                break;
            case 4:
                console.log(`Gracias por usar el sistema de gestión de empleados. ¡Hasta luego!`);
                rl.close();
                return;
            default:
                console.log(`Opción no válida. Por favor, seleccione una opción válida.`);
                break;
        }
    }
};

iniciarMenu();