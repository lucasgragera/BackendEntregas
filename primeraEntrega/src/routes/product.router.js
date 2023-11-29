import { Router } from "express";
import {getAll, getById, create, update, remove, sortAggregation, getQuery, addProductToCart}from "../controllers/product.controllers.js"
//import { getAll } from "../controllers/product.controllers.js";
const router = Router();
import socketServer from "../app.js";
import  ProductManager  from "../daos/filesystem/product.dao.js";
//import { productValidator } from "../middlewares/productValidator.js";
const productManager = new ProductManager("../product.json");


 router.get("/", async (req, res) => {
   try {
     const { limit } = req.query;
     // const products = await productManager.getAll();
     const products = await getAll();
     if (!limit) res.status(200).json(products);
     else {
       const productsByLimit = await productManager.getProductsByLimit(limit);
       res.status(200).json(productsByLimit);
     }
   } catch (error) {
     res.status(500).json(error.message);
   }
 });

 router.get("/:id", async (req, res) => {
   try {
     const { id } = req.params;
     const product = await productManager.getById(Number(id));
     if (!product) res.status(404).json({ message: "product not found" });
     else res.status(200).json(product);
   } catch (error) {
     res.status(500).json(error.message);
   }
 });

 router.post("/", async (req, res) => {
   const producto = req.body
   console.log(producto);
   try {
     const productCreated = await productManager.create(producto);
     socketServer.emit("productos", await productManager.getAll());
     //
     res.status(200).json(productCreated);
   } catch (error) {
     res.status(500).json(error.message);
   }
 });

 router.put("/:id", async (req, res) => {
   try {
     const product = { ...req.body };
     const { id } = req.params;
     const idNumber = Number(id);
     const productOk = await productManager.getById(idNumber);
     if (!productOk) res.status(404).json({ message: "product not found" });
     else await productManager.updateProduct(product, idNumber);
     res.status(200).json({ message: `product id: ${id} updated` });
   } catch (error) {
     res.status(500).json(error.message);
   }
 });

 router.delete("/:id", async (req, res) => {
   try {
     const { id } = req.params;
     const idNumber = Number(id);
     await productManager.delete(idNumber);
     socketServer.emit("productos", await productManager.getAll());
     res.json({ message: `Product id: ${idNumber} deleted` });
   } catch (error) {
     res.status(500).json(error.message);
   }
 });


router.post('/add/:idCart/:idProduct', addProductToCart)

router.get('/sortAggregation', sortAggregation);

router.get('/getQuery', getQuery)

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);



export default router;