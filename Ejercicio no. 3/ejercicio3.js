document.addEventListener("DOMContentLoaded", function () {
    const bt_calcular   = document.getElementById('calcular-suma-cuadrados');
    const bt_generar    = document.getElementById('generar');
    const bt_eliminar   = document.getElementById('eliminar');
    const bt_volver     = document.getElementById('volver');
    const ul_numeros    = document.getElementById('lista-numeros');
    const p_resultado   = document.getElementById('resultado-suma');

    /*-----------------------------------------------------------------------*/
    const sumaCuadrados_ArrayNumeros = (ul_Array) => ul_Array
        .map(item => item.textContent | 0)
        .reduce((acumulador, valorActual) => acumulador + (valorActual ** 2), 0);

    const buscarElemento = (ul_Array, texto) => ul_Array
        .find(item => item.textContent === texto);

    const soloEnteros = (texto) => 
        /^[0-9]+$/.test(texto);

    function numero_finalString(p_texto, numero) {
        const si_textoConNumero = /\d+/.test(p_texto);

        const nuevoResultado = si_textoConNumero 
            ? p_texto.replace(/\d+/, numero) 
            : p_texto + numero;
        
        return nuevoResultado;
    };

    function intAleatorio(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    };

    /*------------------------------------------------------------------------*/
    const sumarCuadrados = (ul, p) => {
        const ul_ArrayNumeros       = Array.from(ul.children);
        const p_textoResultado      = p.textContent;
        const valor_sumaArray       = sumaCuadrados_ArrayNumeros(ul_ArrayNumeros);
        const nuevo_textoResultado  = numero_finalString(p_textoResultado, valor_sumaArray);

        p.textContent = nuevo_textoResultado;
    };

    const generarNumero = (ul) => {
        const numeroAleatorio   = intAleatorio(1, 100);
        const li_nuevoNumero    = document.createElement('li');
        
        li_nuevoNumero.textContent = numeroAleatorio.toString();
        ul.appendChild(li_nuevoNumero);
    };

    const eliminarNumero = (ul) => {
        const ul_ArrayNumeros = Array.from(ul.children);
        const numeroEliminar  = prompt("Escriba el número a eliminar");

        if(!soloEnteros(numeroEliminar))
        { alert("No se escribió un número entero o contiene espacios."); return; }

        const li_numeroEliminar = buscarElemento(ul_ArrayNumeros, numeroEliminar.toString());

        if(li_numeroEliminar)   { ul.removeChild(li_numeroEliminar); }
        else                    { alert(`No se encontró "${li_numeroEliminar.textContent}" en la lista.`); }
    };

    const paginaPrincipal = () => {
        window.location.href = './../index.html';
    }

    /*------------------------------------------------------------------------*/
    bt_calcular.addEventListener('click', () => sumarCuadrados(ul_numeros, p_resultado));
    bt_generar.addEventListener('click',  () => generarNumero(ul_numeros));
    bt_eliminar.addEventListener('click', () => eliminarNumero(ul_numeros));
    bt_volver.addEventListener('click',   () => paginaPrincipal());
});