import React, {useState} from "react";
import TransactionCard from "./TransactionCard";


function FunctionsList({setCurrentSection}){
    return(<>
    <div className="functions grid box">
        <div className="func-item" id="create" onClick={()=>{setCurrentSection(1)}}>
            <div className="border abs"></div>
            <div className="icon-box">
                <i className="fa-solid fa-plus icon"></i>
            </div>
        </div>
        <div className="func-item" id="display-stats" onClick={()=>{setCurrentSection(2)}}>
            <div className="border abs"></div>
            <div className="icon-box">
                <i className="fa-solid fa-chart-area"></i>
            </div>
        </div>
        <div className="func-item" id="preview-transactions" onClick={()=>{setCurrentSection(3)}}>
            <div className="border abs"></div>
            <div className="icon-box">
                <i className="fa-solid fa-eye icon"></i>
            </div>
        </div>
    </div>
    </>)
}

function SubSections({
    transactions,
    setCurrentSection,
}){
    const expandWrapper = (e)=>{
        e.currentTarget.parentElement.querySelector('.collapse')
                                    .classList.toggle('expand');
    }
    return (<div className="sub-sections box">
        <div className="subsections-wrapper ">
            {/* history */}
            <div className="quick-preview  box history">
                <div className="section-title" onClick={()=>{setCurrentSection(3)}}>
                    <h3>Истотрия <i className="fa-solid fa-chevron-right"></i></h3>
                </div>
                <div className="quick-preview-body collapse">
                    <div className="grid">
                        {transactions.slice(0, 10).map((tr, i) => (
                            <div key={i}>
                                <TransactionCard transaction={tr}/>
                                <div className="spacer" style={{height: '10px',}}></div>
                            </div>
                            )
                        )}
                    </div>
                </div>
                <div className="expand-controller" onClick={expandWrapper}>
                    <span>Более</span>
                    <i className="fa-solid fa-chevron-down"></i>
                </div>
            </div>
            <div className="spacer" style={{height: '10px',}}></div>
            {/* expenses */}
            <div className="quick-preview box expenses">
                <div className="section-title" onClick={()=>{setCurrentSection(3)}}>
                    <h3>Доходы <i className="fa-solid fa-chevron-right"></i></h3>
                </div>
                <div className="spacer" style={{height: '10px',}}></div>
                <div className="quick-preview-body collapse">
                    <div className="grid">
                        {transactions.filter(tr => tr.amount > 0)
                                    .slice(0, 10)
                                    .map((tr, i) => ((
                                        <div key={i}>
                                            <TransactionCard transaction={tr}/>
                                            <div className="spacer" style={{height: '10px',}}></div>
                                        </div>
                                    )
                                    ))
                        }
                    </div>
                </div>
                <div className="expand-controller" onClick={expandWrapper}>
                    <span>Более</span>
                    <i className="fa-solid fa-chevron-down"></i>
                </div>
            </div>
        </div>
    </div>);
}


export default function Index({
    account,
    setCurrentSection,
    transactionsList
}){
    const appName = 'Budget';
    
    return (<div className="main-section box">
        <div className="section-info app-name">
            <h1 className="section-title">{appName}</h1>
        </div>
        <div className="account-info-section balance box">
            <div className="profile">
                <i className="fa-solid fa-circle-user" style={{fontSize: '32px'}}></i>
                <span style={{fontSize: '32px'}}>{account?.full_name}</span>
            </div>
            <h3>{account?.balance.toFixed(2)} Руб</h3>
        </div>
        <div className="section">
            <div className="section-body">
                <FunctionsList setCurrentSection={setCurrentSection}/>
                <div className="spacer" style={{height: '10px',}}></div>
                <SubSections
                        transactions={transactionsList}
                        setCurrentSection={setCurrentSection}/>
            </div>
        </div>
    </div>)
}
