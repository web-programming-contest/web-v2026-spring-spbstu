import React, { useEffect, useState } from 'react';
import Statistics from './Components/Statistics.jsx';
import Index from './Components/Main.jsx'
import TransactionsPreview from './Components/TransactionsPreview.jsx';
import CreateTransaction from './Components/CreateTransaction.jsx';

import AccountModel from './Models/AccountModel.js';
import {generateRandomTransactions} from './Models/DataGenerator.js';
import {prepareChartData} from './Utils/ChartData.js'


function App(){
    const [currentSection, setCurrentSection] = useState(0);
    const [transactionsList, setTransactionsList] = useState([]);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [balance, setBalance] = useState(1000000);

    useEffect(() => {
        try{
            const account = new AccountModel('John Doe', new Date('2002-11-16'), balance);
            const expenses = generateRandomTransactions(10);
            const incomes = generateRandomTransactions(10);
            
            expenses.forEach(tr => {
                tr.amount *= -1;
                return tr;
            });
            const transactions = [...incomes, ...expenses];
            transactions.forEach(tr => {
                account.balance += tr.amount;
                account.transactionHistory.push(tr);
            });

            setCurrentAccount(account);
            setBalance(account.balance);
            setTransactionsList(account.transactionHistory);
            
        } catch(err){
            console.log(err);
        }
    },[]);

    let chartData = [];
    useEffect(()=>{
        chartData = prepareChartData(transactionsList);
    }, [transactionsList]);

    return (<>
    { currentSection === 0 && <Index
                                account={currentAccount}
                                setCurrentSection={setCurrentSection}
                                currentSection={currentSection}
                                transactionsList={transactionsList}/>}
    { currentSection === 1 && <CreateTransaction
                                setCurrentSection={setCurrentSection}
                                setTransactionsList={setTransactionsList}
                                currentSection={currentSection}
                                account={currentAccount}/>}
    { currentSection === 2 && <Statistics
                                setCurrentSection={setCurrentSection}
                                transactionsList={transactionsList}
                                currentSection={currentSection}/>}
    { currentSection === 3 && <TransactionsPreview
                                setCurrentSection={setCurrentSection}
                                transactionsList={transactionsList}
                                currentSection={currentSection}/>}
    </>);
}

export default App;
