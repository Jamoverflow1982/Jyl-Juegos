//const API_URL_USU = "https://back-jyl-juegos-production.up.railway.app/usuarios";
const API_URL_USU = "http://localhost:8080/usuarios"

function listaDeUsuarios(){
    document.getElementById('tablaCompletaUsuarios').classList.remove('d-none');
    document.getElementById('formularioActualizarUsuarios').classList.add('d-none');
    document.getElementById('tituloTablaUsuarios').textContent = 'Lista de Usuarios';

    fetch(API_URL_USU)
        .then(response => response.json())
        .then(data => {
            console.log("Usuarios cargados:", data);
            const tbody = document.getElementById('tbodyUsuarios');
            tbody.innerHTML = '';
            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.password}</td>
                    <td>${(usuario.role ? 'Admin' : 'Usuario')}</td>
                    <td>${usuario.fechaAlta}</td>
                    <td><button class="btn btn-primary" onclick="editarUsuario(${usuario.id})">Editar</button></td>
                    <td><button class="btn btn-danger" onclick="eliminarUsuario(${usuario.id})">Eliminar</button></td>
                    <td><button class="btn btn-warning" onclick="verDatosCompletos(${usuario.id})">Ver Todo</button></td>
                `;
                tbody.appendChild(row);
            });
        });
}

function editarUsuario(id){
    console.log("Edicion de usuario");
    fetch (`${API_URL_USU}/${id}`,{
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log("Usuario a editar:", data);
        const formActualizarUsuarios = document.getElementById('formularioActualizarUsuarios');
        formActualizarUsuarios.innerHTML = `
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title fs-5" id="staticBackdropLabel">Edicion de Usuario</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3" id="actualizarUsuarios">
                                <div class="col-md-6">
                                    <label for="inputNombre" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="inputNombre" value="${data.nombre}">
                                </div>
                                <div class="col-md-6">
                                    <label for="inputApellido" class="form-label">Apellido</label>
                                    <input type="text" class="form-control" id="inputApellido" value="${data.apellido}">
                                </div>
                                <div class="col-md-6">
                                    <label for="inputEmail" class="form-label">Email</label>
                                    <input type="text" class="form-control" id="inputEmail" value="${data.email}">
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPassword" class="form-label">Password</label>
                                    <input type="text" class="form-control" id="inputPassword" value="${data.password}">
                                </div>
                                <div class="col-md-6">
                                    <label for="inputDni" class="form-label">Documento</label>
                                    <input type="number" class="form-control" id="inputDni" value="${data.dni}">
                                </div>
                                <div class="col-md-12">
                                    <label for="inputDireccion" class="form-label">Direccion</label>
                                    <input type="text" class="form-control" id="inputDireccion" value="${data.direccion}">
                                </div>
                                <div class="col-md-6">
                                    <label for="inputCiudad" class="form-label">Ciudad</label>
                                    <input type="text" class="form-control" id="inputCiudad" value="${data.ciudad}">
                                </div>
                                <div class="col-md-6">
                                    <label for="inputProvincia" class="form-label">Provincia</label>
                                    <input type="text" class="form-control" id="inputProvincia" value="${data.provincia}">
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPais" class="form-label">Pais</label>
                                    <input type="text" class="form-control" id="inputPais" value="${data.pais}">
                                </div>
                                <div class="col-md-6">
                                    <label for="inputCodigoPostal" class="form-label">Codigo Postal</label>
                                    <input type="text" class="form-control" id="inputCodigoPostal" value="${data.codigoPostal}">
                                </div>
                                <div class="col-md-6">
                                    <label for="inputTelefono" class="form-label">Telefono</label>
                                    <input type="text" class="form-control" id="inputTelefono" value="${data.telefono}">
                                </div>
                                <div class="col-md-6">
                                    <label for="inputFechaAlta" class="form-label">Fecha Alta</label>
                                    <input type="text" class="form-control" id="inputFechaAlta" value="${data.fechaAlta}">
                                </div>
                                <div class="col-md-6">
                                    <label for="inputEsAdmin" class="form-label">Es Admin</label>
                                    <input type="checkbox" class="form-check" id="inputEsAdmin" value="${data.role}" ${data.role ? 'checked' : ''}>
                                    <label for="inputBloquear" class="form-label">Bloquear</label>
                                    <input type="checkbox" class="form-check" id="inputBloquear" value="${data.bloquear}" ${data.bloquear ? 'checked' : ''}>
                                </div>
                            </form>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary" id="btnGuardar">Guardar</button>
                                <button type="button" class="btn btn-danger" id="btnEliminar">Eliminar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="btnCancelar">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;          
        formActualizarUsuarios.classList.remove('d-none');
        const modalEdicion = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        modalEdicion.show();
        document.getElementById('tablaCompletaUsuarios').classList.add('d-none');
        document.getElementById('tituloTablaUsuarios').textContent = 'Editar Usuario';

        document.getElementById('btn-cancelar').addEventListener('click', () => {
            document.getElementById('tablaCompletaUsuarios').classList.remove('d-none');
            document.getElementById('formularioActualizarUsuarios').classList.add('d-none');
            document.getElementById('tituloTablaUsuarios').textContent = 'Lista de Usuarios';
        });

        document.getElementById('btnGuardar').addEventListener('click', () => {
            event.preventDefault();
            console.log("Adentro de guardar");
            const nombre = document.getElementById('inputNombre').value;
            const apellido = document.getElementById('inputApellido').value;
            const email = document.getElementById('inputEmail').value;
            const password = document.getElementById('inputPassword').value;
            const dni= document.getElementById('inputDni').value;
            const role = document.getElementById('inputEsAdmin').checked;
            const direccion = document.getElementById('inputDireccion').value;
            const ciudad = document.getElementById('inputCiudad').value;
            const provincia = document.getElementById('inputProvincia').value;
            const pais = document.getElementById('inputPais').value;
            const codigoPostal = document.getElementById('inputCodigoPostal').value;
            const telefono = document.getElementById('inputTelefono').value;
            const bloquear = document.getElementById('inputBloquear').checked;
            const fechaAlta = document.getElementById('inputFechaAlta').value;

            fetch (`${API_URL_USU}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido, email, password, dni, role, direccion, ciudad, provincia, pais, codigoPostal, telefono, bloquear, fechaAlta })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Usuario actualizado:", data);
                document.getElementById('tablaCompletaUsuarios').classList.remove('d-none');
                document.getElementById('formularioActualizarUsuarios').classList.add('d-none');
                document.getElementById('tituloTablaUsuarios').textContent = 'Lista de Usuarios';
                alert('Usuario actualizado exitosamente');
                modalEdicion.hide();
                listaDeUsuarios();
            });
        });

        document.getElementById('btnEliminar').addEventListener('click', () => {
            fetch (`${API_URL_USU}/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                console.log("Usuario eliminado:", data);
                document.getElementById('tablaCompletaUsuarios').classList.remove('d-none');
                document.getElementById('formularioActualizarUsuarios').classList.add('d-none');
                document.getElementById('tituloTablaUsuarios').textContent = 'Lista de Usuarios';
                alert('Usuario eliminado exitosamente');
                modalEdicion.hide();
                listaDeUsuarios();
            });
        });

        document.getElementById('btnCancelar').addEventListener('click', () => {
            formActualizarUsuarios.innerHTML = '';
            document.getElementById('tablaCompletaUsuarios').classList.remove('d-none');
            document.getElementById('formularioActualizarUsuarios').classList.add('d-none');
            document.getElementById('tituloTablaUsuarios').textContent = 'Lista de Usuarios';
            modalEdicion.hide();
            listaDeUsuarios();
        });
    })
}

