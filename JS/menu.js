fetch("menu.json")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const container = document.getElementById("menu-container");
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "menu-card";
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error loading menu:", err);
  });