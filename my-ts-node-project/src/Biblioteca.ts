import * as readline from 'readline';

interface Obra {
    nombre: string;
    escritor: string;
}

let coleccion: Obra[] = [];

const entrada = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("¡Bienvenido a la biblioteca digital!");

const desplegarOpciones = () => {
    console.log(`
Por favor, elija una opción:
1. Añadir nuevo libro.
2. Buscar un libro.
3. Ver todos los libros.
4. Filtrar libros por autor.
5. Salir.
    `);
};

const preguntarInput = (texto: string): Promise<string> => {
    return new Promise(resolver => entrada.question(texto, resolver));
};

const menuPrincipal = async () => {
    while (true) {
        desplegarOpciones();
        const eleccion = await preguntarInput("Seleccione una opción: ");
        
        switch (Number(eleccion)) {
            case 1:
                const nombreObra = await preguntarInput("Escriba el título del libro: ");
                const nombreEscritor = await preguntarInput("Escriba el nombre del autor: ");
                if (nombreObra && nombreEscritor) {
                    coleccion.push({ nombre: nombreObra, escritor: nombreEscritor });
                    console.log(`El libro "${nombreObra}" de "${nombreEscritor}" fue añadido exitosamente.`);
                }
                break;
            case 2:
                const tituloBuscar = await preguntarInput("Escriba el título del libro que busca: ");
                const obraEncontrada = coleccion.find(obra => obra.nombre === tituloBuscar);
                if (obraEncontrada) {
                    console.log(`El libro "${obraEncontrada.nombre}" de "${obraEncontrada.escritor}" está disponible.`);
                } else {
                    console.log(`El libro "${tituloBuscar}" no fue encontrado en la colección.`);
                }
                break;
            case 3:
                if (coleccion.length > 0) {
                    console.log("Libros disponibles en la colección:");
                    coleccion.forEach(obra => console.log(`"${obra.nombre}" de "${obra.escritor}"`));
                } else {
                    console.log("La colección está vacía.");
                }
                break;
            case 4:
                const autorBuscar = await preguntarInput("Escriba el nombre del autor que desea buscar: ");
                const obrasPorAutor = coleccion.filter(obra => obra.escritor === autorBuscar);
                if (obrasPorAutor.length > 0) {
                    console.log(`Libros escritos por "${autorBuscar}":`);
                    obrasPorAutor.forEach(obra => console.log(`"${obra.nombre}"`));
                } else {
                    console.log(`No se encontraron libros del autor "${autorBuscar}".`);
                }
                break;
            case 5:
                console.log("Gracias por visitar la biblioteca digital. ¡Hasta la próxima!");
                entrada.close();
                return;
            default:
                console.log("Opción inválida. Por favor, seleccione una opción del menú.");
                break;
        }
    }
};

menuPrincipal();
