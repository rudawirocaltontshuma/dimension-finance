import { suppliers } from "@/data/_gen/payables";
import type { Supplier } from "@/types/finance";

export { suppliers };

export function getSupplier(id: string): Supplier | undefined {
  return suppliers.find((supplier) => supplier.id === id);
}

export const supplierFilterOptions = {
  paymentStatus: ["All", "Good Standing", "Watch", "On Hold"],
  category: ["All", ...Array.from(new Set(suppliers.map((s) => s.category))).sort()],
};
