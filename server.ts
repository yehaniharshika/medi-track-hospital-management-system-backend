import express from 'express';
import customerRoutes from "./routes/customer-routes";
import itemRoutes from "./routes/item-routes";
import orderRoutes from "./routes/order-routes";

const app = express();

app.use(express.json());

app.use('/',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');

    next();
})

app.use('/customer',customerRoutes);
app.use('/item',itemRoutes);
app.use('/order',orderRoutes);

app.listen(3002, (err=>{
    console.log("Server running on port 3002");
}));

app.use('/',(req,res,next)=>{
    res.status(200).send('Not Found');
})
