import Database from "./Database.js";

export default class ProductModel extends Database{
    constructor(){
        super();
    }

    async getAllProducts(){
        try{
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            let result = [];
            let cached = await this.redisClient.keys("product:*:*");
            if(cached && cached.length > 0){
                console.log("Reading data from cache");
                const unique = Array.from(new Set(cached.map(key => {
                    const pairs = key.split(":");
                    return `${pairs[0]}:${pairs[1]}`;
                })));

                result = await Promise.all(unique.map(async product => {
                    return await this.redisClient.hGetAll(product);
                }));
                for (const product of result) { 
                    const reviewIds = await this.redisClient.lRange(`product:${product.id}:reviews`, 0, -1);
                    
                    const reviews = await Promise.all(
                        reviewIds.map(async id => {
                            return await this.redisClient.hGetAll(`review:${id}`);
                        })
                    );
                    
                    product.reviews = reviews;
                }
            } else {
                console.log("Data in cache not found. reading database");
                result = await this.syncProductsToRedis();
            }
            return result;
        } catch(err){
            console.log("ProductModel error: ", err);
        }
    }

    async syncProductsToRedis() {
        try {
            const expireDate = new Date();
            expireDate.setHours(expireDate.getHours() + 24);
            const result = await this.dbClient.query("SELECT * FROM products");
            
            if (!result.rows || result.rows.length === 0) {
                console.log("No products found in database");
                return;
            }
            
            for (const row of result.rows) {
                const category = await this.dbClient.query(
                    "SELECT * FROM categories WHERE id = $1", 
                    [row.category_id]
                );
                
                // Получаем отзывы
                const reviews = await this.dbClient.query(
                    "SELECT * FROM product_reviews WHERE product_id = $1", 
                    [row.id]
                );

                row.reviews = reviews.rows;
                row.category = category.rows[0].name || 'Unknown';
                
                // Добавляем категорию и отзывы к объекту продукта
                const productData = {
                    id: row.id.toString(),
                    name: row.name || '',
                    description: row.description || '',
                    price: row.price.toString() || '',
                    image_url: row.image_url || '',
                    in_stock: row.in_stock.toString() || '',
                    category: category.rows[0]?.name || 'Unknown',
                    rating: row.rating?.toString() || '',
                    specs: row.specs?.toString() || ''
                };
                
                // Сохраняем продукт в Redis как Hash
                await this.redisClient.hSet(`product:${row.id}`, productData);
                //await this.redisClient.setExpire(`product:${row.id}`, expireDate.getTime() / 1000);
                
                // Сохраняем категорию, если она существует
                if (category.rows[0]) {
                    await this.redisClient.hSet(`category:${row.category_id}`, {
                        id: category.rows[0].id.toString(),
                        name: category.rows[0].name || ''
                    });
                    //await this.rediClient.setExpire(`category:${row.category_id}`, expireDate.getTime() / 1000);
                }
                
                //console.log(`Found ${reviews.rows.length} reviews for product ${row.id}`);
                
                // Сохраняем отзывы и добавляем в список
                for (const review of reviews.rows) {
                    const reviewData = {
                        id: review.id.toString(),
                        user_id: review.user_id?.toString() || '',
                        product_id: review.product_id?.toString() || '',
                        review: review.review || '',
                        created_at: `${review.created_at}` || ''
                    };
                    
                    await this.redisClient.hSet(`review:${review.id}`, reviewData);
                    await this.redisClient.lPush(`product:${row.id}:reviews`, review.id.toString());
                    
                    //await this.redisClient.setExpire(`review:${review.id}`, expireDate.getTime() / 1000);
                    //await this.redisClient.setExpire(`product:${row.id}:reviews`, expireDate.getTime() / 1000);
                }
            }
            
            console.log("Sync completed successfully");
            return result.rows;
            
        } catch (error) {
            console.error("Error syncing products to Redis:", error);
            throw error;
        }
    }

    async getProductById(productId){
        try{
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            const cached = this.redisClient.hGetAll(`product:${productId}`);
            if(cached && cached.length > 0){
                return cached;
            }
            const columns = "id,name,description,price,image_url,in_stock,rating,specs";
            const productData = {};

            const stored = await this.dbClient.query(`SELECT (${columns},category_id) FROM products WHERE id = $1`, [productId]);
            const category = await this.dbClient.query(`SELECT id,name FROM categories WHERE id = $1`, [stored.rows[0].category_id]);
            const reviews = await this.dbClient.query("SELECT * FROM reviews WHERE product_id = $1", [productId]);
            return stored.rows[0];
        } catch (err) {
            console.log(err)
        }
        return null;
    }

    async closeConnections(){
        if(this.redisClient && this.redisClient.isOpen){
            await this.redisClient.quit();
        }
        if(this.dbClient){
            await this.dbClient.end();
        }
    }

}