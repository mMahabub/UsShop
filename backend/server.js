import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
// import products from './data/products.js';
import productRoutes from './routes/productRoutes.js'
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
const port = process.env.PORT || 5001;
connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Api is running......');
});


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.get('/api/config/paypal', (req,res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID}));
app.use(notFound)
app.use(errorHandler)


app.listen(port, () => console.log(`Server running on port ${port}`));