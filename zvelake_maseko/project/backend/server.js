import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import multer from "multer"
import cookie_parser from "cookie-parser";
import os from "os";
import {urlpatterns} from "./urls.js";

const upload = multer()
const app = express();
app.use(cookie_parser())
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));

const port = 5000;

for(const url of urlpatterns){
    if(url.method === "get"){
        app.get(url.path, url.handler);
    } else if(url.method === "post"){
        app.post(url.path, upload.none(), url.handler);
    }
}

app.listen(port, function(){
    const ifaces = os.networkInterfaces();
    
    console.log('Server running at:');
    console.log('Local: http://localhost:'+port);
    
    Object.keys(ifaces).forEach((ifname) => {
        ifaces[ifname].forEach((iface) => {
        if ('IPv4' !== iface.family || iface.internal !== false) return;
        console.log(`Network: http://${iface.address}:${port}`);
        });
    });
});
