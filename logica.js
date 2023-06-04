function tiene_mayusculas(texto) {
    var letras_mayusculas = "ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";

    for (var i = 0; i < texto.length; i++) {
        if (letras_mayusculas.indexOf(texto.charAt(i), 0) != -1) {
            return 1;
        }
    }
    return 0;
}

function tieneAcentos(cadena) {
    const caracteresExtraños = /[áàäâªÁÀÂÄéèëêÉÈÊËíìïîÍÌÏÎóòöôÓÒÖÔúùüûÚÙÛÜçÇñÑ´]/;
    if (caracteresExtraños.test(cadena)) {
        return true;
    }
}

function recibirTexto() {
    let salidaTexto = document.getElementById('salida-texto');
    let cortina = document.getElementById('fondo-salida');
    let divSalida = document.getElementById('salida-lectura');
    let areaTexto = document.getElementById('Entrada-texto');

    let mensajeEncriptado = encriptarTexto();


    if (mensajeEncriptado != undefined) {
        salidaTexto.innerHTML = mensajeEncriptado;
        cortina.style.display = 'none';
        divSalida.style.width = '100%';
        divSalida.style.height = '100%'
        salidaTexto.style.fontFamily = 'Inter';
        salidaTexto.style.fontSize = '16px'
        salidaTexto.style.textAlign = 'left'
    } 

    let btnCopy = document.getElementById('btn-copiar');

    btnCopy.style.display = 'flex';
    btnCopy.onclick = copiarTexto;

    areaTexto.value = '';
    areaTexto.focus();

}

function encriptarTexto() {
    let areaTexto = document.getElementById('Entrada-texto').value;
    let arrayLetras = areaTexto.split('');
    let palabrasUnidas;

    console.log(tieneAcentos(areaTexto))

    if (tiene_mayusculas(areaTexto) == 1 || tieneAcentos(areaTexto) == true) {
        Swal.fire({
            html: '<i class="fa-brands fa-yarn gato"></i> <p class = "p-class">Solo minúsculas y sin acentos.</p>',
            width: '30%',
            background: '#494949',
            position: 'center',
            confirmButtonText: "Vale",
            allowOutsideClick: false,
            allowEscapeKey: true,
            allowEnterKey: true,
            confirmButtonColor: '#ffffff73',
            buttonsStyling: false,

            customClass: {
                popup: 'popup-class',
                confirmButton: 'confirmButton-class',
            }
        });
    } else {
        for (var i = 0; i < arrayLetras.length; i++) {
            if (arrayLetras[i] == 'a') {
                arrayLetras[i] += 'i';
            } else if (arrayLetras[i] == 'e') {
                arrayLetras[i] += 'nter';
            } else if (arrayLetras[i] == 'i') {
                arrayLetras[i] += 'mes';
            } else if (arrayLetras[i] == 'o') {
                arrayLetras[i] += 'ber';
            } else if (arrayLetras[i] == 'u') {
                arrayLetras[i] += 'fat';
            }
        }
        palabrasUnidas = arrayLetras.join('').split(' ');
        let fraseEncriptada = palabrasUnidas.join(' ');
        return fraseEncriptada;
    }
}

function desencriptarTexto(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return stringDesencriptada
}

function limpiar_agregarTexto() {
    let salidaTexto = document.getElementById('salida-texto');
    let areaTexto = document.getElementById('Entrada-texto').value;
    let btnCopy = document.getElementById('btn-copiar');
    let fraseDesencriptada = desencriptarTexto(areaTexto)
    salidaTexto.value = '';
    salidaTexto.innerHTML = fraseDesencriptada;

    btnCopy.style.display = 'inline-block';
    btnCopy.onclick = copiarTexto;
}

function copiarTexto() {
    // Obtener el elemento <span> por su ID
    var span = document.getElementById('salida-texto');
    let btnPaste = document.getElementById('btn-pegar');
    btnPaste.style.display = 'flex';

    // Crear un elemento <textarea> temporal
    var tempTextarea = document.createElement('textarea');
    tempTextarea.value = span.textContent;

    // Agregar el elemento <textarea> al documento
    document.body.appendChild(tempTextarea);

    // Seleccionar el contenido del elemento <textarea>
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Copiar el contenido del elemento <textarea> al portapapeles
    document.execCommand('copy');

    // Remover el elemento <textarea> temporal
    document.body.removeChild(tempTextarea);

    var button = document.getElementById('btn-copiar');
    button.innerText = 'Copiado';

    setTimeout(function () {
        button.innerText = 'Copiar';
    }, 2000); // Cambiar de nuevo a "Copiar" después de 2 segundos
}


function pegarTexto() {
    navigator.permissions.query({ name: 'clipboard-read' }).then(result => {
        if (result.state === 'granted' || result.state === 'prompt') {
            navigator.clipboard.readText().then(text => {
                var textarea = document.getElementById('Entrada-texto');
                textarea.value = text;
                textarea.focus();
            }).catch(error => {
                console.error('Error al leer el texto del portapapeles:', error);
            });
        } else {
            console.error('Permiso denegado para acceder al portapapeles');
        }
    }).catch(error => {
        console.error('Error al consultar los permisos del portapapeles:', error);
    });
}




let btnEncriptar = document.getElementById('btn-encriptar');
let btnDesencriptar = document.getElementById('btn-desencriptar');
let btnPaste = document.getElementById('btn-pegar');

btnEncriptar.onclick = recibirTexto;
btnDesencriptar.onclick = limpiar_agregarTexto;
btnPaste.onclick = pegarTexto;




