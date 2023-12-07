import { ProductModel } from "./models/product.model.js";
import { CartModel } from "./models/cart.model.js";

export default class ProductDaoMongoDB {
  

  async addProductToCart(cartId, productId){
    try {
      const cart = await CartModel.findById(cartId);
      cart.products.push(productId);
      cart.save();
      return cart;
    } catch (error) {
      console.log('Error en la operación addProductToCart:', error);
    }
  }
  async getQuery(query) {
    try {
      const aggregationPipeline = [];
  
      if (query && Object.keys(query).length > 0) {
        aggregationPipeline.push({ $match: query });
      }
  
  
      const result = await ProductModel.aggregate(aggregationPipeline);
      return result;
    } catch (error) {
      console.error('Error en la operación de búsqueda:', error);
      throw error; 
    }
  }

  async sortAggregation(sortOrder){
    try {
      
      const aggregationPipeline = [];

      if (sortOrder === 'asc') {
        aggregationPipeline.push({ $sort: { price: 1 } });
      } else if (sortOrder === 'desc') {
        aggregationPipeline.push({ $sort: { price: -1 } });
      }
  
  
      const result = await ProductModel.aggregate(aggregationPipeline);
      return result;
    } catch (error) {
      console.error('Error en la operación de agregación:', error);
      throw error; 
    }
  }

  async getAll(page=1 , limit=10) {
    try {
      const response = await ProductModel.paginate({},{page, limit});
      return response;
    } catch (error) {
      console.log('Error en la operación getAll:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await ProductModel.findById(id).lean();
      return response;
    } catch (error) {
      console.log('Error en la operación getById:', error);
    }
  }

  async create(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.log('Error en la operación create:', error);
      throw error;
    }
  }

  async update(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log('Error en la operación update:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log('Error en la operación delete:', error);
      throw error;
    }
  }
}