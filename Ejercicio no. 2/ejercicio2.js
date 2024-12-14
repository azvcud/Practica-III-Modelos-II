document.addEventListener("DOMContentLoaded", function () {
    const div_productos         = document.querySelector('.list-products');
    const bt_buscar             = document.getElementById('buscar');
    const bt_insertar           = document.getElementById('insertar');
    const bt_eliminar           = document.getElementById('eliminar');
    const bt_reiniciar          = document.getElementById('reiniciar');
    const bt_limpiar            = document.getElementById('limpiar');
    const bt_volver             = document.getElementById('volver');
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

    const filtrarIndices = (Array1, Array2, indicesFiltrados = new Set()) => Array2
        .map(precio => buscarIndiceUnico(Array1, precio, indicesFiltrados))
        .filter(index => index !== -1);

    const buscarNombreProducto = (h2_Array, texto) => h2_Array
        .find(h2 => h2.textContent === texto);
    
    const buscarIndiceProducto = (h2_Array, texto) => h2_Array
        .findIndex(h2 => h2.textContent === texto);

    const filtrar_mayoresPrecios = (ArrayPrecios, valorMaximo) => ArrayPrecios
        .filter((precio) => precio > valorMaximo)
    
    const soloEnteros = (texto) => 
        /^[0-9]+$/.test(texto);

    function formatearPrecio(valor) {
        const valorFormateado = Number(valor).toLocaleString('es-ES');
        return `Precio: $${valorFormateado}`;
    }

    function buscarIndiceUnico (Array1, precio, indicesBuscados) {
        const index = Array1.findIndex((precioFiltrar, indice) =>
            precio === precioFiltrar &&
            !indicesBuscados.has(indice)
        );

        if(index !== -1) { indicesBuscados.add(index); }
        return index
    }

    /*-------------------------------------------------------------------------*/
    const buscar_precioMaximo = (div, input) => {
        const div_ArrayProductos    = Array.from(div.children);
        const p_ArrayPrecios        = extraerParrafos(div_ArrayProductos);
        const ArrayPrecios          = extraerPrecios(p_ArrayPrecios);
        const precioMaximo          = input.value;

        if(!soloEnteros(precioMaximo))
        { alert("El dato ingresado es inválido o contiene espacios, comas o puntos."); return; }

        //Los índices de los precios coinciden con los de los contenedores de los productos
        const preciosFiltrados              = filtrar_mayoresPrecios(ArrayPrecios, precioMaximo);
        const indices_productosFiltrados    = filtrarIndices(ArrayPrecios, preciosFiltrados);
        
        filtrar_productosMostrar(div_ArrayProductos, indices_productosFiltrados);
    };

    const reiniciarBusqueda = (div, input) => {
        const div_ArrayProductos = Array.from(div.children);
        
        input.value = '';
        filtrar_productosMostrar(div_ArrayProductos, []);
    };

    const insertarProducto = (div, input1, input2) => {
        const h2_ArrayProductos     = Array.from(div.querySelectorAll('div > h2'));
        const div_nuevoProducto     = document.createElement('div');
        const h2_nombreProducto     = document.createElement('h2');
        const p_precioProducto      = document.createElement('p');
        const input_nombreProducto  = input1.value.trim();
        const input_precioProducto  = input2.value;

        if(!soloEnteros(input_precioProducto))
        { alert("El precio ingresado es inválido o contiene espacios, comas o puntos."); return; }

        if(buscarNombreProducto(h2_ArrayProductos, input_nombreProducto))
        { alert("El producto ya existe en la lista."); return; }

        h2_nombreProducto.textContent   = input_nombreProducto;
        p_precioProducto.textContent    = formatearPrecio(input_precioProducto);

        div_nuevoProducto.appendChild(h2_nombreProducto);
        div_nuevoProducto.appendChild(p_precioProducto);
        div.appendChild(div_nuevoProducto);
    };

    const eliminarProducto = (div, input) => {
        const h2_ArrayProductos     = Array.from(div.querySelectorAll('div > h2'));
        const div_productoEliminar  = document.createElement('div');
        const input_nombreProducto  = input.value.trim();

        div_productoEliminar.textContent = input_nombreProducto;
        const indiceProducto = buscarIndiceProducto(h2_ArrayProductos, input_nombreProducto);

        //Los índices de los nombres de productos coinciden con los de los contenedores de los productos
        if(indiceProducto !== -1) { div.removeChild(div.children[indiceProducto]); }
        else 
        { alert(`No se encontró "${div_productoEliminar.textContent}" en la lista.`); }
    };

    const limpiar_modifLista = (input1, input2) => {
        input1.value = '';
        input2.value = '';
    }

    const paginaPrincipal = () => {
        window.location.href = './../index.html';
    }

    /*-------------------------------------------------------------------------*/
    bt_buscar.addEventListener('click',     () => buscar_precioMaximo(div_productos, input_precioMaximo));
    bt_reiniciar.addEventListener('click',  () => reiniciarBusqueda(div_productos, input_precioMaximo));
    bt_eliminar.addEventListener('click',   () => eliminarProducto(div_productos, input_nombreProducto));
    bt_limpiar.addEventListener('click',    () => limpiar_modifLista(input_nombreProducto, input_precioProducto));
    bt_volver.addEventListener('click',     () => paginaPrincipal());
    bt_insertar.addEventListener('click',   () => insertarProducto(
        div_productos, 
        input_nombreProducto,
        input_precioProducto
    ));
});