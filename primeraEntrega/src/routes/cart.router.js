import { Router } from "express";
import { CartManager } from "../CartManager.js";
import ProductManager from "../daos/filesystem/product.dao.js"; 

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager(); 

// Crear el carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);

        if (cart) {
            const cartWithQuantity = {
                ...cart,
                products: cart.products.map((product) => ({
                    ...product,
                    quantity: product.quantity || 1, 
                })),
            };

            res.status(200).json(cartWithQuantity);
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const allCarts = await cartManager.getCarts();
        res.status(200).json(allCarts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:idCart/product/:idProd', async (req, res) => {
    try {
        const { idProd, idCart } = req.params;
        const cart = await cartManager.getCartById(Number(idCart));
        const product = await productManager.getById(Number(idProd)); 
        if (cart && product) {
            const updatedCart = await cartManager.saveProductToCart(Number(idCart), Number(idProd));
            const addedProduct = updatedCart.products.find(p => p.product === Number(idProd));
            res.status(201).json({ message: 'Product added to cart successfully', addedProduct, cart: updatedCart });
        } else {
            res.status(404).json({ error: 'Cart or Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:cid/products/:id', async (req, res) => {
    try {
        const { cid, idProd } = req.params;
        const updatedCart = await cartManager.removeProductFromCart(Number(cid), Number(idProd));
        
        if (updatedCart) {
            res.status(200).json({ message: 'Product removed from cart successfully', cart: updatedCart });
        } else {
            res.status(404).json({ error: 'Cart or Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.delete('/:cid/products/', async (req, res) => {
    try {
        const { cid } = req.params;
        const updatedCart = await cartManager.removeAllProductsFromCart(Number(cid));

        if (updatedCart) {
            res.status(200).json({ message: 'All products removed from cart successfully', cart: updatedCart });
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        
        const updatedCart = await cartManager.updateCartProducts(Number(cid), products);
        
        if (updatedCart) {
            res.status(200).json({ message: 'Cart updated successfully', cart: updatedCart });
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/:cid/products/:id', async (req, res) => {
// router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, idProd } = req.params;
        // const { cid, pid } = req.params;
        const { quantity } = req.body;
        
        const updatedCart = await cartManager.updateProductQuantityInCart(Number(cid), Number(idProd), quantity);
        
        if (updatedCart) {
            res.status(200).json({ message: 'Product quantity updated successfully', cart: updatedCart });
        } else {
            res.status(404).json({ error: 'Cart or Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const updatedCart = await cartManager.removeAllProductsFromCart(Number(cid));
        
        if (updatedCart) {
            res.status(200).json({ message: 'All products removed from cart successfully', cart: updatedCart });
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;