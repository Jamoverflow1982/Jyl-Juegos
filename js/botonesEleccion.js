document.addEventListener('DOMContentLoaded', () => {
    const btnProductos = document.getElementById('btnProductos');
    btnProductos.addEventListener('click', () => {
        if (document.getElementById('inputBuscar').classList.contains('d-none')) {
            document.getElementById('btnListaProductos').classList.remove('d-none');
            document.getElementById('btnAgregarProducto').classList.remove('d-none');
            document.getElementById('inputBuscar').classList.remove('d-none');
            document.getElementById('btnBuscar').classList.remove('d-none');
            document.getElementById('btnListaUsuarios').classList.add('d-none');
            document.getElementById('btnAgregarUsuario').classList.add('d-none');
            document.getElementById('inputBuscarUsuario').classList.add('d-none');
            document.getElementById('btnBuscarUsuario').classList.add('d-none');
            document.getElementById('tablaCompletaUsuarios').classList.add('d-none');
            document.getElementById('formularioActualizarUsuarios').classList.add('d-none');
        }else{
            document.getElementById('btnListaProductos').classList.add('d-none');
            document.getElementById('btnAgregarProducto').classList.add('d-none');
            document.getElementById('inputBuscar').classList.add('d-none');
            document.getElementById('btnBuscar').classList.add('d-none');
            document.getElementById('btnListaUsuarios').classList.add('d-none');
            document.getElementById('btnAgregarUsuario').classList.add('d-none');
            document.getElementById('inputBuscarUsuario').classList.add('d-none');
            document.getElementById('btnBuscarUsuario').classList.add('d-none');
            document.getElementById('formularioIngresoProd').classList.add('d-none');
            document.getElementById('formularioActualizar').classList.add('d-none');
            document.getElementById('tablaCompleta').classList.add('d-none');
            document.getElementById('tablaCompletaUsuarios').classList.add('d-none');
            document.getElementById('formularioActualizarUsuarios').classList.add('d-none');
        }
    });
    const btnUsuarios = document.getElementById('btnUsuarios');
    btnUsuarios.addEventListener('click', () => {
        if (document.getElementById('inputBuscarUsuario').classList.contains('d-none')) {
            document.getElementById('btnListaUsuarios').classList.remove('d-none');
            document.getElementById('btnAgregarUsuario').classList.remove('d-none');
            document.getElementById('inputBuscarUsuario').classList.remove('d-none');
            document.getElementById('btnBuscarUsuario').classList.remove('d-none');
            document.getElementById('btnListaProductos').classList.add('d-none');
            document.getElementById('btnAgregarProducto').classList.add('d-none');
            document.getElementById('inputBuscar').classList.add('d-none');
            document.getElementById('btnBuscar').classList.add('d-none');
            document.getElementById('formularioIngresoProd').classList.add('d-none');
            document.getElementById('formularioActualizar').classList.add('d-none');
            document.getElementById('tablaCompleta').classList.add('d-none');
        }else{
            document.getElementById('btnListaUsuarios').classList.add('d-none');
            document.getElementById('btnAgregarUsuario').classList.add('d-none');
            document.getElementById('inputBuscarUsuario').classList.add('d-none');
            document.getElementById('btnBuscarUsuario').classList.add('d-none');
            document.getElementById('btnListaProductos').classList.add('d-none');
            document.getElementById('btnAgregarProducto').classList.add('d-none');
            document.getElementById('inputBuscar').classList.add('d-none');
            document.getElementById('btnBuscar').classList.add('d-none');
            document.getElementById('formularioIngresoProd').classList.add('d-none');
            document.getElementById('formularioActualizar').classList.add('d-none');
            document.getElementById('tablaCompleta').classList.add('d-none');
            document.getElementById('tablaCompletaUsuarios').classList.add('d-none');
            document.getElementById('formularioActualizarUsuarios').classList.add('d-none');
        }
    });
});