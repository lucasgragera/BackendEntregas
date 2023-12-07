import fs from "fs";

export class CartManager {
  constructor() {
    this.path = '../product.json';
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const cartsJSON = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(cartsJSON);
      } else return [];
    } catch (error) {
      console.log(error);
    }
  }

  async #getMaxId() {
    let maxId = 0;
    const carts = await this.getCarts();
    carts.map((prod) => {
      if (prod.id > maxId) maxId = prod.id;
    });
    return maxId;
  }

  async createCart() {
    try {
      const cart = {
        id: (await this.#getMaxId()) + 1,
        products: [],
      };
      const cartsFile = await this.getCarts();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id == id);

        if (cart) {
            const cartWithQuantity = {
                ...cart,
                products: cart.products.map((product) => ({
                    ...product,
                    quantity: product.quantity || 1, // Establece una cantidad predeterminada si no está definida
                })),
            };

            return cartWithQuantity;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}
  async saveProductToCart(idCart, idProd) {
    try {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex((c) => c.id == idCart);

        if (cartIndex !== -1) {
            const cart = carts[cartIndex];
            const existingProductIndex = cart.products.findIndex((p) => p.product === idProd);

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += 1;
            } else {
                const newProduct = {
                    product: idProd,
                    quantity: 1,
                };
                cart.products.push(newProduct);
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts));

            return cart;
        } else {
            console.log("Cart not found");
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}
async removeProductFromCart(idCart, idProd) {
  try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((c) => c.id == idCart);

      if (cartIndex !== -1) {
          const cart = carts[cartIndex];
          const existingProductIndex = cart.products.findIndex((p) => p.product === idProd);

          if (existingProductIndex !== -1) {
              cart.products.splice(existingProductIndex, 1);

              await fs.promises.writeFile(this.path, JSON.stringify(carts));

              return cart;
          } else {
              console.log("Product not found in cart");
              return null;
          }
      } else {
          console.log("Cart not found");
          return null;
      }
  } catch (error) {
      console.error(error);
  }
}
async updateProductQuantityInCart(idCart, idProd, newQuantity) {
  try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((c) => c.id == idCart);

      if (cartIndex !== -1) {
          const cart = carts[cartIndex];
          const existingProductIndex = cart.products.findIndex((p) => p.product === idProd);

          if (existingProductIndex !== -1) {
              cart.products[existingProductIndex].quantity = newQuantity;

              await fs.promises.writeFile(this.path, JSON.stringify(carts));

              return cart;
          } else {
              console.log("Product not found in cart");
              return null;
          }
      } else {
          console.log("Cart not found");
          return null;
      }
  } catch (error) {
      console.error(error);
  }
}
async updateCartProducts(idCart, newProducts) {
  try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((c) => c.id == idCart);

      if (cartIndex !== -1) {
          const cart = carts[cartIndex];
          
          cart.products = newProducts;

          await fs.promises.writeFile(this.path, JSON.stringify(carts));

          return cart;
      } else {
          console.log("Cart not found");
          return null;
      }
  } catch (error) {
      console.error(error);
  }
}
async removeAllProductsFromCart(idCart) {
  try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((c) => c.id == idCart);

      if (cartIndex !== -1) {
          const cart = carts[cartIndex];

          cart.products = [];

          await fs.promises.writeFile(this.path, JSON.stringify(carts));

          return cart;
      } else {
          console.log("Cart not found");
          return null;
      }
  } catch (error) {
      console.error(error);
  }
}

}