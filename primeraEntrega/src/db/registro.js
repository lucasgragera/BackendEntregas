import { initMongoDB } from "./conexion.js";
import { ProductModel } from "../schema.js";

const createProduct = async (product) => {
    await ProductModel.create(product);
}

const test = async () => {
    try {
        await initMongoDB();

        const newProduct = {
            title: 'Huevo',
            description: 'Blanco',
            price: '4000',
            thumbnail: 'No',
            stock: 9,
            id: 4,
            status: true,
            code: 54432
        }
        await createProduct(newProduct);
        console.log('Producto creado');
    } catch (error) {
        console.log(error);
    }
}
test();