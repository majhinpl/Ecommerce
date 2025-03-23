document.addEventListener("DOMContentLoaded", () => {
  const productIncreaseBtn = document.querySelector(".increase-product");
  const productDecreaseBtn = document.querySelector(".decrease-product");
  const productInput = document.querySelector(".product-input");

  increaseCartsProduct();
  decreaseCartsProduct();

  // increase cart product
  function increaseCartsProduct() {
    productIncreaseBtn.addEventListener("click", () => {
      let productQty = productInput.value.trim();
      if (!productQty) return;
      productQty = Number(productQty) + 1;

      const maxQty = Number(productInput.max);
      if (maxQty && productQty >= maxQty) {
        productQty = maxQty;
      }
      productInput.value = productQty;
    });
  }

  // decrease cart product
  function decreaseCartsProduct() {
    productDecreaseBtn.addEventListener("click", () => {
      let productQty = productInput.value.trim();
      if (!productQty) return;
      productQty = Number(productQty) - 1;

      const minQty = Number(productInput.min);
      if (minQty && productQty <= minQty) {
        productQty = minQty;
      }

      productInput.value = productQty;
    });
  }
});
