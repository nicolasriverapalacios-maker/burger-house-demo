const productos = [
    {
        nombre: "Clásica",
        descripcion: "Carne, queso, lechuga, tomate y salsa especial.",
        precio: 89,
        imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    },

    {
        nombre: "BBQ",
        descripcion: "Carne, queso, tocino y salsa BBQ.",
        precio: 109,
        imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
    },

    {
        nombre: "Doble",
        descripcion: "Doble carne, doble queso y nuestra salsa especial.",
        precio: 129,
        imagen: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80"
    }
];
const contenedor = document.getElementById("productos");

for (let producto of productos) {

    contenedor.innerHTML += `
    <article>

        <img 
            src="${producto.imagen}" 
            alt="${producto.nombre}"
            class="imagen-producto"
        >

        <div class="informacion-producto">

            <h3>${producto.nombre}</h3>

            <p>${producto.descripcion}</p>

            <div class="precio-producto">
                <strong>$${producto.precio}</strong>

                <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">
                    Agregar +
                </button>
            </div>

        </div>

    </article>
`;
}
let carrito = [];
function agregarAlCarrito(nombre, precio) {

    let productoEncontrado = carrito.find(
        producto => producto.nombre === nombre
    );

    if (productoEncontrado) {

        productoEncontrado.cantidad =
            productoEncontrado.cantidad + 1;

    } else {

        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });

    }

    mostrarCarrito();
}

function mostrarCarrito() {

    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total");

    listaCarrito.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    for (let producto of carrito) {

        let subtotal = producto.precio * producto.cantidad;

        cantidadTotal = cantidadTotal + producto.cantidad;

        listaCarrito.innerHTML += `
            <div class="producto-carrito">

                <span>
                    ${producto.nombre}
                </span>

                <div>
                    <button onclick="disminuirCantidad('${producto.nombre}')">
                        -
                    </button>

                    <span>${producto.cantidad}</span>

                    <button onclick="aumentarCantidad('${producto.nombre}')">
                        +
                    </button>
                </div>

                <strong>
                    $${subtotal}
                </strong>

            </div>
        `;

        total = total + subtotal;
    }

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
    }

    totalCarrito.textContent = total;


    // Actualizar carrito flotante

    const carritoFlotante = document.getElementById("carrito-flotante");
    const cantidadCarrito = document.getElementById("cantidad-carrito");
    const totalFlotante = document.getElementById("total-flotante");

    cantidadCarrito.textContent = cantidadTotal;
    totalFlotante.textContent = total;

    if (cantidadTotal > 0) {

        carritoFlotante.style.display = "flex";

    } else {

        carritoFlotante.style.display = "none";

    }
}

function aumentarCantidad(nombre) {

    let producto = carrito.find(
        producto => producto.nombre === nombre
    );

    producto.cantidad = producto.cantidad + 1;

    mostrarCarrito();
}

function disminuirCantidad(nombre) {

    let producto = carrito.find(
        producto => producto.nombre === nombre
    );

    producto.cantidad = producto.cantidad - 1;

    if (producto.cantidad === 0) {

        carrito = carrito.filter(
            producto => producto.nombre !== nombre
        );

    }

    mostrarCarrito();
}

function vaciarCarrito() {

    carrito = [];

    mostrarCarrito();
}

function irAlMenu() {
    document.getElementById("menu").scrollIntoView();
}

function pedirWhatsApp() {
    window.open("https://wa.me/529983018627");
}

function enviarPedido() {

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "Hola, quiero hacer el siguiente pedido:\n\n";
    let total = 0;

    for (let producto of carrito) {

    let subtotal = producto.precio * producto.cantidad;

    mensaje += producto.cantidad +
               " x " +
               producto.nombre +
               " - $" +
               subtotal +
               "\n";

                total = total + subtotal;
            }

    mensaje += "\nTotal: $" + total;

    const numeroWhatsApp = "529983018627";

    const url = "https://wa.me/" + numeroWhatsApp +
                "?text=" + encodeURIComponent(mensaje);

    window.open(url);
}