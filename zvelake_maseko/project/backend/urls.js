import {controlApi, dataApi, index, auth} from  "./controllers.js";
import { BASE_URL } from "./settings.js";

function path_(url, method, handler){
    return {
        path: url,
        method: method,
        handler: handler
    }
}

const urlpatterns = [
    path_(`${BASE_URL}`, 'get', index),
    path_(`${BASE_URL}/api/data/:item`, 'get', dataApi),
    path_(`${BASE_URL}/api/data/:item`, 'post', dataApi),
    path_(`${BASE_URL}/api/orders/:item/id/:id/:action`, 'get', controlApi),
    path_(`${BASE_URL}/api/orders/:item/id/:id/:action`, 'post', controlApi),
    path_(`${BASE_URL}/api/orders/:item/:action`, 'get', controlApi),
    path_(`${BASE_URL}/api/orders/:item/:action`, 'post', controlApi),
    path_(`${BASE_URL}/auth/:action`, 'post', auth),
];

export {urlpatterns}