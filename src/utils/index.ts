const formatCurrency = amount => {
  const num =
    typeof amount === 'string' ? Number(amount.replace(/,/g, '')) : amount;
  if (typeof num === 'number' && !isNaN(num)) {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  return 'PKR 0';
};

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const universalSearch = (query, searchableFields, data) => {
  const lowerQuery = typeof query === 'string' ? query.toLowerCase() : '';

  return data?.filter(item =>
    searchableFields.some(field => {
      const value = item[field];
      return (
        typeof value === 'string' && value.toLowerCase().includes(lowerQuery)
      );
    }),
  );
};

export default formatCurrency;
