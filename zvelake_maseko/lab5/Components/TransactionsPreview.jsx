import React, {useState, useEffect} from "react";
import TransactionCard from "./TransactionCard"

import {groupTransactionsByDay} from '../Utils/GroupData.js'

function Incomes({transactionGroups}){
    return (
    <div className="incomes box">
        <div className="section-info">
            <h3>Доходы</h3>
        </div>
        <div className="spacer" style={{height: "15px"}}></div>
        <div className="sub-section" style={{padding: "0px 15px"}}>
            <div className="grid transactions">
                {transactionGroups.map((group, i) => (
                <div key={i} className="history-group box">
                    <div>
                        <h2>{group.date}</h2>
                    </div>
                    <div className="grid transactions">
                        {group.transactions.map(tr => (<TransactionCard key={tr.id} transaction={tr}/>))}
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>);
}

function Expenses({transactionGroups}){
    return (
    <div className="expenses box">
        <div className="section-info">
            <h3>Расходы</h3>
        </div>
        <div className="spacer" style={{height: "15px"}}></div>
        <div className="sub-section" style={{padding: "0px 15px"}}>
            <div className="grid transactions">
                {transactionGroups.map((group, i) => (
                <div key={i} className="history-group box">
                    <div>
                        <h2>{group.date}</h2>
                    </div>
                    <div className="grid transactions">
                        {group.transactions.map(tr => (<TransactionCard key={tr.id} transaction={tr}/>))}
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
    );
}

function MainHistory({transactionGroups}){
    return (
        <div className="grid col-1">
            {transactionGroups.map((group, i) => (
                <div key={i} className="history-group box">
                    <div>
                        <h2>{group.date}</h2>
                    </div>
                    <div className="grid transactions">
                        {group.transactions.map(tr => (<TransactionCard key={tr.id} transaction={tr}/>))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function TransactionsPreview({
    transactionsList, 
    setCurrentSection,
}){
    const [currentTab, setCurrentTab] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(()=>{
        setTotalIncome(transactionsList.filter(tr => tr.amount > 0).reduce((accumulator, tr)=>{
            return accumulator + tr.amount;
        }, totalIncome));

        setTotalExpenses(transactionsList.filter(tr => tr.amount < 0).reduce((accumulator, tr)=>{
            return accumulator + tr.amount;
        }, totalExpenses));
    },[transactionsList]);

    const groupedByDay = groupTransactionsByDay(transactionsList);
    return (<>
    <div className="transaction-preview-section main">
        <div className="section-info">
            <h1 className="section-title">Транзакции</h1>
        </div>
        <div className="spacer" style={{height: '15px'}}></div>
        <div className="totals" style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
            <div className="total-expenses box" style={{'--text': 'red'}}>
                <h1>Расходы</h1>
                <h2>{totalExpenses.toFixed(2)}</h2>
            </div>
            <div className="total-income box" style={{'--text': 'green'}}>
                <h1>Доходы</h1>
                <h2>{totalIncome.toFixed(2)}</h2>
            </div>
        </div>
        <div className="section">
            <div className="section-nav">
                <ul className="section-nav-links">
                    <li className="section-nav-links__item" onClick={()=>{setCurrentSection(0)}}>На Главную</li>
                </ul>
                <div className="space" style={{height: '10px'}}></div>
                <ul className="section-nav-tabs">
                    {<li className={`section-nav-links__item ${currentTab === 0 && 'active'}`}
                                    onClick={()=>{if(currentTab !== 0) setCurrentTab(0)}}>Все</li> }
                    {<li className={`section-nav-links__item ${currentTab === 1 && 'active'}`}
                                    onClick={()=>{if(currentTab !== 1) setCurrentTab(1)}}>Доходы</li> }
                    {<li className={`section-nav-links__item ${currentTab === 2 && 'active'}`}
                                    onClick={()=>{if(currentTab !== 2) setCurrentTab(2)}}>Расходы</li> }
                </ul>
            </div>
            <div className="section-body">
                {currentTab === 0 && <MainHistory transactionGroups={groupedByDay}/>}
                {currentTab === 1 && <Incomes transactionGroups={groupTransactionsByDay(transactionsList.filter(tr => tr.amount > 0))} />}
                {currentTab === 2 && <Expenses transactionGroups={groupTransactionsByDay(transactionsList.filter(tr => tr.amount < 0))} />} 
            </div>
        </div>
    </div>
    </>)
}
