import * as service from "../servicies/product.servicies.js";

export const addProductToCart = async(req, res, next)=>{
  try {
    const {idCart} = req.params;
    const {idProduct} = req.params;
    const newProduct = await service.addProductToCart(idCart, idProduct);
    res.json(newProduct);
  } catch (error) {
    nex(error);
  }
}

export const sortAggregation = async(req, res, next) =>{
  try {
    const response = await service.sortAggregation();
    res.json(response);
  } catch (error) {
    next(error)
  }
}


export const getQuery = async (req, res, next) => {
  try {
    const {query} = req.query;
    const response = await service.getQuery({query});
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

    const totalPages = response.totalPages;
    const currentPage = response.page;
    const hasPrevPage = response.hasPrevPage;
    const hasNextPage = response.hasNextPage;
    const prevPage = response.prevPage;
    const nextPage = response.nextPage;

    const prevLink = hasPrevPage ? `http://localhost:8080/api/products?page=${prevPage}` : null;
    const nextLink = hasNextPage ? `http://localhost:8080/api/products?page=${nextPage}` : null;

    res.json({
      status: 'success',
      payload: response.docs,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
};


// export const getAll = async (req, res, next) => {
//   try {
//     const { page, limit } = req.query;
//     const response = await service.getAll(page, limit);
//     //res.json(response);
//     const next = response.hasNextPage ? 'http://localhost:8080/api/products?page=${response.nextPage}' : null;
//     const prev = response.hasPrevPage ? 'http://localhost:8080/api/products?page=${response.prevPage}' : null;
//     res.json({
//       results: response.docs,
//       info: {
//         count: response.totalDocs,
//         pages: response.totalPages,
//         next,
//         prev
//       }
//     })
//   } catch (error) {
//   next(error.message);
// }
// };


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