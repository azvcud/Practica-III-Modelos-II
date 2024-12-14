document.addEventListener("DOMContentLoaded", function () {
    const div_productos         = document.querySelector('.list-products');
    const bt_buscar             = document.getElementById('buscar');
    const bt_insertar           = document.getElementById('insertar');
    const bt_eliminar           = document.getElementById('eliminar');
    const bt_reiniciar          = document.getElementById('reiniciar');
    const input_precioMaximo    = document.getElementById('max-price');
    const input_nombreProducto  = document.getElementById('name');
    const input_precioProducto  = document.getElementById('price');

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
    
    const filtrar_productosMostrar = (div, ArrayIndex) => div
        .forEach((div, index) => {
            ArrayIndex.includes(index) 
            ? div.style.display = 'none'
            : div.style.display = 'block'; 
        });

    const filtrarIndices = (Array1, Array2) => Array2
        .map(valor => Array1.indexOf(valor))
        .filter(index => index !== -1);

    const filtrarPrecios = (ArrayPrecios, valorMaximo) => ArrayPrecios
        .filter((precio) => precio > valorMaximo)
    
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

        //Los índices de los precios coinciden con los de los contenedores de los productos
        const preciosFiltrados              = filtrarPrecios(ArrayPrecios, precioMaximo);
        const indices_productosFiltrados    = filtrarIndices(ArrayPrecios, preciosFiltrados);
        
        filtrar_productosMostrar(div_ArrayProductos, indices_productosFiltrados);
    };

    const reiniciarBusqueda = (div, input) => {
        const div_ArrayProductos = Array.from(div.children);
        
        input.value = '';
        filtrar_productosMostrar(div_ArrayProductos, []);
    };

    const insertarProducto = (div, input1, input2) => {
        //Mañana un sábado
    };

    const eliminarProducto = (div, input1, input2) => {
        //Mañana un sábado -> TODO: README el sábado
    };
    
    /*-------------------------------------------------------------------------*/
    bt_buscar.addEventListener('click',     () => buscar_precioMaximo(div_productos, input_precioMaximo));
    bt_reiniciar.addEventListener('click',  () => reiniciarBusqueda(div_productos, input_precioMaximo));
    bt_insertar.addEventListener('click',   () => insertarProducto(
        div_productos, 
        input_nombreProducto,
        input_precioProducto
    ));
    bt_eliminar.addEventListener('click',   () => eliminarProducto(
        div_productos,
        input_nombreProducto,
        input_precioProducto
    ));
});