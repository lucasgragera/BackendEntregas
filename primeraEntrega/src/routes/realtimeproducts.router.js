import { Router } from "express";
import { ProductManager } from "../daos/filesystem/product.dao.js";
const router = Router();
const store = new ProductManager();

router.get("/", async (req, res) => {
  const products = await store.getProducts();

  res.render("realtimeproducts");
});


router.get("/home", async (request,response)=>{
  try{
    const products = await store.getProducts();
    response.render('home', {products});
  }catch(error){
    response.status(500).json(error.message);
  };
})

export default router;