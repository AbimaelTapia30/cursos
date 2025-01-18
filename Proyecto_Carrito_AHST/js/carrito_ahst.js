// variables
const carritoahst = document.querySelector("#carrito");
const listaCursosahst = document.querySelector("#lista-cursos");
const contenedorCarritoahst = document.querySelector("tbody");
const vaciarCarritoahst = document.querySelector("#vaciar-carrito");

let articulosCarritoahst = [];

// solamente eventos
cargarEventosListenersahst();
function cargarEventosListenersahst() {
   listaCursosahst.addEventListener("click", agregarCursoahst);
   carritoahst.addEventListener("click", eliminarCursoahst);
   vaciarCarritoahst.addEventListener("click", vaciarCarritoahstFunc);
}

function agregarCursoahst(e) {
   e.preventDefault();
   if (e.target.classList.contains("agregar-carrito")) {
      const cursoSeleccionadoahst = e.target.parentElement.parentElement;
      leerDatosCursoahst(cursoSeleccionadoahst);
   }
}

function eliminarCursoahst(e) {
   if (e.target.classList.contains("borrar-curso")) {
      const cursoIdahst = e.target.getAttribute("data-id");
      articulosCarritoahst = articulosCarritoahst.filter(cursoSeleccionado => cursoSeleccionado.id !== cursoIdahst);
      carritoHTMLahst();
   }
}

function leerDatosCursoahst(cursoSeleccionadoahst) {
   const infoCursoahst = {
      imagen: cursoSeleccionadoahst.querySelector("img").src,
      titulo: cursoSeleccionadoahst.querySelector("h4").textContent,
      precio: cursoSeleccionadoahst.querySelector(".precio span").textContent,
      id: cursoSeleccionadoahst.querySelector("a").getAttribute("data-id"),
      cantidad: 1
   };

   const existeahst = articulosCarritoahst.some(cursoSeleccionado => cursoSeleccionado.id === infoCursoahst.id);

   if (existeahst) {
      const cursosActualizadosahst = articulosCarritoahst.map(cursoSeleccionado => {
         if (cursoSeleccionado.id === infoCursoahst.id) {
            cursoSeleccionado.cantidad++;
            return cursoSeleccionado;
         } else {
            return cursoSeleccionado;
         }
      });
      articulosCarritoahst = [...cursosActualizadosahst];
   } else {
      articulosCarritoahst = [...articulosCarritoahst, infoCursoahst];
   }

   carritoHTMLahst();
}

function carritoHTMLahst() {
   limpiarHTMLahst();
   articulosCarritoahst.forEach(cursoSeleccionado => {
      const row = document.createElement("tr");
      row.innerHTML = `
         <td><img src="${cursoSeleccionado.imagen}" width="200"></td>
         <td>${cursoSeleccionado.titulo}</td>
         <td>${cursoSeleccionado.precio}</td>
         <td>${cursoSeleccionado.cantidad}</td>
         <td><a href="#" class="borrar-curso" data-id="${cursoSeleccionado.id}">Borrar</a></td>
      `;
      contenedorCarritoahst.appendChild(row);
   });
}

function limpiarHTMLahst() {
   contenedorCarritoahst.innerHTML = '';
}

function vaciarCarritoahstFunc() {
   articulosCarritoahst = [];
   carritoHTMLahst();
}
