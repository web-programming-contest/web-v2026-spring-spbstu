import Database from "./Database.js";

export default class UserModel extends Database{
    constructor(){
        super();
    }

    async getUsersByIds(userIds){
        try{
            let users = [];
            let cachedUsers = [];
            let uncachedUsers = [];
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            for(const id of userIds){
                const key = `user:${id}$`;
                const cached = this.redisClient.keys(key);
                if(cached && cached.length > 0){
                    cachedUsers.push(cached[0]);
                } else {
                    uncachedUsers.push(id);
                }
            }

            users = await Promise.all([
                ...cachedUsers.map( key => this.redisClient.hGetAll(key)),
                ...uncachedUsers.map( id => this.getUserById(id))
            ]);
            return users;

        } catch(err){
            console.log(err);
            return [];
        }
    }

    async getUserById(id){
        try{
            const cached = await this.redisClient.hGetAll(`user:${id}`);
            if(cached && Object.values(cached).length > 0){
                return cached;
            }
            
            let result = await this.dbClient.query("SELECT * FROM users WHERE id = $1", [id]);

            return result.rows[0];
        } catch(err){
            console.log(err);
            return {};
        }
    }

    async getUserDetails(userName, email){
        try{
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            let result = await this.dbClient.query("SELECT id, full_name, email, avatar_url FROM users WHERE full_name = $1 AND email = $2", [userName, email]);
            if(result.rows.length > 0){
                const user = result.rows[0];
                let orders = await this.dbClient.query("SELECT * FROM orders WHERE customer_id = $1", [user.id]);
                if(orders.rows.length > 0){
                    user['orders'] = orders.rows;
                }
                return user;
            }
            return {};
        } catch(err){
            console.log(`Error in getUserDetails: ${err.message}`);
            return {};
        }
    }
}