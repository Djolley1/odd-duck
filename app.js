let state = {
  products: [],
  maxVotes: 6,
  votesCast: 0,
};

// let allProducts = []
let allProductNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
for (let i = 0; i < allProductNames.length; i++) {
  new Product(allProductNames[i], `./assets/${allProductNames[i]}.jpg`);
  //"./assets/" + allProductNames[i] + ".jpg"  <--this is exactly what is inside the backtics above.
}

let productImage1 = document.querySelector('.product1 img');
let productImage2 = document.querySelector('.product2 img');
let productImage3 = document.querySelector('.product3 img');


// let productImage1 = document.getElementById('img-1');
// let productImage2 = document.getElementById('img-2');
// let productImage3 = document.getElementById('img-3');
let productContainer = document.querySelector('.products');
let resultsContainer = document.querySelector('.results');

// Constructor function to create Product objects.
function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.views = 0;
  this.votes = 0;
  state.products.push(this);
}

function getRandomNumber() {
  return Math.floor(Math.random() * state.products.length);
}

function renderProducts() {
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();
  let product3 = getRandomNumber();

  if (product1 === product2 || product1 === product3 || product2 === product3) {
    renderProducts();
  }

  //Showing product on screen.
  productImage1.src = state.products[product1].imagePath;
  productImage1.alt = state.products[product1].name;

  productImage2.src = state.products[product2].imagePath;
  productImage2.alt = state.products[product2].name;

  productImage3.src = state.products[product3].imagePath;
  productImage3.alt = state.products[product3].name;
  console.log('productImage1', productImage1)
  // Add 1 to the number of views for each product.
  state.products[product1].views++;
  state.products[product2].views++;
  state.products[product3].views++;

  console.log(state.products);

}

function showTotals() {
  for (let i = 0; i < state.products.length; i++) {
    let productData = document.createElement('div');
    productData.textContent = `${state.products[i].name} had ${state.products[i].votes} votes and was shown ${state.products[i].views} times`;
    resultsContainer.appendChild(productData);
  }
}


let canVote = true;

function handleClick(event) {
  if (!canVote) {
    return; // If canVote is false, do not handle the click
  }

  let name = event.target.alt;
  for (let i = 0; i < state.products.length; i++) {
    if (state.products[i].name === name) {
      state.products[i].votes++;
      break;
    }
  }
  state.votesCast++;

  console.log(state);

  if (state.votesCast >= state.maxVotes) {
    showTotals();
    canVote = false; // Set the flag to false to stop handling clicks
  } else {
    renderProducts();
  }
}

// Add the event listener with the handleClick function
productContainer.addEventListener('click', handleClick);

// Initial rendering of products
renderProducts();
