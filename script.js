

// Función para cargar el archivo JSON con los productos
function cargarProductos() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;  
            mostrarProductos(productos);  
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            document.getElementById('productoContainer').innerHTML = 'Hubo un error al cargar los productos.';
        });
}

// Función para mostrar productos filtrados
function mostrarProductos(productosFiltrados) {
    const contenedor = document.getElementById('productoContainer');
    contenedor.innerHTML = '';
    
    //Condición para que cuando no coincida la busqueda con un producto muestre un mensaje, 
    // si no se crea con el innerHTML un productCard con los atributos
    if (productosFiltrados.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron productos que coincidan con tu búsqueda.</p>';
    } else {
        productosFiltrados.forEach(productos => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');

            productCard.innerHTML = `
                <div class="card">
                    <img src="${productos.imagen}" class="card-img-top" alt="${productos.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${productos.nombre}</h5>
                        <p class="card-text">${productos.descripcion}</p>
                        <p class="card-text">$${productos.precio.toLocaleString()}</p>
                        <p class="card-text">${productos.stock ? 'En stock' : 'Sin stock'}</p>
                        <a href="#" class="btn btn-primary">Ver producto</a>
                    </div>
                </div>
            `;

            contenedor.appendChild(productCard);
        });
    }
}

// Filtrar los productos por nombre, tipo y ordenar por precio
function filtrarProductos() {
    const buscadorQuery = document.getElementById('buscador').value.toLowerCase();
    const tipoProducto = document.getElementById('tipoProducto').value;
    const ordenarPrecio = document.getElementById('ordenarPrecio').value;

    let productosFiltrados = productos.filter(producto => {
        const nombreLower = producto.nombre.toLowerCase();
        return nombreLower.includes(buscadorQuery);
    });

    if (tipoProducto) {
        productosFiltrados = productosFiltrados.filter(producto => producto.tipo === tipoProducto);
    }

    if (ordenarPrecio === 'menor') {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (ordenarPrecio === 'mayor') {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    mostrarProductos(productosFiltrados);
}

// Evento para filtrar productos al hacer submit en el formulario
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    filtrarProductos();
});

// Muestra los productos al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();  
});

//Consummo de la Api para precios del dolar 
fetch('https://dolarapi.com/v1/dolares')
.then(response => response.json())
.then(data => {
  // Limpia cualquier dato previo en la tabla
  const tableBody = document.querySelector('#dolar-table tbody');
  tableBody.innerHTML = '';

  // Recorro los datos de la API
  data.forEach(item => {
    // Creo una fila para cada objeto de la API
    const row = document.createElement('tr');
    
    // Inserta los datos de cada columna
    row.innerHTML = `
      <td>${item.moneda}</td>
      <td>$${item.compra}</td>
      <td>$${item.venta}</td>
      <td>${item.casa}</td>
    
    `;
    
    // Añado la fila al cuerpo de la tabla
    tableBody.appendChild(row);
  });
})
// Capturador de error cuando no se obtienen los datos de la Api
.catch(error => {
  console.error('Error al obtener los datos:', error);
  document.getElementById('dolar-table').innerHTML = 'Hubo un error al obtener los datos.';
});
