import Database from "./Database.js";

export default class CategoriesModel extends Database{
    constructor(){
        super();
    }

    async getAllProductCategories(){
        try{
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            let cached = new Set(await this.redisClient.keys("category:*"));
            if(cached && cached.length > 0){
                return cached;
            }
            let result = await this.dbClient.query("SELECT * FROM categories");
            return result.rows;
        } catch (err){
            console.log(err);
            return [];
        }
    }
}