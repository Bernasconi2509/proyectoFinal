console.log("ok");


const productos = [
  {
    id: 1,
    nombre: "Microscopio óptico",
    precio: 246000,
    imagen: "Imagenes/MicroscopioOpticoBinocular.jpg",
    categoria: "microscopiosadultos",
    descripcion: "Ideal para estudiantes curiosos. Aumenta hasta 1000x."
  },
  {
    id: 2,
    nombre: "Microscopio digital",
    precio: 200000,
    imagen: "Imagenes/Microscopio.jpg",
    categoria: "microscopiosadultos",
    descripcion: "Con conexión USB para ver en pantalla. Alta resolución."
  },
  {
    id: 3,
    nombre: "Microscopio Para Adultos Y Niños",
    precio: 500000,
    imagen: "Imagenes/Microscope.jpg",
    categoria: "microscopiosadultos",
    descripcion: "100x-2000x"
  },
  {
    id: 4,
    nombre: "Microscopio Infantil",
    precio: 120000,
    imagen: "Imagenes/KitMicroscopio.jpg",
    categoria: "microscopiosniños",
    descripcion: "Ideal para niños curiosos"
  },
  {
    id: 5,
    nombre: "Microscopio Completo",
    precio: 90000,
    imagen: "Imagenes/MicroscopioInfantil.jpg",
    categoria: "microscopiosniños",
    descripcion: "Con todos los instrumentos necesarios para explorar"
  },
  {
    id: 6,
    nombre: "Microscopio Para Niños",
    precio: 26000,
    imagen: "Imagenes/MicroscopioParaNiños.jpg",
    categoria: "microscopiosniños",
    descripcion: "Con su maletín transportable"
  },
  {
    id: 7,
    nombre: "Kit de Química",
    precio: 30000,
    imagen: "Imagenes/KitQuimica.jpg",
    categoria: "kitquimica",
    descripcion: "Completo con diferentes experimentos"
  },
  {
    id: 8,
    nombre: "Juego de Química",
    precio: 17000,
    imagen: "Imagenes/KitQuimica2.jpg",
    categoria: "kitquimica",
    descripcion: "Incluye un manual con instrucciones"
  },
  {
    id: 9,
    nombre: "Caja de Química",
    precio: 24000,
    imagen: "Imagenes/KitQuimica3.jpg",
    categoria: "kitquimica",
    descripcion: "Con su mesa de experimentación"
  },
  {
    id: 10,
    nombre: "Sistema Solar",
    precio: 46000,
    imagen: "Imagenes/SistemaSolar.jpg",
    categoria: "sistemasolar",
    descripcion: "Completo con diferentes colores"
  },
  {
    id: 11,
    nombre: "Kit Sistema Solar",
    precio: 16000,
    imagen: "Imagenes/SistemaSolar2.jpg",
    categoria: "sistemasolar",
    descripcion: "Armar y pintar cada planeta"
  },
  {
    id: 12,
    nombre: "Sistema Planetario",
    precio: 26000,
    imagen: "Imagenes/SistemaSolar3.jpg",
    categoria: "sistemasolar",
    descripcion: "Con un simple proyector"
  }
];

// 2. Función que crea la tarjeta de producto
function crearTarjeta(producto) {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <span>$${producto.precio}</span>
    <button class="boton-agregar" data-id="${producto.id}">Agregar al carrito</button>
  `;
  return div;
}

// 3. Mostrar productos por categoría
function mostrarProductos() {
  for (let i = 0; i < productos.length; i++) {
    let prod = productos[i];
    let contenedor = document.getElementById("contenedor-" + prod.categoria);
    if (contenedor) {
      let tarjeta = crearTarjeta(prod);
      contenedor.appendChild(tarjeta);
    }
  }
  activarBotones();
}

mostrarProductos(); // Mostrar todo al cargar

// 4. Carrito
let carrito = [];

function agregarAlCarrito(id) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id == id) {
      let productoExistente = false;

      for (let j = 0; j < carrito.length; j++) {
        if (carrito[j].id == id) {
          carrito[j].cantidad++;
          productoExistente = true;
          break;
        }
      }

      if (!productoExistente) {
        let copia = Object.assign({}, productos[i]);
        copia.cantidad = 1;
        carrito.push(copia);
      }

      console.log("Carrito actual:", carrito);
      renderizarCarrito();
      break;
    }
  }
}

function renderizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    const prod = carrito[i];
    total += prod.precio * prod.cantidad;

    const li = document.createElement("li");
    li.innerHTML = `
      ${prod.nombre}
      <div class="cantidad-control">
        <button class="menos" data-i="${i}">−</button>
        <span>${prod.cantidad}</span>
        <button class="mas" data-i="${i}">+</button>
      </div>
      <span>$${prod.precio * prod.cantidad}</span>
      <button class="eliminar" data-i="${i}">🗑️</button>
    `;
    lista.appendChild(li);
  }

  document.querySelector(".carrito-total").textContent = "Total: $" + total;
  activarControles();
}

function activarBotones() {
  const botones = document.getElementsByClassName("boton-agregar");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", function () {
      const id = this.dataset.id;
      agregarAlCarrito(id);
    });
  }
}

function activarControles() {
  const botonesMas = document.getElementsByClassName("mas");
  const botonesMenos = document.getElementsByClassName("menos");
  const botonesEliminar = document.getElementsByClassName("eliminar");

  for (let i = 0; i < botonesMas.length; i++) {
    botonesMas[i].addEventListener("click", function () {
      const index = this.dataset.i;
      carrito[index].cantidad++;
      renderizarCarrito();
    });
  }

  for (let i = 0; i < botonesMenos.length; i++) {
    botonesMenos[i].addEventListener("click", function () {
      const index = this.dataset.i;
      carrito[index].cantidad--;
      if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
      }
      renderizarCarrito();
    });
  }

  for (let i = 0; i < botonesEliminar.length; i++) {
    botonesEliminar[i].addEventListener("click", function () {
      const index = this.dataset.i;
      carrito.splice(index, 1);
      renderizarCarrito();
    });
  }
}
