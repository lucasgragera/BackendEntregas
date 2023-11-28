const socket = io();
socket.on("productos", (data) => {
  const productosLista = document.querySelector(".container");
  productosLista.innerHTML = " ";
  data.forEach((products) => {
    const boxItem = `
                <div class="product">
                <h3>${products.title}</h3>
                <p>Description: ${products.description}</p>
                <p>ID: ${products.id}</p>
                <p>$ ${products.price}</p>
                <p>Stock: ${products.stock}</p>
                </div>`;
    productosLista.innerHTML += boxItem;
  });
});