function verDatosCompletos(id){
    fetch (`${API_URL_USU}/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log("Usuario cargado:", data);
            const form = document.getElementById('formularioActualizarUsuarios');
            form.innerHTML = `
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title fs-5" id="staticBackdropLabel">Datos de ${data.nombre}</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row row-cols-2">
                                <div class="col-4">Nombre:</div>
                                <div class="col-8">${data.nombre}</div>
                                <div class="col-4">Apellido:</div>
                                <div class="col-8">${data.apellido}</div>
                                <div class="col-4">Email:</div>
                                <div class="col-8">${data.email}</div>
                                <div class="col-4">DNI:</div>
                                <div class="col-8">${data.dni}</div>
                                <div class="col-4">Password:</div>
                                <div class="col-8">${data.password}</div>
                                <div class="col-4">Es Admin:</div>
                                <div class="col-8">${data.role}</div>
                                <div class="col-4">Direccion:</div>
                                <div class="col-8">${data.direccion}</div>
                                <div class="col-4">Ciudad:</div>
                                <div class="col-8">${data.ciudad}</div>
                                <div class="col-4">Provincia:</div>
                                <div class="col-8">${data.provincia}</div>
                                <div class="col-4">Pais:</div>
                                <div class="col-8">${data.pais}</div>
                                <div class="col-4">CP:</div>
                                <div class="col-8">${data.codigoPostal}</div>
                                <div class="col-4">Telefono:</div>
                                <div class="col-8">${data.telefono}</div>
                                <div class="col-4">Bloquear:</div>
                                <div class="col-8">${data.bloquear}</div>
                                <div class="col-4">Fecha Alta:</div>
                                <div class="col-8">${data.fechaAlta}</div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="btnImprimir">Imprimir</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="btnCancelar">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            document.getElementById('formularioActualizarUsuarios').classList.remove('d-none');
            const modalVer = new bootstrap.Modal(document.getElementById('staticBackdrop'));
            modalVer.show();

            document.getElementById('btnImprimir').addEventListener('click', () => {
                window.print();
            });

            document.getElementById('btnCancelar').addEventListener('click', () => {
                form.innerHTML = '';
                document.getElementById('formularioActualizarUsuarios').classList.add('d-none');
                document.getElementById('tablaCompletaUsuarios').classList.remove('d-none');
                document.getElementById('tituloTablaUsuarios').textContent = 'Lista de Usuarios';
                modalVer.hide();
            })
            document.getElementById('tituloTablaUsuarios').textContent = 'Datos Completos';
            document.getElementById('tablaCompletaUsuarios').classList.add('d-none');
        });
}

