import React, { useEffect, useState } from "react";
import "@ghstyles/product-reviews.css";

const API_URL =  "http://localhost:5000";

export default function UserReview({product, setShowReviews}){
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const load = async ()=>{
            const response = await fetch(`${API_URL}/gadgethub/api/users`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userIds: product.reviews.map(review => review.user_id)})
            });
            const json = await response.json();
            setUsers(json.data.users);
        }
        load();
    }, []);
    return (
        <div className="product-review-modal modal fixed bg-white">
            <button className="btn btn-primary abs close-reviews-btn" style={{top: '10px', right: '10px'}} onClick={()=>{setShowReviews(false);}}>
                <i className="fa-solid fa-chevron-left"></i>
                <span className="bold">Назад</span>
            </button>
            <div className="modal-content">
                <div className="section-info">
                    <h1 className="section-title">Отзывы</h1>
                </div>
                <div className="box mb-10">
                    <div className="image-container">
                        <img src={product.image_url} alt="image"/>
                    </div>
                    <div className="product-info">
                        <span className="product-name bold">{product.name}</span>
                        <br/>
                        <span className="grey">
                            {product.category.name ?? product.category}
                        </span>
                        <div className="spacer"></div>
                        <div className="flex col">
                            <span className="bold product-price">{product.price} ₽</span>
                        </div>
                    </div>
                </div>
                <div className="reviews-grid grid">
                    {product.reviews.map(review => {
                        const user = users.find(user => Number(user.id) === Number(review.user_id));
                        return <div key={review.id} className="box review-card flex col">
                            <div className="flex no-overflow">
                                <div className="image-container avatar-image">
                                    <img src={user?.avatar_url ?? ''} className="w-full"/>
                                </div>
                                <div className="flex col">
                                    <span>{user?.full_name ?? 'Unknown'}</span>
                                    <span className="grey">{review.created_at.split(/(\d{2}:\d{2}:\d{2}).*/, 1)[0]}</span>
                                </div>
                            </div>
                            <div className="review">
                                {review.review}
                            </div>
                        </div>
                    })}
                </div>
            </div>

        </div>
    );
}