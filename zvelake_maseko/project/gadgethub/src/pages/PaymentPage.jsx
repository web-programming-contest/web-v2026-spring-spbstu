import React, { useState, useEffect, useRef } from "react";
import {formatPrice} from "../utils/utils.js";
import {formatCardNumber} from "../utils/utils.js";

function PaymentConfirmation({props}){
    const [done, setDone] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            setDone(true);
        }, 2000);
    }, []);
    return (
        <>
        {done ?
        <div className="load-spinner"></div> :
        <div className="flex col mb-10 box">
            <div className="payment-details">
                <div className="message">Заявка получена</div>
            </div>
            <div>
                <button className="btn btn-primary w-full" onClick={()=>{props.setCurrentPage(0);}}>назад</button>
            </div>
        </div>
        }
        </>
    );
}

export default function PaymentPage({setCurrentPage, cartList}){
    const [total, setTotal] = useState(0);
    const [delivery, setDelivery] = useState(0);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [index, setIndex] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpireDate, setCardExpireDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);

    const rpRef = useRef(null);
    useEffect(()=>{
        setTotal(formatPrice(cartList.reduce((prev, curr)=>{
            return prev + (curr.product.price * curr.count);
        }, 0)));
    }, [cartList]);

    const submitPayment = async () => {
        // сохранить оредер в БД
        const formData = new FormData();
        formData.append("full_name", fullName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("index", index);

        // не сохраняем данные карты
        setShowPaymentConfirmation(true);
    };
    const formatExpiryDate = (value) => {
        let cleanValue = value.replace(/\D/g, '');
        
        cleanValue = cleanValue.slice(0, 4);
        
        if (cleanValue.length >= 2) {
            let month = parseInt(cleanValue.slice(0, 2));
            
            if (month > 12) {
            month = 12;
            }
            if (month < 1 && cleanValue.length >= 2) {
            month = 1;
            }
            
            const formattedMonth = month.toString().padStart(2, '0');
            const yearPart = cleanValue.slice(2);
            
            return yearPart ? `${formattedMonth}/${yearPart}` : formattedMonth;
        }
        
        return cleanValue;
    };
    return (
        <>
        {showPaymentConfirmation ? <PaymentConfirmation props={setCurrentPage}/>:
        <div className="section">
            <div className="section-info">
                <h1>Оформление заказа</h1>
            </div>
            <div className="section-body">
                <form className="payment-form form flex" onSubmit={submitPayment}>
                    <div ref={rpRef} className="left-panel flex col col-md-8 h-full" style={{
                            padding: "5px",
                        }}>
                        <div className="form-section contacts">
                            <div className="form-section-title flex row">
                                <i className="fa-solid fa-user icon"></i>
                                <span>Контактная информация</span>
                            </div>
                            <div className="row">
                                <div className="field flex col">
                                    <label className="label" htmlFor="full-name">Имя и фамилия</label>
                                    <input type="text" id="full-name" className="form-control" name="fullName" placeholder="Иван Иванович"
                                            onChange={(e)=>{setFullName(e.target.value);}} required/>
                                </div>
                                <div className="field flex col">
                                    <label className="label" htmlFor="phone">Телефон</label>
                                    <div className="input-box">
                                        <i className="fa-solid fa-phone"></i>
                                        <input type="text" id="phone" className="form-control" name="phone" placeholder="+7 (999) 123-45-67"
                                            onChange={(e)=>{setPhone(e.target.value);}} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="field flex col">
                                <label className="label" htmlFor="email">email</label>
                                <div className="input-box">
                                    <i className="fa-regular fa-envelope"></i>
                                    <input type="text" id="email" className="form-control" name="email" placeholder="example@email.com"
                                        onChange={(e)=>{setPhone(e.target.value);}} required/>
                                </div>
                            </div>
                        </div>
                        <div className="form-section delivery">
                            <div className="form-section-title flex row">
                                <i className="fa-solid fa-location-arrow"></i>
                                <span>Адрес доставки</span>
                            </div>
                            <div className="field flex col">
                                <label className="label" htmlFor="address">Адрес</label>
                                <input type="text" id="address" name="address" placeholder="улица, дом, квартира"
                                    onChange={(e)=>{setAddress(e.target.value);}} required/>
                            </div>
                            <div className="row">
                                <div className="field flex col">
                                    <label className="label" htmlFor="city">Город</label>
                                    <input type="text" id="city" name="city" placeholder="Санкт-Петербург"
                                        onChange={(e)=>{setCity(e.target.value);}} required/>
                                </div>
                                <div className="field flex col">
                                    <label className="label" htmlFor="index">Индекс</label>
                                    <input type="text" id="index" name="index" placeholder="123456"
                                        onChange={(e)=>{setIndex(e.target.value);}} required/>
                                </div>
                            </div>
                        </div>
                        <div className="form-section payment-method">
                            <div className="form-section-title flex row">
                                <i className="fa-solid fa-address-card icon"></i>
                                <span>Способ оплаты</span>
                            </div>
                            <div className="field flex col">
                                <label className="label" htmlFor="card-number">Номер карты</label>
                                <input type="text" pattern="\d{4} \d{4} \d{4} \d{4}" minLength={16} id="card-number" name="cardNumber" value={cardNumber} placeholder="1234 5678 9012 3456"
                                    onChange={(e)=>{setCardNumber(formatCardNumber(e.target.value));}} required/>
                            </div>
                            <div className="row">
                                <div className="field flex col">
                                    <label className="label" htmlFor="expiration">Срок действия</label>
                                    <input type="text" id="expiration" name="expiration" value={cardExpireDate} placeholder="MM/YY"
                                        onChange={(e)=>{setCardExpireDate(formatExpiryDate(e.target.value));}}/>
                                </div>
                                <div className="field flex col">
                                    <label className="label" htmlFor="index">CVV</label>
                                    <input type="text" pattern="\d{3}" minLength={3} id="cvv" name="cvv" placeholder="123"
                                        onChange={(e)=>{setCvv(e.target.value);}} required/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-panel flex col col-md-4">
                        <div className="form-section sticky" style={{top: '100px'}}>
                            <div className="form-section-title">
                                <h2>Ваш заказ</h2>
                            </div>
                            <div className="order-info">
                                <div className="items-list">
                                    {cartList.map(item => (
                                    <div key={item.product.id} className="list-item flex">
                                        <span>{item.product.name} x{item.count}</span>
                                        <span><strong>{formatPrice(item.product.price)} ₽</strong></span>
                                    </div>))}
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="order-summary flex-col">
                                <div className="summary-item flex row mb-10">
                                    <span>Товары</span>
                                    <span className="bold">{total} ₽</span>
                                </div>
                                <div className="summary-item flex mb-10">
                                    <span>Доставка</span>
                                    <span className="bold">{delivery} ₽</span>
                                </div>
                                <div className="divider"></div>
                                <div className="summary-item flex mb-10">
                                    <span><strong>Итого</strong></span>
                                    <span className="bold">{total + delivery} ₽</span>
                                </div>
                            </div>
                            <button className="btn btn-primary w-full" type="submit">
                                Подтвердить заказ
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        }
        </>
        
    );
}