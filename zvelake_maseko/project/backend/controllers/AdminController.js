import AdminModel from "../models/AdminModel.js";

export default class AdminController{

    async login(req){
        try {
            const model = new AdminModel();
            let result = await model.grantLogin(req.body.full_name, req.body.email);
            return result;
        } catch(err){
            console.log(err.message);
            return {
                success: false,
                message: "Server Error"
            };
        }
    }

    async logout(req){
        const model = new AdminModel();
        model.logOut(req.body.userId);
    }

    async register(req){
        const model = new AdminModel();
        let result = await model.registerUser(req.body.full_name, req.body.email, req.body.password);
        return result;
    }
}