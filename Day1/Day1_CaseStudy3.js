
//  custom errors for invalid input
class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
  }
  
  // Static Property — (company name)
  class Employee {
    static COMPANY_NAME = "PayGo HR";
  
    // Constructor —  constructors with validation & type conversion
    constructor(name, baseSalary) {
      if (typeof name !== "string" || name.trim().length === 0) {
        throw new ValidationError("Employee: 'name' must be a non-empty string.");
      }
      // Type Conversion : type conversion for salary validation
      const parsedSalary = Number(baseSalary);
      if (Number.isNaN(parsedSalary) || parsedSalary <= 0) {
        throw new ValidationError("Employee: 'baseSalary' must be a positive number.");
      }
      this.name = name.trim();
      this.baseSalary = parsedSalary;
    }
  
    // Method —  calculateSalary for regular employees
    calculateSalary() {
      return this.baseSalary;
    }
  }
  
  // Inheritance — Manager inherits Employee and overrides method
  class Manager extends Employee {
    // Constructor —  initialize allowances with validation
    constructor(name, baseSalary, allowances = []) {
      super(name, baseSalary);
      if (!Array.isArray(allowances)) {
        throw new ValidationError("Manager: 'allowances' must be an array.");
      }
      // Type Conversion 
      const converted = allowances.map((a, idx) => {
        const val = Number(a);
        if (Number.isNaN(val) || val < 0) {
          throw new ValidationError(`Manager: allowance at index ${idx} must be a non-negative number.`);
        }
        return val;
      });
      this.allowances = converted;
    }
  
    //  add multiple allowances using rest operator with validation
    addAllowances(...allowances) {
      if (allowances.length === 0) return;
      const converted = allowances.map((a, idx) => {
        const val = Number(a);
        if (Number.isNaN(val) || val < 0) {
          throw new ValidationError(`Manager: allowance (added) at index ${idx} must be a non-negative number.`);
        }
        return val;
      });
      //  spread to append multiple allowances
      this.allowances = [...this.allowances, ...converted];
    }
  
    // Method Override —  base salary + allowances for managers
    calculateSalary() {
      // Arrow Function —  internal calculations using arrow functions
      const totalAllowances = this.allowances.reduce((sum, a) => sum + a, 0);
      return this.baseSalary + totalAllowances;
    }
  }
  
  class Payroll {
    // Constructor —accepts employee object with validation
    constructor(employee) {
      if (!(employee instanceof Employee)) {
        throw new ValidationError("Payroll: 'employee' must be an instance of Employee.");
      }
      this.employee = employee;
    }
  
    // Methods : generateSalarySummary (details & totals)
    generateSalarySummary(applyBonusFn) {
      if (typeof applyBonusFn !== "function") {
        throw new ValidationError("Payroll: 'applyBonusFn' must be a function.");
      }
      const base = this.employee.baseSalary;
      const beforeBonus = this.employee.calculateSalary();
      const afterBonus = applyBonusFn(beforeBonus);
      const roundedBefore = Number(beforeBonus.toFixed(2));
      const roundedAfter = Number(afterBonus.toFixed(2));
      const bonusApplied = Number((roundedAfter - roundedBefore).toFixed(2));
  
      // Billing Summary —: detailed statement (name, base, allowances, bonus, total)
      const summary = {
        company: Employee.COMPANY_NAME,
        name: this.employee.name,
        baseSalary: Number(base.toFixed(2)),
        allowances: this.employee instanceof Manager ? [...this.employee.allowances] : [],
        totalBeforeBonus: roundedBefore,
        bonusPercent: typeof applyBonusFn.percent === "number" ? applyBonusFn.percent : null,
        bonusAppliedAmount: bonusApplied,
        totalAfterBonus: roundedAfter
      };
  
      console.log("=================================");
      console.log(`${Employee.COMPANY_NAME} — Salary Statement`);
      console.log(`Employee: ${summary.name}`);
      console.log(`Base Salary: ₹${summary.baseSalary}`);
      if (summary.allowances.length > 0) {
        console.log(`Allowances: ${summary.allowances.map(a => `₹${Number(a).toFixed(2)}`).join(", ")}`);
      } else {
        console.log("Allowances: None");
      }
      console.log(`Bonus Applied: ${summary.bonusPercent !== null ? summary.bonusPercent + "%" : "N/A"} (₹${summary.bonusAppliedAmount})`);
      console.log(`Total Before Bonus: ₹${summary.totalBeforeBonus}`);
      console.log(`Total After Bonus:  ₹${summary.totalAfterBonus}`);
      console.log("=================================");
  
      return summary;
    }
  
    // Timer : setInterval to simulate monthly salary disbursement
    disburseMonthly(months = 3, intervalMs = 1500, applyBonusFn) {
      if (typeof applyBonusFn !== "function") {
        throw new ValidationError("Payroll: 'applyBonusFn' must be a function.");
      }
      let count = 0;
      return new Promise((resolve) => {
        const handle = setInterval(() => {
          count += 1;
          console.log(`Month ${count}:`);
          this.generateSalarySummary(applyBonusFn);
          if (count >= months) {
            clearInterval(handle);
            resolve("Disbursement completed.");
          }
        }, intervalMs);
      });
    }
  }
  
  // closure stores bonus percentage and applies it later
  function createBonus(percent) {
    const p = Number(percent);
    if (Number.isNaN(p) || p < 0 || p > 100) {
      throw new ValidationError("Bonus: 'percent' must be between 0 and 100.");
    }
    const fn = (salary) => {
      const s = Number(salary);
      if (Number.isNaN(s) || s < 0) {
        throw new ValidationError("Bonus: 'salary' must be a non-negative number.");
      }
      return s * (1 + p / 100);
    };
    fn.percent = p; //  expose percent for statement readability
    return fn;
  }
  
  // Execution Flow: create employees/managers, payroll, bonuses, timers, statements
  (async function demoPayroll() {
    try {
      const emp1 = new Employee("Arpit Patel", "55000");       
      const mgr1 = new Manager("Bhuvneshvari Kolhe", 80000, [5000, "3500", 2500]); 
  
      const travelAllowances = [1200, "800"];
      const perfAllowances = [3000];
      mgr1.addAllowances(...travelAllowances);  // spread 
      mgr1.addAllowances(...perfAllowances);    // rest/spread 
  
      const payrollEmp = new Payroll(emp1);
      const payrollMgr = new Payroll(mgr1);
  
      const bonus10 = createBonus(10);          // closure 
      const bonus15 = createBonus(15);         
  
      payrollEmp.generateSalarySummary(bonus10);
      payrollMgr.generateSalarySummary(bonus15);
  
      await payrollEmp.disburseMonthly(3, 1000, bonus10); 
      await payrollMgr.disburseMonthly(2, 1200, bonus15);  
  
    } catch (err) {
      if (err instanceof ValidationError) {
        console.error("Validation Error:", err.message);
      } else {
        console.error("Unexpected Error:", err);
      }
    }
  
    // Error Handling try/catch invalid inputs
    try {
      const badEmp = new Employee("", -1000);
    } catch (err) {
      console.error("Caught (as expected):", err.message);
    }
  })();
  