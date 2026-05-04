import { passwordHash } from "../utils/utils.js";
import Database from "./Database.js";
import UserModel from "./UserModel.js";
import OrderModel from "./OrderModel.js";

export default class AdminModel extends Database{
    constructor(){
        super();
    }

    async grantLogin(userName, email){
        try {
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            console.log('granting login to ', userName, email);
            const existing = await (new UserModel()).getUserDetails(userName, email);
            let session = await this.redisClient.hGetAll(`session:*:${existing.id}`);

            if(session && Object.keys(session).length > 0){
                if(existing.orders){
                    session['orders'] = existing.orders;
                }
                return {
                    success: true,
                    userData: session
                };
            }
            if(Object.keys(existing).length > 0){
                const sessionId = crypto.randomUUID();
                const stringified = {
                    id: existing.id.toString(),
                    full_name: existing.full_name.toString(),
                };
                if(existing.avatar_url){
                    stringified['avatar_url'] = existing.avatar_url.toString();
                }
                
                await this.redisClient.hSet(`session:${sessionId}:${existing.id}`, stringified);
                return {
                    success: true,
                    userData: existing
                }
            }
            return {
                success: false,
                message: "User not found"
            };
        } catch(err){
            console.log(err.message);
            return {
                success: false,
                message: "Server Error"
            };
        }
    }

    async logOut(userId){
        try {
            if(!this.redisClient.isOpen){
                await this.redisClient.connect();
            }
            console.log(`logging out for user ${userId}`);
            let keys = await this.redisClient.keys(`session:*:${userId}`);
            if(keys && keys.length > 0){
                await Promise.all(keys.map(key => this.redisClient.del(key)));
            } else {
                console.log("no session for user ", userId);
            }
        } catch (err){
            console.log(err.messag);
        }
    }

    async registerUser(fullName, email, password){
        let result = await this.dbClient.query("SELECT full_name, email FROM users WHERE full_name = $1 OR email = $2", [fullName, email]);
        if(result.rows.length > 0){
            const user = result.rows[0];
            let reason = user.full_name === fullName ? "Already registered" : "Email already taken";
            return {
                success: false,
                message: reason
            }
        }
        const hash = await passwordHash(password);
        this.dbClient.query("INSERT INTO users (full_name, email, password_hash) VALUES ($1,$2,$3)", [fullName, email, hash]);
        return {
            success: true,
            message: "Регистрация прошла успешно"
        }
    }
}