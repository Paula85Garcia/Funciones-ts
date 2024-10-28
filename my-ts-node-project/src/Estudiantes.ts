import * as readline from 'readline';

interface Estudiante{
    nombre : string;
    nota : number;
}
let estudiantes: Estudiante[]=[]; 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Hola, bienvenido a su biblioteca pública");

const mostrarMenu = () => {
    console.log(`
Seleccione una opción:
1. Agregar Estudiante.
2. Buscar Estudiante.
3. Promedio de notas de todos los estudiantes.
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
                const nuevoEstudiante = await preguntar(`Ingrese el nombre del Estudiante: `);
                const nota = await preguntar(`Ingrese las notas: `);
                const numeronota=Number(nota)
                if (nuevoEstudiante && !isNaN (numeronota)) {
                    estudiantes.push({ nombre: nuevoEstudiante, nota: numeronota });
                    console.log(`Estudiante ${nuevoEstudiante} de ${numeronota} Agregada correctamente.`);
                }
                break;
                case 2:
                    const buscarEstudiante = await preguntar(`Ingrese el nombre del estudiante que desea buscar:`);
                    const EstudianteEncontrado = estudiantes.find(Estudiante => Estudiante.nombre === buscarEstudiante);
                    if (EstudianteEncontrado) {
                        console.log(`El Estudiante ${EstudianteEncontrado.nombre} de ${EstudianteEncontrado.nota}" está disponible.`);
                    } else {
                        console.log(`El Estudiante ${buscarEstudiante} no fue encontrado.`);
                    }
                    break;
                case 3:
                    if(estudiantes.length===0){console.log(`No se encontraron notas`)}
                    else{const resultado=estudiantes.reduce((acumulado,Estudiante)=>acumulado+Estudiante.nota,0)
                        const promedio=resultado/estudiantes.length
                        console.log(`El resultado de la nota promedio es de ${promedio}`)
                    }
                    break;
                case 4:
                    console.log(`Gracias ¡Hasta luego!`);
                    rl.close();
                    return;
                    default:
                        console.log(`Opción no válida. Por favor seleccione una opción válida.`);
                        break;
                }
            }
        };
        
        iniciarMenu();