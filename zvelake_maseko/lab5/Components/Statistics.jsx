import React from "react"

export default function TransactionCard({transaction}){
    return (<div className="transaction-item">
        <div className="card-body">
            <div className="transaction-info">
                <span style={{fontWeight: 'bold'}}>{transaction.name}</span><br/>
                <span>{(new Date(transaction.date)).toLocaleDateString('ru-Ru', {
                            month: 'long',
                            day: '2-digit',
                        })}</span><br/>
                <span>{transaction.amount}</span><br/>
                <span>{transaction.paymentStatus}</span>
                {transaction.paymentStatus !== 'PENDING' && transaction.paymentMethod}
            </div>
        </div>
    </div>)
}
