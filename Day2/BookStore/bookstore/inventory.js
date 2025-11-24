
//  Fetch Book Details
function fetchBookDetails(cartSkus) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Catalog lookup mock (SKU -> details)
      const catalog = {
        JS101: { id: "JS101", title: "JavaScript Basics", price: 299.0, available: true },
        NODE201: { id: "NODE201", title: "Node.js Guide", price: 349.0, available: true }
      };
      const details = cartSkus.map((sku) => catalog[sku]).filter(Boolean);
      resolve(details);
    }, 350);
  });
}

//  Stock Availability Check (async)
function checkStockAvailability(bookDetails, forceOutOfStockTitle = null) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mutated = bookDetails.map((b) =>
        forceOutOfStockTitle && b.title === forceOutOfStockTitle
          ? { ...b, available: false }
          : b
      );

      const outOfStock = mutated.find((b) => !b.available);
      if (outOfStock) {
        return reject(new Error(`Stock check failed: "${outOfStock.title}" is out of stock`));
      }
      resolve(mutated);
    }, 250);
  });
}

module.exports = { fetchBookDetails, checkStockAvailability };

