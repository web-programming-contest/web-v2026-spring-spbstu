import { Reviews } from "./reviews";
import {data} from "./api_data";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
  description: string;
  specs: string[];
  inStock: boolean;
  rating: number;
  reviews: Reviews[];
}
let categories: string[] = ['Все товары'];
let products: Product[] = data.data.products.map((prod): Product => {
    if(!categories.includes(prod.category)){
        categories.push(prod.category);
    }
    return {
        id: Number(prod.id),
        name: prod.name,
        category: prod.category,
        price: prod.price,
        image_url: prod.image_url,
        description: prod.description,
        specs: prod.specs,
        inStock: Boolean(prod.inStock),
        rating: prod.rating,
        reviews: (prod.reviews).map(rev => ({
            id: Number(rev.id),
            user_id: Number(rev.user_id),
            product_id: Number(rev.product_id),
            review: rev.review,
            created_at: rev.created_at
        }))
    }
});

export {products, categories};