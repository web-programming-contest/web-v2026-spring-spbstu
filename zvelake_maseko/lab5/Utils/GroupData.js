function groupTransactionsByDay(transactions) {
    const grouped = new Map();
    transactions.forEach(transaction => {
        const dateKey = transaction.date.toISOString().split('T')[0];
        const dateLabel = transaction.date.toLocaleDateString('ru-RU');
        if (!grouped.has(dateKey)) {
            grouped.set(dateKey, {
                date: dateLabel,
                totalAmount: 0,
                count: 0,
                transactions: []
            });
        }
        const group = grouped.get(dateKey);
        group.totalAmount += transaction.amount;
        group.count += 1;
        group.transactions.push(transaction);
    });
    return Array.from(grouped.values())
        .sort((a, b) => new Date(b.date.split('.').reverse().join('-')).getTime() -
        new Date(a.date.split('.').reverse().join('-')).getTime());
}

export { groupTransactionsByDay };