function crearUsuario(){
    console.log("Adentro de crearUsuario");
    const form = document.getElementById('formularioActualizarUsuarios');
    form.innerHTML = `
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title fs-5" id="staticBackdropLabel">Crear Usuario</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row g-3" id="nuevoUsuario">
                            <div class="col-md-6">
                                <label for="inputNombre" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="inputNombre" placeholder="Nombre">
                            </div>
                            <div class="col-md-6">
                                <label for="inputApellido" class="form-label">Apellido</label>
                                <input type="text" class="form-control" id="inputApellido" placeholder="Apellido">
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail" class="form-label">Email</label>
                                <input type="text" class="form-control" id="inputEmail" placeholder="Email">
                            </div>
                            <div class="col-md-6">
                                <label for="inputPassword" class="form-label">Password</label>
                                <input type="text" class="form-control" id="inputPassword" placeholder="Password">
                            </div>
                            <div class="col-md-6">
                                <label for="inputDni" class="form-label">Documento</label>
                                <input type="text" class="form-control" id="inputDni" placeholder="Documento de identidad">
                            </div>
                            <div class="col-md-6">
                                <label for="inputDireccion" class="form-label">Direccion</label>
                                <input type="text" class="form-control" id="inputDireccion" placeholder="Direccion">
                            </div>
                            <div class="col-md-6">
                                <label for="inputCiudad" class="form-label">Ciudad</label>
                                <input type="text" class="form-control" id="inputCiudad" placeholder="Ciudad">
                            </div>
                            <div class="col-md-6">
                                <label for="inputProvincia" class="form-label">Provincia</label>
                                <input type="text" class="form-control" id="inputProvincia" placeholder="Provincia">
                            </div>
                            <div class="col-md-6">
                                <label for="inputPais" class="form-label">Pais</label>
                                <input type="text" class="form-control" id="inputPais" placeholder="Pais">
                            </div>
                            <div class="col-md-6">
                                <label for="inputCodigoPostal" class="form-label">Codigo Postal</label>
                                <input type="text" class="form-control" id="inputCodigoPostal" placeholder="Codigo Postal">
                            </div>
                            <div class="col-md-6">
                                <label for="inputTelefono" class="form-label">Telefono</label>
                                <input type="text" class="form-control" id="inputTelefono" placeholder="Telefono">
                            </div>
                            <div class="col-md-6">
                                <label for="inputFechaAlta" class="form-label">Fecha Alta</label>
                                <input type="text" class="form-control" id="inputFechaAlta" placeholder="Fecha Alta">
                            </div>
                            <div class="col-md-6">
                                <label for="inputEsAdmin" class="form-label">Es Admin</label>
                                <input type="checkbox" class="form-check" id="inputEsAdmin">
                                <label for="inputBloquear" class="form-label">Bloquear</label>
                                <input type="checkbox" class="form-check" id="inputBloquear">
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" id="btnGuardarNuevo">Guardar</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="btnCancelarNuevo">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    `;
    form.classList.remove('d-none');
    const modalEdicion = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modalEdicion.show();
    document.getElementById('btnGuardarNuevo').addEventListener('click', () => {
        event.preventDefault();
        const nombre = document.getElementById('inputNombre').value;
        const apellido = document.getElementById('inputApellido').value;
        const email = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;
        const dni= document.getElementById('inputDni').value;
        const role = document.getElementById('inputEsAdmin').checked;
        const direccion = document.getElementById('inputDireccion').value;
        const ciudad = document.getElementById('inputCiudad').value;
        const provincia = document.getElementById('inputProvincia').value;
        const pais = document.getElementById('inputPais').value;
        const codigoPostal = document.getElementById('inputCodigoPostal').value;
        const telefono = document.getElementById('inputTelefono').value;
        const bloquear = document.getElementById('inputBloquear').checked;
        const fechaAlta = document.getElementById('inputFechaAlta').value;

        fetch (API_URL_USU, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, email, password, dni, role, direccion, ciudad, provincia, pais, codigoPostal, telefono, bloquear, fechaAlta })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Usuario creado:", data);
            document.getElementById('tablaCompletaUsuarios').classList.remove('d-none');
            document.getElementById('formularioActualizarUsuarios').classList.add('d-none');
            document.getElementById('tituloTablaUsuarios').textContent = 'Lista de Usuarios';
            modalEdicion.hide();
            alert('Usuario creado exitosamente');
            listaDeUsuarios();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const listaDeUsuariosButton = document.getElementById('btnListaUsuarios');
    listaDeUsuariosButton.addEventListener('click', () => {
        if (document.getElementById('tablaCompletaUsuarios').classList.contains('d-none')) {
            listaDeUsuarios();
        }else{
            document.getElementById('tablaCompletaUsuarios').classList.add('d-none');
            document.getElementById('formularioActualizarUsuarios').classList.add('d-none');
            document.getElementById('tituloTablaUsuarios').textContent = 'Lista de Usuarios';
        }
    });

    document.getElementById('btnAgregarUsuario').addEventListener('click', () => {
        crearUsuario();
    });
});