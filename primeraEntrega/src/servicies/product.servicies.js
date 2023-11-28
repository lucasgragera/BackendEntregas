import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";

const prodDao = new ProductDaoMongoDB();

export const addProductToCart = async (cartId, productId) => {
  try {
    const exists = await prodDao.getById(productId);
    const newProduct = await prodDao.addProductToCart(cartId, productId);
    if (!exists) throw new Error('Product not found (population)')
    return newProduct;

  } catch (error) {
    console.log(error);
  }
}

export const sortAggregation = async () => {
  try {
    return await prodDao.sortAggregation();
  } catch (error) {
    console.log(error);
  }
}

export const getQuery = async ({ query }) => {
  try {
    return await prodDao.getAll({ query });
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async (page, limit) => {
  try {
    return await prodDao.getAll(page, limit);
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const prod = await prodDao.getById(id);
    if (!prod) return false;
    else return prod;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (obj) => {
  try {
    if (!obj.title || !obj.description || !obj.price || !obj.thumbnails || !obj.code || !obj.stock) {
      throw new Error('Missing fields');
    }
    const newProd = await prodDao.create(obj);
    if (!newProd) return false;
    else return newProd;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (id, obj) => {
  try {
    const prodUpd = await prodDao.update(id, obj);
    if (!prodUpd) return false;
    else return prodUpd;
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (id) => {
  try {
    const prodDel = await prodDao.delete(id);
    if (!prodDel) return false;
    else return prodDel;
  } catch (error) {
    console.log(error);
  }
};

//profe
// import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
// const prodDao = new ProductDaoMongoDB();

// // import ProductDaoFS from "../daos/filesystem/product.dao.js";
// // import { __dirname } from "../utils.js";
// // const prodDao = new ProductDaoFS(
// //   __dirname + "/daos/filesystem/data/products.json"
// // );

// export const getAll = async () => {
//   try {
//     return await prodDao.getAll();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getById = async (id) => {
//   try {
//     const prod = await prodDao.getById(id);
//     if (!prod) return false;
//     else return prod;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const create = async (obj) => {
//   try {
//     const newProd = await prodDao.create(obj);
//     if (!newProd) return false;
//     else return newProd;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const update = async (id, obj) => {
//   try {
//     const prodUpd = await prodDao.update(id, obj);
//     if (!prodUpd) return false;
//     else return prodUpd;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const remove = async (id) => {
//   try {
//     const prodDel = await prodDao.delete(id);
//     if (!prodDel) return false;
//     else return prodDel;
//   } catch (error) {
//     console.log(error);
//   }
// };