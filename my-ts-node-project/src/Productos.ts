import * as readline from 'readline';

interface Producto {
    nombre: string;
    cantidad: number;
    precioPorUnidad: number;
}

let productos: Producto[] = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Bienvenido al sistema de gestión de productos de la tienda");

const mostrarMenu = () => {
    console.log(`
Seleccione una opción:
1. Agregar nuevo producto.
2. Buscar producto por nombre.
3. Calcular valor total del inventario.
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
                const nombre = await preguntar(`Ingrese el nombre del producto: `);
                const cantidad = await preguntar(`Ingrese la cantidad de productos: `);
                const precio = await preguntar(`Ingrese el precio por unidad: `);
                const cantidadNumero = Number(cantidad);
                const precioNumero = Number(precio);
                
                if (nombre && !isNaN(cantidadNumero) && !isNaN(precioNumero)) {
                    productos.push({ nombre, cantidad: cantidadNumero, precioPorUnidad: precioNumero });
                    console.log(`Producto ${nombre} agregado correctamente.`);
                } else {
                    console.log("Datos inválidos. Asegúrese de ingresar cantidades y precios numéricos.");
                }
                break;
            case 2:
                const buscarNombre = await preguntar(`Ingrese el nombre del producto que desea buscar: `);
                const productoEncontrado = productos.find(producto => producto.nombre.toLowerCase() === buscarNombre.toLowerCase());
                if (productoEncontrado) {
                    console.log(`Producto encontrado: ${productoEncontrado.nombre}, Cantidad: ${productoEncontrado.cantidad}, Precio por unidad: ${productoEncontrado.precioPorUnidad}`);
                } else {
                    console.log(`No se encontró ningún producto con el nombre ${buscarNombre}.`);
                }
                break;
            case 3:
                if (productos.length === 0) {
                    console.log(`No hay productos disponibles en el inventario.`);
                } else {
                    const valorTotal = productos.reduce((acumulado, producto) => acumulado + (producto.cantidad * producto.precioPorUnidad), 0);
                    console.log(`El valor total del inventario es de ${valorTotal}.`);
                }
                break;
            case 4:
                console.log(`Gracias por usar el sistema de gestión de productos. ¡Hasta luego!`);
                rl.close();
                return;
            default:
                console.log(`Opción no válida. Por favor seleccione una opción válida.`);
                break;
        }
    }
};

iniciarMenu();
