class AccountModel {
    constructor(full_name, created_at, balance) {
        this._full_name = full_name;
        this._created_at = created_at;
        this._balance = balance;
        this._transactionHistory = [];
    }
    updateBalance(amount) {
        this._balance += amount;
    }
    updateTransactionHistory(transaction) {
        this._transactionHistory.push(transaction);
    }
    get full_name() {
        return this._full_name;
    }
    ;
    get created_at() {
        return this._created_at;
    }
    ;
    get balance() {
        return this._balance;
    }
    get transactionHistory() {
        return this._transactionHistory;
    }
    set balance(value) {
        this._balance = value;
    }
    set transactionHistory(value) {
        this._transactionHistory = value;
    }
}
export default AccountModel;
