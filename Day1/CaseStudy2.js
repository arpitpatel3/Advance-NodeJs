//Scenario1

let hasItems = new Boolean(true);
let isLoggedIn = new Boolean(false);
let paymentValid = new Boolean(false);

function checkout() {
    if (!hasItems.valueOf()) {
        console.log("Your cart is empty!");
        return;
    }

    if (!isLoggedIn.valueOf()) {
        console.log("Please log in to continue.");
        return;
    }

    if (!paymentValid.valueOf()) {
        console.log("Payment validation failed!");
        return;
    }

    console.log("Checkout successful!");
}
// Scenario2


function calculateFinalAmount(price, quantity) {
   
    if (typeof price !== "number" || Number.isNaN(price)) {
        throw new Error("Invalid price: must be a number.");
    }
    if (typeof quantity !== "number" || Number.isNaN(quantity)) {
        throw new Error("Invalid quantity: must be a number.");
    }
    if (!Number.isInteger(quantity)) {
        throw new Error("Invalid quantity: please enter a whole number.");
    }
    if (price < 0) {
        throw new Error("Price cannot be negative.");
    }
    if (quantity <= 0) {
        throw new Error("Quantity must be greater than zero.");
    }

    let total = price * quantity;

    
    if (total > 500) {
        total *= 0.9; 
    }

   
    const finalAmount = Number(total.toFixed(2));

  
    console.log(`Final amount to pay: ₹${finalAmount}`);
    return finalAmount;
}
// Scenario 3

function printWelcomeMessage(fullName, email) {
   
    if (typeof fullName !== "string" || typeof email !== "string") {
      console.log("Invalid input: name and email must be strings.");
      return null;
    }
  
   
    let name = fullName.trim();
  
    if (name.length === 0) {
      console.log("Name cannot be empty.");
      return null;
    }
  
    name = name.charAt(0).toUpperCase() + name.slice(1);
 
    const atIndex = email.indexOf("@");
    if (atIndex === -1) {
      console.log("Invalid email: it must contain '@'.");
      return null;
    }
  
    
    const domain = email.slice(atIndex + 1);
  
    if (domain.length === 0) {
      console.log("Invalid email: domain part after '@' is missing.");
      return null;
    }
  
    
    const message = `Hello ${name}, your email domain is ${domain}`;
    console.log(message);
    return message;
  }
  
checkout();
calculateFinalAmount(600, 1);
printWelcomeMessage("   arpit patel   ", "arpit.patel@cognizant.com");   

