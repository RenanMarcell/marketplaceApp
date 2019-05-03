const express = require('express');
const controllers = require('./app/controllers');
const authMiddleware = require('./app/middlewares/auth');
const validate = require('express-validation');
const validators = require('./app/validators');
const handle = require('express-async-handler');

const routes = express.Router();

routes.post('/users', validate(validators.User), handle(controllers.UserController.store));
routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store));
routes.use(authMiddleware);

routes.get('/ads', handle(controllers.AdController.index));
routes.get('/ads/:id', handle(controllers.AdController.show));
routes.post('/ads', validate(validators.Ad), handle(controllers.AdController.store));
routes.put('/ads/:id', validate(validators.Ad), handle(controllers.AdController.update));
routes.delete('/ads/:id', handle(controllers.AdController.delete));

routes.post('/purchases', validate(validators.Purchase), handle(controllers.PurchaseController.store));
routes.get('/purchases/:purchaseId', handle(controllers.PurchaseController.show));

routes.put('/sell/:purchaseId', handle(controllers.SellController.update))

module.exports = routes;