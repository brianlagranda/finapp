export const formatCurrency = (
  balance: number,
  locale: string = "en-US",
  currency: string = "USD",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(balance);
};
