import React from "react"

export default function TransactionCard({transaction}){
    return (<div className="card transaction-item">
        <div className="card-body">
            <div className="transaction-info">
                Name: <span>{transaction._name}</span><br/>
                Date: <span>{transaction._date.toISOString()}</span><br/>
                Amount: <span>{transaction._amount}</span><br/>
                PaymentStatus: <span>{transaction._paymentStatus}</span>
                {transaction._paymentStatus !== 'PENDING' && `paymentMethod: ${transaction._paymentMethod}`}
            </div>
        </div>
    </div>)
}