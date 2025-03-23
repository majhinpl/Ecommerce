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
  ];

  const productList = document.querySelector(".product");

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product-list");

    const productCart = document.createElement("div");
    productCart.classList.add("product-cart");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("img");
    imgDiv.innerHTML = `    
    <img src="${product.productImage}" alt="" width="200" height="250" >
    `;

    const productFeature = document.createElement("div");
    productFeature.classList.add("product-feature");

    productFeature.innerHTML = `
    <p><small><sup>SAR</sup></small>${product.price}</p>
    <span>Product Name : ${product.productName}</span>
    `;
    console.log(product.productName);

    div.appendChild(productCart);
    productCart.appendChild(imgDiv);
    productCart.appendChild(productFeature);
    productList.appendChild(div);

    productCart.addEventListener("click", () => {
      console.log("hello");
    });
  });
});
