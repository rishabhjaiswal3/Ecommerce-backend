const express = require('express')
const cors = require('cors');
const userRouters = require('./routes/user.route');
const authRouters = require('./routes/auth.route');
const productRouters = require('./routes/product.route');
const adminProductRouters = require('./routes/adminProduct.route');
const ratingRouters = require('./routes/rating.route');
const reviewRouters = require('./routes/review.route');
const cartRouters = require('./routes/cart.route')
const cartItemsRouters = require('./routes/cartItem.route')
const adminOrderRoutes = require('./routes/adminOrder.route');
const orderRouters = require('./routes/order.route')

const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {
    return res.status(200).send({message: "Welcome to E-commerce api - Node",status:true})
} )

app.use("/auth",authRouters);
app.use('/api/users',userRouters);
app.use("/api/products",productRouters);
app.use('/api/ratings',ratingRouters);
app.use('/api/reviews',reviewRouters);
app.use('/api/cart',cartRouters);
app.use('/api/cart_item',cartItemsRouters);
app.use('/api/orders',orderRouters);



app.use('/api/admin/products',adminProductRouters);
app.use('/api/admin/orders',adminOrderRoutes);


module.exports = app;
