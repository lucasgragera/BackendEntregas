import * as service from "../servicies/product.servicies.js";

export const addProductToCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const { idProduct } = req.params;
    const newProduct = await service.addProductToCart(idCart, idProduct);
    res.json(newProduct);
  } catch (error) {
    nex(error);
  }
}

export const sortAggregation = async (req, res, next) => {
  try {
    const response = await service.sortAggregation();
    res.json(response);
  } catch (error) {
    next(error)
  }
}


export const getQuery = async (req, res, next) => {
  try {
    const { query } = req.query;
    const response = await service.getQuery({ query });
    const queryColl = response.hasQuery ? 'http://localhost:8080/api/products?page=${response.hasQuery}' : null;
    res.json(queryColl)
  } catch (error) {
    next(error.message);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, category, availability, sort } = req.query;
    const response = await service.getAll(page, limit, category, availability, sort);
    
    res.status(200).json(response)({
      status: 'success',
      payload: response.docs,
      //No logre hacer que se vean status ni payload,
      //me aparecen, o solo status y payload y no todo lo de paginate,
      //o todo lo de paginate menos status y payload.
      //Me podrias decir como harias para que aparezcan ambos? 
      //lo deje con la segunda opcion porque me parecio la mas completa
    })
         
    
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
};


export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.getById(id);
    if (!response) {
      res.status(404).json({ msg: "Product Not found!" });
    } else {
      res.render("home", { style: "products.css", products: { response } });
    }
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const { title, description, code, price, stock, thumbnails } = req.body;
    const newProd = { title, description, code, price, stock, thumbnails }
    const response = await service.create(newProd);
    if (!response) res.status(404).json({ msg: "Error create product!" });
    res.status(200).json(newProd);
  } catch (error) {
    next(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodUpd = await service.update(id, req.body);
    if (!prodUpd) res.status(404).json({ msg: "Error update product!" });
    else res.status(200).json(prodUpd);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodDel = await service.remove(id);
    if (!prodDel) res.status(404).json({ msg: "Error delete product!" });
    else res.status(200).json({ msg: `Product id: ${id} deleted` });
  } catch (error) {
    next(error.message);
  }
};