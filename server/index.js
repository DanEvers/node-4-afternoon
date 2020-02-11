require('dotenv').config();
const { SERVER_PORT, SESSION_SECRET } = process.env;
const express = require('express');
const app = express();
const session = require('express-session');
const authController = require('./controllers/authController')
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swagController')
const cartController = require('./controllers/cartController')
const searchController = require('./controllers/searchController')

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // cookie will expire in 1 week
  })
);
app.use(checkForSession);

// define swag
app.get('/api/swag/', swagController.read);

// auth endpoints
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);

// cart endpoints
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/checkout/:id', cartController.add)
app.delete('/api/cart/checkout/:id', cartController.delete)

// search controller 
app.get('/api/search', searchController.search)

app.listen(SERVER_PORT, () => `I am listening at port ${SERVER_PORT}`);
