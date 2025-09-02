import moment from 'moment';

export const formatCurrency = amount => {
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
export const formatCurrencyWithPKR = amount => {
  const num =
    typeof amount === 'string'
      ? Number(amount.replace(/[^0-9.-]/g, ''))
      : typeof amount === 'number'
      ? amount
      : 0;

  if (!isNaN(num)) {
    return (
      'PKR ' +
      num.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    );
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

export function formatName(name) {
  if (!name && typeof name !== 'string') return '';
  return name
    .trim()
    ?.split(/\s+/)
    ?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    ?.join(' ');
}

export const formatDate = date => {
  if (!date) return '';

  const mDate = moment(date);
  const now = moment();

  // Check if within last 6 hours
  if (now.diff(mDate, 'hours') < 6) {
    return mDate.fromNow(); // e.g. "2 hours ago"
  }

  if (mDate.isSame(now, 'day')) {
    return `Today ${mDate.format('hh:mm A')}`;
  } else if (mDate.isSame(now.clone().subtract(1, 'day'), 'day')) {
    return `Yesterday at ${mDate.format('hh:mm A')}`;
  } else {
    return mDate.format('DD-MMM YYYY hh:mm A');
  }
};
