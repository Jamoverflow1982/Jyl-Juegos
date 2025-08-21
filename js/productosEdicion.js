//const API_URL = "http://localhost:8080/articulos";
const API_URL = "https://back-jyl-juegos-production.up.railway.app/articulos";

function cargarProductos(){
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log("Productos cargados:", data);
            const tbody = document.getElementById('tbodyProductos');
            tbody.innerHTML = '';
            data.forEach(producto => {
                const row = document.createElement('tr');
                if (producto.stock <= 0) {
                    row.classList.add('sinStock');
                    row.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.categoria}</td>
                    ${producto.destacado ? '<td>Si</td>' : '<td>No</td>'}
                    ${producto.oferta ? '<td>Si</td>' : '<td>No</td>'}
                    <td>${producto.descuento}</td>
                    <td><button class="btn btn-primary" onclick="editarProducto(${producto.id})">Editar</button></td>
                    <td><button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
                `;
                tbody.appendChild(row);
                }
                
            });
            data.forEach(producto => {
                const row = document.createElement('tr');
                if (producto.stock > 0) {
                    row.classList.remove('sinStock');
                    row.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.categoria}</td>
                    ${producto.destacado ? '<td>Si</td>' : '<td>No</td>'}
                    ${producto.oferta ? '<td>Si</td>' : '<td>No</td>'}
                    <td>${producto.descuento}</td>
                    <td><button class="btn btn-primary" onclick="editarProducto(${producto.id})">Editar</button></td>
                    <td><button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
                `;
                tbody.appendChild(row);
                }
            });
        })
        .catch(error => console.error("Error al cargar productos:", error));
}

function editarProducto(id) {
    console.log("Ingreso a editar articulo")
    fetch (`${API_URL}/${id}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log("Producto a editar:", data);
        const tablaCompleta = document.getElementById('tablaCompleta');
        tablaCompleta.classList.add('d-none');
        const formAct = document.getElementById('formularioActualizar');
        formAct.classList.remove('d-none');
        formAct.innerHTML = `
                <form class="row g-3" id="formularioIngresoProd">
                    <div class="col-md-7">
                        <label for="inputNombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="inputNombre" value="${data.nombre}">
                    </div>
                    <div class="col-md-3">
                        <label for="inputPrecio" class="form-label">Precio $</label>
                        <input type="text" class="form-control" id="inputPrecio" value="${data.precio}">
                    </div>
                    <div class="col-md-2">
                        <label for="inputStock" class="form-label">Stock</label>
                        <input type="text" class="form-control" id="inputStock" value="${data.stock}">
                    </div>
                    <div class="mb-3">
                        <label for="descripcion" class="form-label">Descripcion</label>
                        <input type="text" class="form-control" id="descripcion" value="${data.descripcion}">
                    </div>
                    <div class="col-md-8">
                        <label for="imagen" class="form-label">Imagen</label>
                        <input type="text" class="form-control" id="imagen" value="${data.imagen}">
                    </div>
                    <div class="col-md-4">
                        <label for="categoria" class="form-label">Categoria</label>
                        <select class="form-select" aria-label="Default select example" id="categoria" value="${data.categoria}">
                            <option selected value="Bebote">Bebote</option>
                            <option value="Accesorio Bebote">Accesorio bebote</option>
                            <option value="3D">3D</option>
                            <option value="Varios">Varios</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="destacado" class="form-label">Destacado</label>
                        <select class="form-select" aria-label="Default select example" id="destacado" value="${data.destacado}">
                            <option selected value="false">No</option>
                            <option value="true">Si</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="oferta" class="form-label">Oferta</label>
                        <select class="form-select" aria-label="Default select example" id="oferta" value="${data.oferta}">
                            <option selected value="false">No</option>
                            <option value="true">Si</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="descuento" class="form-label">Descuento %</label>
                        <input type="text" class="form-control" id="descuento" value="${data.descuento}">
                    </div>
                    <div class="center-div">
                        <button type="submit" class="btn btn-primary">Actualizar</button>
                        <button type="button" class="btn btn-info" id="btn-cancelar">Cancelar</button>
                    </div>
                </form>
        `;
        const formulario = document.getElementById('formularioIngresoProd');
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();
            const actualizado = {
                nombre: document.getElementById('inputNombre').value,
                precio: document.getElementById('inputPrecio').value,
                stock: document.getElementById('inputStock').value,
                descripcion: document.getElementById('descripcion').value,
                imagen: document.getElementById('imagen').value,
                categoria: document.getElementById('categoria').value,
                destacado: document.getElementById('destacado').value,
                oferta: document.getElementById('oferta').value,
                descuento: document.getElementById('descuento').value
            }

            console.log("Modificacion: ", actualizado);
            fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(actualizado)
            })
            .then(response => response.json())
            .then(data => {
                console.log("Producto actualizado:", data);
                formAct.classList.add('d-none');
                formAct.innerHTML = '';
                tablaCompleta.classList.remove('d-none');
                cargarProductos();
            })
            .catch(error => console.error("Error al actualizar producto:", error));
        });
        const btnCancelar = document.getElementById('btn-cancelar');
        btnCancelar.addEventListener('click', () => {
            formAct.classList.add('d-none');
            formAct.innerHTML = '';
            tablaCompleta.classList.remove('d-none');
            cargarProductos();
        });
        
    })
}

function crearProducto(producto){
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error al crear producto");
        }
    })
    .then(data => {
        console.log("Producto creado:", data);
        alert("Producto creado exitosamente");
        const formCrearProd = document.getElementById('formCrearProd');
        formCrearProd.reset();
        formularioIngresoProd.classList.add('d-none');
        cargarProductos();
    })
    .catch(error => console.error("Error al crear producto:", error));
}

function eliminarProducto(id){
    const confirmarEliminacion = confirm("¿Estás seguro de eliminar el producto?");
    if (!confirmarEliminacion) {
        return;
    }else{  
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                cargarProductos();
            } else {
                throw new Error("Error al eliminar producto");
            }
        })
        .then(data => {
            console.log("Producto eliminado:", data);
            alert("Producto eliminado exitosamente");
        })
        .catch(error => console.error("Error al eliminar producto:", error));
    }
}

function buscarProductos(terminoBusqueda) {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            let i = 0;
            const tituloTabla = document.getElementById('tituloTabla');
            tituloTabla.textContent = 'Productos encontrados para : "' + terminoBusqueda + '"';
            tablaCompleta = document.getElementById('tablaCompleta');
            tablaCompleta.classList.remove('d-none');
            const tbody = document.getElementById('tbodyProductos');
            tbody.innerHTML = '';
            data.forEach(producto => {
                if (producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                    i++;
                    const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.categoria}</td>
                    ${producto.destacado ? '<td>Si</td>' : '<td>No</td>'}
                    ${producto.oferta ? '<td>Si</td>' : '<td>No</td>'}
                    <td>${producto.descuento}</td>
                    <td><button class="btn btn-primary" onclick="editarProducto(${producto.id})">Editar</button></td>
                    <td><button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
                `;
                tbody.appendChild(row);
                }
            });
            if (i === 0) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="10">No se encontraron productos con el término de búsqueda.</td>
                `;
                tbody.appendChild(row);
            }else{
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="10">Se encontraron ${i} productos con el término de búsqueda.</td>
                `;
                tbody.appendChild(row);
            }
        })
        .catch(error => console.error("Error al buscar productos:", error));
}

