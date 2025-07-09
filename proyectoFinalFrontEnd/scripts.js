const botonesAgregar = document.querySelectorAll('.boton-agregar');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.querySelector('.carrito-total');

let carrito = [];

botonesAgregar.forEach(boton => {
  boton.addEventListener('click', () => {
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio);

    const producto = carrito.find(p => p.nombre === nombre);
    if (producto) {
      producto.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }

    renderizarCarrito();
  });
});

function renderizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach((prod, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${prod.nombre}
      <div class="cantidad-control">
        <button data-i="${i}" class="menos">−</button>
        <span>${prod.cantidad}</span>
        <button data-i="${i}" class="mas">+</button>
      </div>
      <span>$${prod.precio * prod.cantidad}</span>
      <button data-i="${i}" class="eliminar">🗑️</button>
    `;
    listaCarrito.appendChild(li);
    total += prod.precio * prod.cantidad;
  });

  totalCarrito.textContent = `Total: $${total}`;
  activarBotones();
}

function activarBotones() {
  document.querySelectorAll('.mas').forEach(b => {
    b.onclick = () => {
      carrito[b.dataset.i].cantidad++;
      renderizarCarrito();
    };
  });

  document.querySelectorAll('.menos').forEach(b => {
    b.onclick = () => {
      const p = carrito[b.dataset.i];
      p.cantidad--;
      if (p.cantidad <= 0) carrito.splice(b.dataset.i, 1);
      renderizarCarrito();
    };
  });

  document.querySelectorAll('.eliminar').forEach(b => {
    b.onclick = () => {
      carrito.splice(b.dataset.i, 1);
      renderizarCarrito();
    };
  });
}
