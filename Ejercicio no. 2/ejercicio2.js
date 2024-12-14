document.addEventListener("DOMContentLoaded", function () {
    const div_productos         = document.querySelector('.list-products');
    const bt_buscar             = document.getElementById('buscar');
    const bt_insertar           = document.getElementById('insertar');
    const bt_eliminar           = document.getElementById('eliminar');
    const input_precioMaximo    = document.getElementById('max-price');

    /*-------------------------------------------------------------------------*/
    const extraerParrafos = (div_Array) => div_Array
        .map(p_precio => {
            const texto_precio = p_precio.querySelector('p');
            return texto_precio;
        });
    
    const extraerPrecios = (p_Array) => p_Array 
        .map(p_precio => {
            const texto_precio = p_precio.textContent;
            const precio = parseInt(texto_precio.replace(/Precio: \$|\.| /g, ''), 10);
            return precio
        });
    
    const desplegar_ProductosFiltrados = (div, ArrayIndex) => ArrayIndex
        .forEach(index => {
            if (div[index]) { div[index].style.display = 'block'; }
            else            { div[index].style.display = 'none'; }
        });

    const filtrarIndices = (Array1, Array2) => Array2
        .map(valor => Array1.indexOf(valor))
        .filter(index => index !== -1);

    const filtrarPrecios = (ArrayPrecios, valorMaximo) => ArrayPrecios
        .filter((precio) => precio < valorMaximo)
    
    const soloEnteros = (texto) => 
        /^[0-9]+$/.test(texto);

    /*-------------------------------------------------------------------------*/
    const buscar_precioMaximo = (div, input) => {
        const div_ArrayProductos    = Array.from(div.children);
        const p_ArrayPrecios        = extraerParrafos(div_ArrayProductos);
        const ArrayPrecios          = extraerPrecios(p_ArrayPrecios);
        const precioMaximo          = input.value;

        if(!soloEnteros(precioMaximo))
        { alert("El dato ingresado es inválido o contiene espacios, comas o puntos."); return; }

        const preciosFiltrados              = filtrarPrecios(ArrayPrecios, precioMaximo);
        
        //Los índices de los precios coinciden con los de los contenedores de los productos
        const indices_productosFiltrados    = filtrarIndices(ArrayPrecios, preciosFiltrados);
        
        desplegar_ProductosFiltrados(div_ArrayProductos, indices_productosFiltrados);

        console.log(div_ArrayProductos);
        console.log(p_ArrayPrecios);
        console.log(ArrayPrecios);
        console.log(preciosFiltrados);
        console.log(indices_productosFiltrados);
    }

    /*-------------------------------------------------------------------------*/
    bt_buscar.addEventListener('click', () => buscar_precioMaximo(div_productos, input_precioMaximo));
    bt_insertar.addEventListener('click', () => insertarProducto(div_productos));
    bt_eliminar.addEventListener('click', () => eliminarProducto(div_productos));
});