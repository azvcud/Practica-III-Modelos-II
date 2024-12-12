document.addEventListener("DOMContentLoaded", function () {
    const bt_ordenar    = document.getElementById('ordenar');
    const bt_insertar   = document.getElementById('insertar');
    const bt_eliminar   = document.getElementById('eliminar');
    const ul_nombres    = document.getElementById('lista-nombres');

    /*----------------------------------------------------------------------*/
    const transformarArray = (ul_Array) => ul_Array
        .map(item => item.textContent)
        .sort();
    
    const elementoEliminar = (ul_Array, texto) => ul_Array
        .find(item => item.textContent === texto);

    const soloLetras = (texto) => 
        /^[\p{L}]+$/u.test(texto);

    /*----------------------------------------------------------------------*/
    const ordenarLista = (ul) => {
        const ul_ArrayNombres   = Array.from(ul.children);
        const ArrayTransformado = transformarArray(ul_ArrayNombres);

        ul_ArrayNombres.forEach((item, index) => {
            item.textContent = ArrayTransformado[index];
        });
    };

    const insertarEnLista = (ul) => {
        const li_nuevoNombre = document.createElement('li');
        const nombreInsertar = prompt("Escriba el nuevo nombre");
        
        if (nombreInsertar && soloLetras(nombreInsertar)) {
            li_nuevoNombre.textContent = nombreInsertar;
            ul_nombres.appendChild(li_nuevoNombre);
        }
        else { alert("El nombre no es válido o contiene espacios."); }
    };

    const eliminarDeLista = (ul) => {
        const ul_ArrayNombres   = Array.from(ul.children);
        const nombreEliminar    = prompt("Escriba el nombre a eliminar");
        
        if(!nombreEliminar || !soloLetras(nombreEliminar)) 
        { alert("El nombre no es válido o contiene espacios."); return; }

        const li_nombreEliminar = elementoEliminar(ul_ArrayNombres, nombreEliminar);

        if(li_nombreEliminar)   { ul.removeChild(li_nombreEliminar); }
        else                    { alert(`No se encontró "${nombreEliminar}" en la lista.`); }
    };

    /*-----------------------------------------------------------------------*/
    bt_ordenar.addEventListener('click',  () => ordenarLista(ul_nombres));
    bt_insertar.addEventListener('click', () => insertarEnLista(ul_nombres));
    bt_eliminar.addEventListener('click', () => eliminarDeLista(ul_nombres));
});