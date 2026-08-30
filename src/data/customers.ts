import { customers } from "@/data/_gen/receivables";
import type { Customer } from "@/types/finance";

export { customers };

export function getCustomer(id: string): Customer | undefined {
  return customers.find((customer) => customer.id === id);
}

export const customerFilterOptions = {
  creditStatus: ["All", "Good Standing", "Watch", "On Hold"],
  industry: ["All", ...Array.from(new Set(customers.map((c) => c.industry))).sort()],
};
