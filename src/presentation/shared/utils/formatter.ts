export const formatDate = (dateString: string, includeTime: boolean = true): string => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  if (!includeTime) {
    return `${day}/${month}/${year}`;
  }
  
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const formatCurrency = (value: number, currency: string = 'PEN'): string => {
  if (value === null || value === undefined) return 'S/ 0.00';
  
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: currency,
  }).format(value);
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  if (value === null || value === undefined) return '0.00';
  
  return new Intl.NumberFormat('es-PE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};