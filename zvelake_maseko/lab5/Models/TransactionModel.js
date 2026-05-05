class TransactionModel {
    constructor(id, name, date, amount, paymentMethod, status) {
        this.id = id;
        this._name = name;
        this._date = date;
        this._amount = amount;
        this._paymentMethod = paymentMethod;
        this._status = status ?? "PAID" /* PaymentStatus.PAID */;
    }
    get name() {
        return this._name;
    }
    get date() {
        return this._date;
    }
    get amount() {
        return this._amount;
    }
    get paymentMethod() {
        return this._paymentMethod;
    }
    get status() {
        return this._status;
    }
    set name(value) {
        this._name = value;
    }
    set date(value) {
        this._date = value;
    }
    set amount(value) {
        this._amount = value;
    }
    set paymentMethod(value) {
        this._paymentMethod = value;
    }
    set status(value) {
        this._status = value;
    }
}
export default TransactionModel;
