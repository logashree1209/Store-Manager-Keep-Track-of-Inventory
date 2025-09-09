const form = document.getElementById("item-form");
const nameInput = document.getElementById("name");
const quantityInput = document.getElementById("quantity");
const priceInput = document.getElementById("price");
const inventoryBody = document.getElementById("inventory-body");

let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

function renderInventory() {
  inventoryBody.innerHTML = "";

  inventory.forEach((item, index) => {
    const row = document.createElement("tr");

    const total = (item.quantity * item.price).toFixed(2);

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${total}</td>
      <td><button class="delete-btn" onclick="deleteItem(${index})">Delete</button></td>
    `;

    inventoryBody.appendChild(row);
  });
}

function deleteItem(index) {
  inventory.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
  renderInventory();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newItem = {
    name: nameInput.value,
    quantity: parseInt(quantityInput.value),
    price: parseFloat(priceInput.value)
  };

  inventory.push(newItem);
  saveAndRender();

  form.reset();
});

renderInventory();
