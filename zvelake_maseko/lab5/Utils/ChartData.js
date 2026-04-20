function prepareChartData(transactions) {
    const grouped = new Map();
    transactions.forEach(transaction => {
        const dateKey = transaction.date.toISOString().split('T')[0];
        if (!grouped.has(dateKey)) {
            grouped.set(dateKey, { total: 0, pending: 0 });
        }
        const group = grouped.get(dateKey);
        group.total += transaction.amount;
        if (transaction.status === "PENDING") {
            group.pending += transaction.amount;
        }
    });
    return Array.from(grouped.entries())
        .map(([date, values]) => ({
        date,
        amount: values.total,
        pendingAmount: values.pending
    }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
export { prepareChartData };
