// Declare a single "state" variable (object) to store application variables.
let state = {
  products: [],
  maxVotes: 15,
  votesCast: 0,
  previousImages: []
};
// let allProducts = an array []
let allProductNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
for (let i = 0; i < allProductNames.length; i++) {
  new Product(allProductNames[i], `./assets/${allProductNames[i]}.jpg`);
  //"./assets/" + allProductNames[i] + ".jpg"  <--this is exactly what is inside the backtics above.
}
//These are the HTML elements in the markup where the product images and product results will be inserted in to.
let productImage1 = document.querySelector('.product1 img');
let productImage2 = document.querySelector('.product2 img');
let productImage3 = document.querySelector('.product3 img');
let productContainer = document.querySelector('.products');
let resultsContainer = document.querySelector('.results');
//Constructor function to create Product objects. The product constructor.
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
  let product1, product2, product3;
  do {
    product1 = getRandomNumber();
    product2 = getRandomNumber();
    product3 = getRandomNumber();
  } while (
    product1 === product2 ||
    product1 === product3 ||
    product2 === product3 ||
    state.previousImages.includes(product1) ||
    state.previousImages.includes(product2) ||
    state.previousImages.includes(product3)
  );
  // Update the previous set of images
  state.previousImages = [product1, product2, product3];
  // Showing product on screen.
  productImage1.src = state.products[product1].imagePath;
  productImage1.alt = state.products[product1].name;
  productImage2.src = state.products[product2].imagePath;
  productImage2.alt = state.products[product2].name;
  productImage3.src = state.products[product3].imagePath;
  productImage3.alt = state.products[product3].name;
  // Add 1 to the number of views for each product.
  state.products[product1].views++;
  state.products[product2].views++;
  state.products[product3].views++;
  console.log(state.products);
}
// This will display at the very end of the voting, when the amount of max votes are reached.
// Iterate the products array and display the name, votes, and views of each product.
function showTotals() {
  //This piece of code will have results dipslay on screen in text format. For lab 12, we no longer need it.
  // for (let i = 0; i < state.products.length; i++) {
  //   let productData = document.createElement('div');
  //   productData.textContent = `${state.products[i].name} had ${state.products[i].votes} votes and was shown ${state.products[i].views} times`;
  //   resultsContainer.appendChild(productData);
  // }
  let chartVotes = [];
  let chartViews = [];
  for (let i=0; i<state.products.length; i++) {
    chartVotes.push( state.products[i].votes);
    chartViews.push( state.products[i].views);
  }
  // Chart.js options
  let options = {
    type: 'bar',
    data: {
      labels: allProductNames,
      datasets: [
        {
          label: '# of Votes',
          data: chartVotes,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        },
        {
          label: '# of Views',
          data: chartViews,
          backgroundColor: [
            ''
          ]
        }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  // Creating a canvas context
  const ctx = document.getElementById('myChart').getContext('2d');
  // Make a new chart with the canvas context and some options
  const myChart = new Chart(ctx, options);
}
// When user clicks on a product, find it in the array and add 1 to its vote count.
// This will also note the number of total votes cast and stop if it is exceeded.
// This was originally written as all one function. Then, John showed that by declaring the variable voteForTheProduct, and using that in the addEventListener function, we can then reference voteForTheProduct towards the bottom in our removeEventListener function at the end of the code block.
productContainer.addEventListener('click', voteForTheProduct);
function voteForTheProduct(event) {
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
    productContainer.removeEventListener('click', voteForTheProduct);
  } else {
    renderProducts();
  }
}
renderProducts();
