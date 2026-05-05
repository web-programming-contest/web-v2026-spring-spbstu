import TransactionModel from './TransactionModel.js';
function randomDate(daysBack = 30) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
    return date;
}
function randomAmount() {
    return Number((Math.random() * 4990 + 10).toFixed(2));
}
function randomName() {
    const names = [
        'Магазин продуктов', 'Кафе', 'Ресторан', 'Аптека', 'Такси',
        'Коммунальные услуги', 'Интернет', 'Мобильная связь',
        'Кинотеатр', 'Спортзал', 'Одежда', 'Электроника',
        'Авиабилеты', 'Отель', 'Бензин', 'Супермаркет'
    ];
    return names[Math.floor(Math.random() * names.length)];
}
function randomPaymentMethod() {
    const methods = ["CARD" , "ONLINE" , "CASH"];
    return methods[Math.floor(Math.random() * methods.length)];
}
function randomStatus() {
    const rand = Math.random();
    if (rand < 0.7)
        return "PAID" ; 
    if (rand < 0.85)
        return "PENDING"; 
    return "CANCELLED" ; 
}
function generateRandomTransactions(count) {
    const transactions = [];
    for (let i = 0; i < count; i++) {
        const id = crypto.randomUUID();
        
        const transaction = new TransactionModel(id,
        randomName(), randomDate(30), // за последние 30 дней
        randomAmount(), randomPaymentMethod(), randomStatus());
        transactions.push(transaction);
    }
    return transactions;
}
export { generateRandomTransactions };
