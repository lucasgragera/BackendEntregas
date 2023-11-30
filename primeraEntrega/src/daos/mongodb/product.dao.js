import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
  

  async addProductToCart(cartId, productId){
    try {
      const cart = await ProductModel.findById(cartId);
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
  //getQuery y sortAggregation lo pude hacer por mi cuenta con la clase del profe e internet
  //pero no lo se testear. La estructura esta como en clase, deberia funcionar.
  //En el caso que no funcione, estoy dispuesto a arreglarlo.

  async sortAggregation(sortOrder){
    try {
      
      const aggregationPipeline = [];

      // Agregar etapas según el orden de clasificación proporcionado
      if (sortOrder === 'asc') {
        aggregationPipeline.push({ $sort: { price: 1 } });
      } else if (sortOrder === 'desc') {
        aggregationPipeline.push({ $sort: { price: -1 } });
      }
  
      // Agregar cualquier otra etapa de agregación que necesites
  
      const result = await ProductModel.aggregate(aggregationPipeline);
      return result;
    } catch (error) {
      console.error('Error en la operación de agregación:', error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }

  async getAll(page=1 , limit=10) {
    try {
      const response = await ProductModel.paginate({},{page, limit});
      //const response = await ProductModel.find()
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