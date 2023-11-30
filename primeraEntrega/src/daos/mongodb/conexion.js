
import { connect } from "mongoose";

 //const MONGO_URL = 'mongodb://127.0.0.1:27017/ecommerce';
const MONGO_URL = 'mongodb+srv://lucasgragera51:2l0i0g1e@ecommercee.xfj5uxp.mongodb.net/';

//export const initMongoDB = async () => {
    try {
        await connect(MONGO_URL)
        console.log("Conectado a la base de datos de MongoDB");
    } catch (error) {
        console.log(error);
    }
//}
//initMongoDB()