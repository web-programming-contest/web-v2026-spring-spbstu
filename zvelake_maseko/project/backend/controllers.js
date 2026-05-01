import { fileURLToPath } from "url";
import ProductModel from "./models/ProductModel.js";
import {dirname, join} from "path"
import UserModel from "./models/UserModel.js";
import CategoriesModel from "./models/CategoriesModel.js";
import { BASE_ROOT } from "./settings.js";
import OrderModel from "./models/OrderModel.js";
import AdminController from "./controllers/AdminController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


async function dataApi(req, res){
    let model;
    let result;
    switch (req.params.item){
        case "products":
            model = new ProductModel();
            if(req.query.id){
                
            } else {
                result = await model.getAllProducts();
                let products = result.map(product => ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    image_url: product.image_url,
                    price: Number(product.price),
                    specs: product.specs ? product.specs.split(',') : [],
                    inStock: product.in_stock,
                    category: product.category,
                    reviews: product.reviews,
                    rating: product.rating ? Number(product.rating) : 0
                }));
                res.status(200).json({
                    success: true,
                    date: (new Date()).toISOString(),
                    data: {
                        count: result.length,
                        products: products
                    }
                });
            }
            break;
        case "users":
            model = new UserModel();
            if(req.query.id){
                res.json(await model.getUserById(req.query.id));
            } else if(req.method === 'POST'){
                const ids = req.body.userIds;
                result = await model.getUsersByIds(ids);
                res.json({
                    success: true,
                    date: (new Date()).toISOString(),
                    data: {
                        count: result.length,
                        users: result
                    }
                });
            }
            break;
        case "product-categories":
            model = new CategoriesModel();
            result = await model.getAllProductCategories();
            res.json({
                success: true,
                date: (new Date()).toISOString(),
                data: {
                    count: result.length,
                    categories: result
                }
            });
            break;
    }
}

async function controlApi(req, res){
    const model = new OrderModel();
    const action = req.params.action;
    let result;
    if(req.params.item === 'cart'){
        if(action === 'create'){
            let cartId = await model.createCart(req.body.customerId, req.body.productId, req.body.quantity);
            if(cartId){
                res.json({
                    success: true,
                    cart_id: cartId
                });
            } else {
                res.json({
                    success: false,
                    message: 'Failed to create cart'
                });
            }
        } else if(action === 'remove' && req.params.id){
            let result = await model.removeProductFromCart(req.params.id, req.body.customerId, req.body.productId);
        } else if(action === 'add' && req.params.id){
            let result = await model.addProductToCart(req.body.customerId, req.params.id, req.body.productId, req.body.quantity);
            res.json({
                success: result,
                message: result ? 'Product added to cart successfully' : 'Failed to add product to cart'
            });
        } else if(action === 'clear' && req.params.id){
            let result = await model.clearCart(req.params.id, req.body.customerId);
            res.json({
                success: result,
                message: result ? 'Cart cleared successfully' : 'Failed to clear cart'
            });
        } else if(action === 'read'){
            let cartData = await model.getCart(req.body.cartId, req.body.customerId);
            if(cartData && Object.keys(cartData).length > 0){
                res.json({
                    success: true,
                    cart_data: cartData
                });
            } else {
                res.json({
                    success: false,
                    message: `user ${req.body.customerId} has no active carts`
                });
            }
        }

    } else if(req.params.item === 'order'){
        if(req.params.id){
            if(action === 'update'){
                if(req.query.k === 'status'){
                    result = await model.changeOrderStatus(req.params.id, req.query.v);
                }
            } else if(action === 'cancel'){
                result = await model.cancelOrder(req.params.id, req.body.customerId);
                res.json({
                    success: result,
                    message: result ? 'order cancelled successfully' : 'Failed to cancel order'
                });
            }
        } else {
            if(action === 'create'){
                console.log(`creating order on cart ${req.body.cartId} for user ${req.body.customerId}`);
                let orderId = await model.createOrder(req.body.cartId, req.body.customerId);
                if(orderId){
                    res.json({
                        success: true,
                        order_id: orderId
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Failed to create order'
                    });
                }
            }
        }
        
    }
}

async function auth(req, res){
    const controller = new AdminController();
    switch(req.params.action){
        case "login":
            let result = await controller.login(req);
            if(result.success){
                res.cookie('avatar_url', result.userData.avatar_url, {maxAge: 1*1*60*60*1000});
            }
            res.json(result);
            break;
        case "register":
            res.json(await controller.register(req));
            break;
        case 'logout':
            console.log("logging out");
            await controller.logout(req);
            break;
        default:
            break;
    }
    
}

function index(req, res){
    res.sendFile(join(BASE_ROOT, 'dist/index.html'));
}

export {dataApi, controlApi, index, auth};