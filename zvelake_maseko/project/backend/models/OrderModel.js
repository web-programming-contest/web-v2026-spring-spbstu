import Database from "./Database.js";
import ProductModel from "./ProductModel.js";

export default class OrderModel extends Database{
    constructor(){
        super();
    }

    getAllOrders(){}

    async getOrdersByCustomerId(customerId){
        try {
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            let orderNumbers = this.redisClient.lRange(`user:${customerId}:cart`, 0, -1);
            const orders = [];
            for(const orderNumber of orderNumbers){
                let cart = this.redisClient.hGetAll(`cart:${orderNumber}`);
                if(cart && cart.length > 0){ orders.push(cart); }
            }
            return orders;
        } catch(err) {
            console.error(err.message);
        }
        return [];
    }

    async createCart(customerId, productId, quantity){
        try {
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            const cartId = crypto.randomUUID();
            await this.redisClient.set(`user:${customerId}:cart:${cartId}:${productId}`, quantity.toString());
            return cartId;
        } catch(err){
            console.log(err.message);
        }
        return null;
    }

    async addProductToCart(customerId, cartId, productId, quantity){
        try {
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            if(Number(quantity) === 0){
                await this.redisClient.del(`user:${customerId}:cart:${cartId}:${productId}`);
                if(await this.#cartEmpty(cartId, customerId)){
                    await this.redisClient.del(`user:${customerId}:cart:${cartId}`);
                }
                return true;
            }
            await this.redisClient.set(`user:${customerId}:cart:${cartId}:${productId}`, quantity.toString());
            return true;
        } catch(err){
            console.log(err.message);
        }
        return false;
    }

    async removeProductFromCart(cartId, customerId, productId){
        try {
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            await this.redisClient.del(`user:${customerId}:cart:${cartId}:${productId}`);
            if(await this.#cartEmpty(cartId, customerId)){
                await this.redisClient.del(`user:${customerId}:cart:${cartId}`);
            }
            return true;
        } catch(err) {
            console.error('Remove order error:', err.message);
            return false;
        }
    }

    async clearCart(cartId, customerId){
        try {
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            const keys = await this.redisClient.keys(`user:${customerId}:cart:${cartId}:*`);
            if(keys.length){
                await Promise.all(keys.map(key => this.redisClient.del(key)));
            }
            await this.redisClient.del(`user:${customerId}:cart:${cartId}`);
            return true;
        }
        catch(err) {
            console.error('Clear cart error:', err.message);
            return false;
        }
    }

    async #cartEmpty(cartId, customerId){
        try {
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            const keys = await this.redisClient.keys(`user:${customerId}:cart:${cartId}:*`);
            return keys.length === 0;
        } catch(err) {
            console.error('Check cart empty error:', err.message);
            return true;
        }
    }
    
    async getCart(cartId, customerId){
        try {
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            console.log(`restoring cart ${cartId} for user ${customerId}`);
            const keys = await this.redisClient.keys(`user:${customerId}:cart:${cartId}:*`);
            const cartData = {
                'cart_id': cartId
            };
            if(keys && keys.length === 0){
                keys = await this.redisClient.keys(`user:${customerId}:cart*`);
                if(keys && keys.length === 0) return cartData;
                const existingCartIds = Array.from(new Set(keys.map(key => /user:.*?:cart:(.*?):*/.exec(key)[1])));
                // give only one
                console.log(`found cart ${existingCartIds[0]} belonging to user ${customerId}`);
                cartData['cart_id'] = existingCartIds[0];
            }
            console.log(`found ${keys.length} items in cart by user ${customerId}`);
            cartData['items'] = {};
            for(const key of keys){
                const productId = /user:.*?:cart:.*?:(.*)/.exec(key)[1];
                if(productId){
                    const quantity = await this.redisClient.get(key);
                    cartData['items'][productId] = Number(quantity);
                }
            }
            return cartData;
        } catch(err){
            console.error(`Failed to read cart: ${err.message}`);
        }
        return {};
    }

    async createOrder(cartId, customerId){
        try{
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            const products = await this.redisClient.keys(`user:${customerId}:cart:${cartId}:*`);

            let ordersData = []
            const order_id = crypto.randomUUID();

            for(const key of products){
                const productId = /user:.*?:cart:.*?:(.*)/.exec(key)[1];
                if(productId){
                    const quantity = await this.redisClient.get(`user:${customerId}:cart:${cartId}:${productId}`);
                    const product = await (new ProductModel()).getProductById(productId);
                    const amount = Number(product.price) * Number(quantity);

                    ordersData.push([order_id, customerId, productId, amount]);
                }
            }
            if(ordersData.length > 0){
                const placeholders = ordersData.map((_, i) => 
                    `($${i*4+1}, $${i*4+2}, $${i*4+3}, $${i*4+4})`
                ).join(', ');
                let sql = `INSERT INTO orders (order_id, customer_id, product_id, amount) VALUES ${placeholders}`;
                await this.dbClient.query(sql, ordersData.flat());
            }

            await Promise.all(products.map(key => this.redisClient.del(key)));
            return true;
        } catch(err){
            console.error(err.message);
        }
        return false;
    }

    async changeOrderStatus(orderId, newStatus){
        try {
            this.dbClient.query("UPDATE orders SET status = $1 WHERE id = $2", [newStatus, orderId]);
            return true;
        } catch(err) {
            console.error(err.message);
        }
        return false;
    }

    async cancelOrder(orderId, customerId) {
        
        try {
            await this.dbClient.query('BEGIN');
            
            const result = await this.dbClient.query(
                "UPDATE orders SET status = 'cancelled', updated_at = NOW() WHERE id = $1 AND customer_id = $2 RETURNING id",
                [orderId, customerId]
            );
            
            if (result.rowCount === 0) {
                await this.dbClient.query('ROLLBACK');
            } else {
                await this.dbClient.query('COMMIT');
            }
            
            if (!this.redisClient?.isOpen) return;
        
            const keys = await this.redisClient.keys(`cart:${orderId}:*`);
            if (keys.length) {
                await Promise.all(keys.map(key => this.redisClient.del(key)));
            }
            await this.redisClient.del(`user:${customerId}:cart`);
            
            return true;
            
        } catch (err) {
            await this.dbClient.query('ROLLBACK');
            console.error('Cancel order error:', err.message);
            return false;
        }
    }

}