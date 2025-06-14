const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartItems");
const grandTotal = document.getElementById("grandTotal");

function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    grandTotal.textContent = "$0";
    return;
  }

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";
    const subtotal = item.price * item.quantity;
    total += subtotal;

    row.innerHTML = `
      <span><strong>${item.name}</strong></span>
      <span>${item.quantity} × $${item.price}</span>
      <span class="total">$${subtotal}</span>
    `;
    cartContainer.appendChild(row);
  });

  grandTotal.textContent = `$${total}`;
}

document.getElementById("clearBtn").addEventListener("click", () => {
  localStorage.removeItem("cart");
  location.reload();


  
});
document.getElementById("confirmBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const confirmation = confirm("Do you want to confirm this order?");
  if (confirmation) {
    alert("Order confirmed! Thank you for your purchase 😊");
    localStorage.removeItem("cart");
    location.reload();
  }
});

renderCart();
