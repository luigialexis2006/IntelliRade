const usuarioInput = document.getElementById('usuarioInput');
const passwordInput = document.getElementById('passwordInput');
const saveButton = document.getElementById('saveButton');
const nombreGuardado = document.getElementById('nombreGuardado');
const mensajeTemporal = document.getElementById('mensaje');

function showMessage(msg, isError = false){
    mensajeTemporal.textContent = msg;
    mensajeTemporal.style.color = isError ? 'red' : 'green';
    mensajeTemporal.style.display = 'block';
    setTimeout(() => {
        mensajeTemporal.style.display = 'none';
    }, 3000);
}

function saveUsuario(){
    const usuario = usuarioInput.value.trim();


    if(usuario === ''){
        showMessage('Porfavor diligencia los datos completos', true);
        return;
    }

    localStorage.setItem('userName', usuario);
    showMessage('Usuario registrado', false);


    displayLogin()

    usuarioInput.value = '';
}

function savePassword(){
    const password = passwordInput.value.trim();
    
    if (password === '') {
        showMessage('porfavor ingrese su contraseña', true);
        return;
    }

    localStorage.setItem('contraseña', password);
    showMessage('contraseña guardada', false);

    displayLogin()

    passwordInput.value = '';
}




function displayLogin(){

    const savedUsuario = localStorage.getItem('userName');
    const savedPassword = localStorage.getItem('contraseña');

    if(savedUsuario && savedPassword){
        nombreGuardado.textContent = `Bienvenido: ${savedUsuario}`;
    } else{
        nombreGuardado.textContent = "Bienvenido al registro";
    }
}

function GuardarUsuario(){
    saveUsuario();
    savePassword();
}

saveButton.addEventListener('click', GuardarUsuario);

document.addEventListener('DOMContentLoaded', displayLogin);