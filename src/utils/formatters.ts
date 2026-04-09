export const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

export const formatPrice = (price: number): string => {
  return priceFormatter.format(price);
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateFormatter.format(dateObj);
};
