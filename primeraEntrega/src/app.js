import express from 'express';
import { __dirname } from './utils.js';
import chatRouter from "./routes/chat.router.js";
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productRouter from './routes/product.router.js';
import cartManager from './routes/cart.router.js';
import realtimeproducts from './routes/realtimeproducts.router.js'
import ProductManager from './daos/filesystem/product.dao.js';
import * as service from "./servicies/chat.services.js";
import userRouter from "./routes/user.router.js";
import viewsRouter from './routes/views.router.js'
import "./daos/mongodb/conexion.js"
import cookieParser from "cookie-parser";
import session from 'express-session';
//import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";
import "../src/daos/mongodb/conexion.js"
import { MONGO_URL } from "../src/daos/mongodb/conexion.js";

const store = new ProductManager();

const app = express();

//const FileStore = sessionFileStore(session)

// const fileStoreOptions ={
//   store: new FileStore({
//     path:'./sessions',
//     ttl:120, //segundos
//     reapInterval: 60 //segundos
//   }),
//   secret: '1234',
//   resave: false,
//   saveUnitialized: false,
//   cookie:{
//     maxAge: 120000 //milisegundos, mismo o mayor que la session
//   }
// }

const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    ttl:120,
    crypto: {
      secret: '123'
    }
  }),
  secret: '1234',
  resave: false,
  //saveUnitialized: false,
  cookie: {
    maxAge: 120000 //milisegundos, mismo o mayor que la session
  }
}
app.use(express.urlencoded({extended:true}))
app.use(cookieParser);



//app.use(session(fileStoreOptions));
app.use(session(mongoStoreOptions));

app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter); 
app.use('/api/carts', cartManager);
app.use("/chat", chatRouter);
app.use("/", realtimeproducts);
app.use('/realtimeproducts', realtimeproducts);

app.use("/users", userRouter);
app.use('/views', viewsRouter)


app.get('/', (req, res) => {
  res.render('websocket')
})

const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("Cliente conectado");
  const productos = await store.getProducts();
  socket.emit("productos", productos);

  socket.on("chat:message", async (msg) => {
    await service.createMessage(msg);
    socketServer.emit("messages", await service.getAll());
  });

  socket.on("newUser", (user) => {
    socket.broadcast.emit("newUser", user);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});




export default socketServer;