import { departments } from "@/data/costCenters";
import { employeeNames } from "@/lib/mock/names";
import { createRng, pick } from "@/lib/mock/random";

const rng = createRng(5521);

export interface Employee {
  id: string;
  name: string;
  department: string;
  title: string;
}

const titlesByDepartment: Record<string, string[]> = {
  Operations: ["Operations Manager", "Logistics Coordinator", "Warehouse Supervisor"],
  Sales: ["Account Executive", "Sales Manager", "Business Development Lead"],
  Marketing: ["Marketing Manager", "Brand Specialist", "Content Strategist"],
  Finance: ["Finance Administrator", "Financial Analyst", "Accounts Officer"],
  Technology: ["Software Engineer", "IT Systems Administrator", "Product Manager"],
  "Human Resources": ["HR Business Partner", "Talent Acquisition Lead", "People Operations Manager"],
};

export const employees: Employee[] = employeeNames.map((name, index) => {
  const department = name === "Morgan Blake" ? "Finance" : pick(rng, departments);
  const titles = titlesByDepartment[department] ?? ["Associate"];
  return {
    id: `EMP-${String(index + 1).padStart(3, "0")}`,
    name,
    department,
    title: name === "Morgan Blake" ? "Finance Administrator" : pick(rng, titles),
  };
});

export function getEmployee(name: string): Employee | undefined {
  return employees.find((employee) => employee.name === name);
}
