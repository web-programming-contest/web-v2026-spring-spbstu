
export const formatPrice = (value) => {
    let cleanValue = value.toString().replace(/[^\d.]/g, '');
    
    const dotIndex = cleanValue.indexOf('.');
    if (dotIndex !== -1) {
        const integerPart = cleanValue.substring(0, dotIndex).replace(/\./g, '');
        const decimalPart = cleanValue.substring(dotIndex + 1).slice(0, 2);
        cleanValue = integerPart + '.' + decimalPart;
    }
    
    let [integer, decimal] = cleanValue.split('.');
    
    if (integer) {
        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    
    if (decimal !== undefined) {
        decimal = decimal.padEnd(2, '0').slice(0, 2);
        return `${integer}.${decimal}`;
    }
    
    return integer || '';
};

export  const formatCardNumber = (value) => {
    let cleanValue = value.replace(/\D/g, '');
    
    cleanValue = cleanValue.slice(0, 16);
    
    const groups = [];
    for (let i = 0; i < cleanValue.length; i += 4) {
        groups.push(cleanValue.slice(i, i + 4));
    }
    
    return groups.join(' ');
};