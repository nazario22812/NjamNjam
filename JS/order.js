const dishSelect = document.getElementById("dish");
const quantityInput = document.getElementById("quantity");
const totalPrice = document.getElementById("totalPrice");

let selectedDish = null;

fetch("menu.json")
  .then(res => res.json())
  .then(menu => {
    menu.forEach(dish => {
      const opt = document.createElement("option");
      opt.value = dish.id;
      opt.textContent = dish.name;
      dishSelect.appendChild(opt);
    });

    selectedDish = menu[0];
    dishSelect.value = selectedDish.id;
    updatePrice();

    dishSelect.addEventListener("change", () => {
      const id = parseInt(dishSelect.value);
      selectedDish = menu.find(d => d.id === id);
      updatePrice();
    });

    quantityInput.addEventListener("input", updatePrice);
  });

function updatePrice() {
  if (!selectedDish) return;
  const qty = parseInt(quantityInput.value) || 1;
  totalPrice.textContent = `$${selectedDish.price * qty}`;
}

document.getElementById("addToCartBtn").addEventListener("click", () => {
  if (!selectedDish) return;

  const qty = parseInt(quantityInput.value) || 1;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === selectedDish.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      id: selectedDish.id,
      name: selectedDish.name,
      price: selectedDish.price,
      quantity: qty
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${selectedDish.name} × ${qty} added to cart!`);
});