document.addEventListener('DOMContentLoaded', () => {
    
    document.addEventListener('click', (event) => {
        const formAct = document.getElementById('formularioActualizar');
        const tablaCompleta = document.getElementById('tablaCompleta');
        const formularioIngresoProd = document.getElementById('formularioIngresoProd');
        const tituloTabla = document.getElementById('tituloTabla');
        
        if (event.target.id === 'btnListaProductos') {
            if (tablaCompleta.classList.contains('d-none') || tituloTabla.textContent !== 'Lista de Productos') {
                tablaCompleta.classList.remove('d-none');
                tituloTabla.textContent = 'Lista de Productos';
                cargarProductos();
            }else{
                tablaCompleta.classList.add('d-none');
            }
        }

        if (event.target.id === 'btnAgregarProducto') {
            if (formularioIngresoProd.classList.contains('d-none')) {
                formularioIngresoProd.classList.remove('d-none');
                formularioIngresoProd.addEventListener('submit', event => {
                    event.preventDefault();
                    const nuevoProducto = {
                        nombre: document.getElementById('inputNombre').value,
                        precio: document.getElementById('inputPrecio').value,
                        stock: document.getElementById('inputStock').value,
                        descripcion: document.getElementById('descripcion').value,
                        imagen: document.getElementById('imagen').value,
                        categoria: document.getElementById('categoria').value,
                        destacado: document.getElementById('destacado').value,
                        oferta: document.getElementById('oferta').value,
                        descuento: document.getElementById('descuento').value
                    }
                    crearProducto(nuevoProducto);
                })
            }else{
                formularioIngresoProd.classList.add('d-none');
            }
        }

        if (event.target.id === 'btnBuscar') {
            const terminoBusqueda = document.getElementById('inputBuscar').value;
            console.log("Termino de busqueda: ", terminoBusqueda);
            buscarProductos(terminoBusqueda);
        }
    })
});
