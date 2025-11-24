
// Payment Processing
function processPayment(user, amount, { simulateFailure = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateFailure) {
        return reject(new Error("Payment failed: card declined"));
      }
      // Fixed transaction ID to match your sample output
      resolve({ transactionId: 56892, amount, user });
    }, 500);
  });
}

// Optional rollback (simulated)
function cancelPayment(transactionId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ cancelled: true, transactionId });
    }, 200);
  });
}

// generating invoice
function generateInvoice(transactionId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      
      resolve({ invoiceNumber: "INV1023", transactionId });
    }, 300);
  });
}
// sending mail
function sendConfirmationEmail(email, invoiceNumber) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Confirmation email sent to: ${email} (Invoice ${invoiceNumber})`);
    }, 300);
  });
}

module.exports = {
  processPayment,
  cancelPayment,
  generateInvoice,
  sendConfirmationEmail
};

