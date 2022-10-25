export function createProductCard(product) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("receipt-ocr_product-card");

  wrapper.append(createProductCardRow("Count", product.count));
  wrapper.append(createProductCardRow("Discount Price", product.discount_price));
  wrapper.append(createProductCardRow("Name", product.name));
  wrapper.append(createProductCardRow("Price", product.price));
  wrapper.append(createProductCardRow("Total", product.total));

  return wrapper;
}

export function createReceiptTotalResultCard(receiptResults) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("receipt-ocr_product-card");

  wrapper.append(createProductCardRow("Purchase Date", receiptResults.purchase_date));
  wrapper.append(createProductCardRow("Purhase Time", receiptResults.purchase_time));
  wrapper.append(createProductCardRow("Total", receiptResults.total));

  return wrapper;
}

function createProductCardRow(position, value) {
  const row = document.createElement("div");
  row.classList.add("receipt-ocr_product-card_row");

  const positionDiv = document.createElement("div");
  positionDiv.innerHTML = position;
  positionDiv.classList.add("receipt-ocr_product-card_position");

  const valueDiv = document.createElement("div");
  valueDiv.innerHTML = value;
  valueDiv.classList.add("receipt-ocr_product-card_value");

  row.append(positionDiv);
  row.append(valueDiv);

  return row;
}
