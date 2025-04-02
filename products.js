document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      productName: "laptop",
      color: "black",
      price: 150.26,
      size: "14",
      productImage:
        "https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?t=st=1742585249~exp=1742588849~hmac=02893eaa7b916511fd5478a040c40a9da4e2b96d640db6bc72a9393afe028dd1&w=996",
    },
    {
      id: 2,
      productName: "bike",
      color: "black",
      price: 250.32,
      size: "14",
      productImage:
        "https://img.freepik.com/free-photo/cool-bicycle-studio_23-2150884204.jpg?t=st=1742585999~exp=1742589599~hmac=b96b68f25faf1d2a9f8b2f2d176beb65b8e1cb9bddcd26c0a71e94a2d53a3cb3&w=740",
    },
    {
      id: 3,
      productName: "chair",
      color: "black",
      price: 222.34,
      size: "14",
      productImage:
        "https://img.freepik.com/free-psd/elegant-dark-grey-fabric-armchair-with-black-legs_191095-81581.jpg?t=st=1742586054~exp=1742589654~hmac=edb52937d4fe2174788b5cd28746baf90e727d0d7d43c3f60f68a12d01272202&w=740",
    },
    {
      id: 4,
      productName: "Beautiful Car",
      color: "black",
      price: 15222.34,
      size: "14",
      productImage:
        "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const productList = document.querySelector(".product");
  const shoppingCart = document.querySelector(".cart-icon");
  const cartQty = document.querySelector(".cart-count");

  const productCart = JSON.parse(localStorage.getItem("carts")) || [];

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product-list");

    div.innerHTML = `

      <div class="product-cart">

        <div class="img">
          <img src="${product.productImage}"
          alt="${product.productName}" 
          width="200" 
          height="250" 
          >
        </div>

        <div class="product-feature">
          <p><small><sup>SAR</sup></small>${product.price.toFixed(2)}</p>
          <span>${product.productName}</span>
        </div>

        <div class="call-to-action-btn">
          <button data-action="add-to-cart" data-id="${
            product.id
          }">Add to cart</button>
          <button data-action="purchase" data-id="${
            product.id
          }">Purchase</button>
        </div>

      </div>
    
    `;

    productList.appendChild(div);
  });

  productList.addEventListener("click", (e) => {
    const button = e.target;
    const action = button.getAttribute("data-action");

    if (!action) return;

    const productId = parseInt(button.getAttribute("data-id"));
    const product = products.find((p) => p.id === productId);

    if (action === "add-to-cart") {
      addToCart(product);
    }
  });

  shoppingCart.addEventListener("click", () => {
    window.location.href = "./page/Cart/cart.html";
  });

  // Add Item to cart
  function addToCart(product) {
    const existingItem = productCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      productCart.push({
        ...product,
        qty: 1,
      });
    }

    saveCart();
    // alert(`${product.productName} Added to cart!`);
  }

  // save cart
  function saveCart() {
    localStorage.setItem("carts", JSON.stringify(productCart));
    updateCartCount();
  }

  // update cart quantity
  function updateCartCount() {
    const totalQty = productCart.reduce((sum, item) => sum + item.qty, 0);
    cartQty.textContent = totalQty;
  }

  updateCartCount();
});
