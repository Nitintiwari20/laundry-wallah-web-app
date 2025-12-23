window.addEventListener("load", function() {
    emailjs.init("5OKXppsFXJuN0Q77t");

});
// ELEMENTS
const buttons = document.querySelectorAll(".toggle-btn");
const cartBody = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const emptyCart = document.getElementById("emptyCart");
const emailStatus = document.getElementById("emailStatus");

let cart = [];
let total = 0;

// INITIAL UI
emptyCart.style.display = "block";
totalEl.innerText = "0";

// UPDATE CART UI
function updateCartUI() {
  if (cart.length === 0) {
    emptyCart.style.display = "block";
    document.getElementById("cartTable").style.display = "none";
  } else {
    emptyCart.style.display = "none";
    document.getElementById("cartTable").style.display = "table";
  }
  totalEl.innerText = total;
}
// ADD / REMOVE
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const row = btn.closest(".service-row");
    const name = row.dataset.name;
    const price = Number(row.dataset.price);

    const existingRow = cartBody.querySelector(`tr[data-name="${name}"]`);

    if (!existingRow) {
      const tr = document.createElement("tr");
      tr.setAttribute("data-name", name);
      tr.innerHTML = `
        <td>${cartBody.children.length + 1}</td>
        <td>${name}</td>
        <td>₹${price}</td>
      `;
      cartBody.appendChild(tr);

      cart.push({ name, price });
      total += price;

      btn.innerText = "Remove Item";
      btn.classList.add("remove-btn");
    } else {
      existingRow.remove();
      cart = cart.filter(i => i.name !== name);
      total -= price;

      btn.innerText = "Add Item";
      btn.classList.remove("remove-btn");
    }

    updateCartUI();
  });
});

// BOOK NOW
document.getElementById("bookNow").addEventListener("click", () => {

  const userName = document.getElementById("name").value;
  const userEmail = document.getElementById("email").value;
  const userPhone = document.getElementById("phone").value;

  if (!userName || !userEmail || !userPhone) {
    emailStatus.innerText = "Please fill all details";
    emailStatus.style.color = "red";
    return;
  }

  if (cart.length === 0) {
    emailStatus.innerText = "Add items to the cart to book";
    emailStatus.style.color = "red";
    return;
  }

  const serviceList = cart.map(item => item.name).join(", ");

  emailjs.send(
    "service_bb9iyfu",        // my SERVICE ID
    "template_3srmzgk",        // my TEMPLATE ID
    {
      user_name: userName,
      user_email: userEmail,  // ✅ USER EMAIL
      user_phone: userPhone,
      services: serviceList,
      total_amount: total
    }
  ).then(() => {

    emailStatus.innerText = "Email has been sent successfully";
    emailStatus.style.color = "green";

    cart = [];
    total = 0;
    cartBody.innerHTML = "";

    buttons.forEach(b => {
      b.innerText = "Add Item";
      b.classList.remove("remove-btn");
    });

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    updateCartUI();

  }).catch(() => {
    emailStatus.innerText = "Failed to send email";
    emailStatus.style.color = "red";
  });
});

