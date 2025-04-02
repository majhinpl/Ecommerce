document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.querySelector(".cart-list");
  const subtotalItem = document.querySelector(".sub-total span");
  const counterBill = document.querySelector(".bill span");
  const checkoutBtn = document.querySelector(".checkout-btn");

  let usersCart = JSON.parse(localStorage.getItem("carts")) || [];

  let totalAmount = calculateTotal();

  // Render cart items
  usersCart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.dataset.id = item.id;

    cartItem.innerHTML = `
      <div class="img">
        <img
          src="${item.productImage}"
          alt="A product image"
          class="product-img"
        />
      </div>
  
      <div class="product-feature">
        <div class="product-feature-wrapper">
          <span class="product-heading"
            >${item.productName}</span
          >
          <div class="is-available">
            <span><small>In Stock</small></span>
            <span class="hidden"><small>Out of Stock</small></span>
          </div>
          <div class="delivery-charge">
            <span><small>Eligible for FREE delivery</small></span>
          </div>
          <div class="product-detail">
            <p><small>size: ${item.size}</small></p>
            <p><small>color: ${item.color}</small></p>
          </div>
        </div>
  
        <div class="product-row">
          <span class="product-qty">
            <div class="product-add-feature">
              <button class="decrease-product">
                <i class="ri-delete-bin-4-line ri-xl"></i>
              </button>
              <input
                type="number"
                min="1"
                max="1000"
                value="${item.qty}"
                class="product-input"
              />
              <button class="increase-product">
                <i class="ri-add-line ri-xl"></i>
              </button>
            </div>
          </span>
          <span class="delete-feature feature">Delete</span>
          <span class="share-feature feature">Share</span>
        </div>
      </div>
  
      <div class="product-price">
        <span>${(item.price * item.qty).toFixed(2)} SAR</span>
      </div>  
     
     `;

    cartList.appendChild(cartItem);
  });

  // Event delegation for buttons
  cartList.addEventListener("click", (e) => {
    const cartItem = e.target.closest(".cart-item");
    if (!cartItem) return;

    if (
      e.target.closest(".increase-product") ||
      e.target.classList.contains("ri-add-line")
    ) {
      updateQuantity(cartItem, "increase");
    } else if (
      e.target.closest(".decrease-product") ||
      e.target.classList.contains("ri-delete-bin-4-line")
    ) {
      updateQuantity(cartItem, "decrease");
    } else if (e.target.classList.contains("delete-feature")) {
      deleteProduct(cartItem);
    }
  });

  function updateQuantity(cartItem, action) {
    const input = cartItem.querySelector(".product-input");
    let qty = parseInt(input.value, 10);
    const itemId = cartItem.dataset.id;

    const product = usersCart.find((item) => item.id === itemId);
    if (!product) return;

    if (action === "increase") {
      qty++;
    } else if (action === "decrease" && qty > 1) {
      qty--;
    }

    product.qty = qty;
    input.value = qty;

    updateCartPrice(cartItem, product.price, qty);
    saveCart();
    totalUpdate();
  }

  // update product price
  function updateCartPrice(cartItem, price, qty) {
    const priceElement = cartItem.querySelector(".product-price span");

    if (priceElement) {
      priceElement.textContent = `${(price * qty).toFixed(2)} SAR`;
    }
  }

  function calculateTotal() {
    return usersCart
      .reduce((sum, item) => sum + item.price * item.qty, 0)
      .toFixed(2);
  }

  function saveCart() {
    localStorage.setItem("carts", JSON.stringify(usersCart));
  }

  function totalUpdate() {
    totalAmount = calculateTotal();

    if (counterBill) {
      counterBill.textContent = `Amount : ${totalAmount} SAR`;
    }
  }

  function deleteProduct(cartItem) {
    const itemId = cartItem.dataset.id;
    usersCart = usersCart.filter((item) => item.id !== itemId);
    cartItem.remove();
    saveCart();
    displaySubtotalItem();
    totalUpdate();
  }

  // Update subtotal display
  function displaySubtotalItem() {
    if (subtotalItem) {
      subtotalItem.textContent = `Subtotal (${usersCart.length} items)`;
    }
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert(`Amount: ${totalAmount} has been Paid!`);
    });
  }

  displaySubtotalItem();
  totalUpdate();
});
