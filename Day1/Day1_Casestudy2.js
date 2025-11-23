
//  custom errors for invalid input
class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
  }
  
  //  static properties (company name)
  class FoodItem {
    static COMPANY_NAME = "FoodGo";
  
    //  constructors with validation & type conversion
    constructor(name, price, category = "Regular") {
      if (typeof name !== "string" || name.trim().length === 0) {
        throw new ValidationError("FoodItem: 'name' must be a non-empty string.");
      }
      //  type conversion for price validation
      const parsedPrice = Number(price);
      if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
        throw new ValidationError("FoodItem: 'price' must be a positive number.");
      }
      if (typeof category !== "string" || category.trim().length === 0) {
        category = "Regular";
      }
  
      this.name = name.trim();
      this.price = parsedPrice;
      this.category = category.trim();
    }
  
    //  methods for calculations
    getTotalPrice() {
      return this.price;
    }
  }
  
  //  PremiumFoodItem inherits FoodItem and overrides method
  class PremiumFoodItem extends FoodItem {
    constructor(name, price, extraFee, category = "Premium") {
      super(name, price, category);
      //  type conversion for extraFee
      const parsedFee = Number(extraFee);
      if (Number.isNaN(parsedFee) || parsedFee < 0) {
        throw new ValidationError("PremiumFoodItem: 'extraFee' must be a non-negative number.");
      }
      this.extraFee = parsedFee;
    }
  
    //  add extraFee to total price
    getTotalPrice() {
      return super.getTotalPrice() + this.extraFee;
    }
  }
  
  class Cart {
    //  initialize items array
    constructor() {
      this.items = [];
    }
  
    // add multiple items using rest operator with validation
    addItems(...items) {
      if (!items || items.length === 0) {
        throw new ValidationError("Cart: No items provided to add.");
      }
      const validItems = items.map((item, idx) => {
        if (!(item instanceof FoodItem)) {
          throw new ValidationError(`Cart: Item at position ${idx} is not a valid FoodItem.`);
        }
        return item;
      });
      //  spread to append multiple items
      this.items = [...this.items, ...validItems];
    }
  
    //  internal calculations using arrow functions
    calculateTotal = () =>
      this.items.reduce((sum, item) => sum + item.getTotalPrice(), 0);
  
    
    // Billing Summary — pseudo-code: print detailed bill with names, totals before/after discount
    generateBill(applyDiscountFn, delayMs = 1500, currencySymbol = "₹") {
      if (typeof applyDiscountFn !== "function") {
        throw new ValidationError("Cart: 'applyDiscountFn' must be a function.");
      }
  
      const totalBefore = this.calculateTotal();
      const itemNames = this.items.map(i => i.name);
  
      return new Promise((resolve) => {
        setTimeout(() => {
          const totalAfter = applyDiscountFn(totalBefore);
          const roundedAfter = Number(totalAfter.toFixed(2));
  
          const bill = {
            company: FoodItem.COMPANY_NAME,
            items: itemNames,
            totalBeforeDiscount: Number(totalBefore.toFixed(2)),
            totalAfterDiscount: roundedAfter,
            currency: currencySymbol
          };
  
          console.log("=================================");
          console.log(`${FoodItem.COMPANY_NAME} — Detailed Bill Summary`);
          console.log("Items:", bill.items.join(", "));
          console.log(`Total (before discount): ${currencySymbol}${bill.totalBeforeDiscount}`);
          console.log(`Total (after discount):  ${currencySymbol}${bill.totalAfterDiscount}`);
          console.log("=================================");
  
          resolve(bill);
        }, delayMs);
      });
    }
  }
  
  // Closure — closure stores discount percentage and applies it later
  function createDiscount(percent) {
    const p = Number(percent);
    if (Number.isNaN(p) || p < 0 || p > 100) {
      throw new ValidationError("Discount: 'percent' must be between 0 and 100.");
    }
    return (total) => {
      const t = Number(total);
      if (Number.isNaN(t) || t < 0) {
        throw new ValidationError("Discount: 'total' must be a non-negative number.");
      }
      return t * (1 - p / 100);
    };
  }
  
  // Execution Flow 
  (async function demoFoodGo() {
    try {
      const burger = new FoodItem("Veg Burger", "149.50", "Fast Food");   // type conversion from string
      const fries = new FoodItem("French Fries", 99.0, "Fast Food");
      const pizza = new PremiumFoodItem("Cheese Burst Pizza", 399.99, 50, "Premium");
      const shake = new PremiumFoodItem("Chocolate Shake", "199.00", "20");
  
      const cart = new Cart();
  
      cart.addItems(burger, fries);
      const moreItems = [pizza, shake];
      cart.addItems(...moreItems); // spread per pseudo-code
  
      const totalBefore = cart.calculateTotal();
      console.log(`Calculated total (before discount): ₹${totalBefore.toFixed(2)}`);
  
      const discount10 = createDiscount(10);
  
      await cart.generateBill(discount10, 2000, "₹");
  
    } catch (err) {
      if (err instanceof ValidationError) {
        console.error("Validation Error:", err.message);
      } else {
        console.error("Unexpected Error:", err);
      }
    }
  
    try {
      const badItem = new FoodItem("", -10);
    } catch (err) {
      console.error("Caught (as expected):", err.message);
    }
  })();
  
