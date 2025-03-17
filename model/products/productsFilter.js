export function productsFilter(category, collection, filters, products) {
  if (filters.includes("collection")) {
    products = products.filter((product) => product.collection === collection);
  }
  if (filters.includes("offer")) {
    products = products.filter((product) => product.offer);
  }
  if (filters.includes("category")) {
    products = products.filter((product) => product.category === category);
  }
  if (filters.includes("price")) {
    products = [...products].sort((a, b) => a.price - b.price);
  }
  if (filters.includes("access")) {
    products = [...products].sort((a, b) => a.access - b.access);
  }

  return products;
}
