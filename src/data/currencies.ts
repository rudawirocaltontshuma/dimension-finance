export interface CurrencyRecord {
  code: "ZAR" | "USD" | "EUR" | "GBP";
  name: string;
  symbol: string;
  status: "Base Currency" | "Active" | "Inactive";
  usedIn: string;
}

export const currencies: CurrencyRecord[] = [
  { code: "ZAR", name: "South African Rand", symbol: "R", status: "Base Currency", usedIn: "All companies" },
  { code: "USD", name: "United States Dollar", symbol: "$", status: "Active", usedIn: "Export customers" },
  { code: "EUR", name: "Euro", symbol: "€", status: "Active", usedIn: "European suppliers" },
  { code: "GBP", name: "British Pound Sterling", symbol: "£", status: "Active", usedIn: "UK subsidiaries" },
];

export const currencySymbols: Record<string, string> = {
  ZAR: "R",
  USD: "$",
  EUR: "€",
  GBP: "£",
};
