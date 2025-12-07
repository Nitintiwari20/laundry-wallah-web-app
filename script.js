
// Smooth scroll to booking section
document.getElementById("scrollToBooking").onclick = () => {
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });
};

// ---------------- CART FUNCTIONALITY ----------------
let cart = [];
let totalAmount = 0;

const cartList = document.getElementById("cartList");
const totalDisplay = document.getElementById("totalAmount");

// Add items
document.querySelectorAll(".add").forEach((btn) => {
    btn.addEventListener("click", () => {
        let parent = btn.parentElement;
        let name = parent.getAttribute("data-name");
        let price = parseInt(parent.getAttribute("data-price"));

        cart.push({ name, price });
        totalAmount += price;

        updateCart();
    });
});

// Remove items
document.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", () => {
        let parent = btn.parentElement;
        let name = parent.getAttribute("data-name");
        let price = parseInt(parent.getAttribute("data-price"));

        let index = cart.findIndex(item => item.name === name);
        if (index !== -1) {
            cart.splice(index, 1);
            totalAmount -= price;
        }

        updateCart();
    });
});

// Update cart UI
function updateCart() {
    cartList.innerHTML = "";
    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerText = `${item.name} - ₹${item.price}`;
        cartList.appendChild(li);
    });
    totalDisplay.textContent = totalAmount;
}


// ---------------- EMAIL JS ----------------
emailjs.init("YOUR_PUBLIC_KEY");

document.getElementById("bookNow").onclick = function () {

    let params = {
        customer_name: document.getElementById("name").value,
        customer_email: document.getElementById("email").value,
        customer_phone: document.getElementById("phone").value,
        order_details: JSON.stringify(cart),
        total_price: totalAmount
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params);

    document.getElementById("thankYouMsg").innerText =
        "Thank you For Booking the Service! We will get back to you soon!";
};
