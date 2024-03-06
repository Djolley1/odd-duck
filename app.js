// Declare a single "state" variable (object) to store application variables.
let state = {
  products: [],
  maxVotes: 15,
  votesCast: 0,
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

// Add the event listener with the handleClick function
productContainer.addEventListener('click', handleClick);

// Initial rendering of products
renderProducts();

let namesArray = [];
let viewsArray = [];
let votesArray = [];
let chartColors = [];
for (let i = 0; i < state.products.length; i++) {
  namesArray.push(state.products[i].name);
  viewsArray.push(state.products[i].views);
  votesArray.push(state.products[i].votes);
  let color1 = Math.floor(256 * Math.random());
  let color2 = Math.floor(256 * Math.random());
  let color3 = Math.floor(256 * Math.random());
  chartColors.push(`rgba(${color1}, ${color2}, ${color3}, 1)`);
}
function makeBarChart(canvasid, data, labels, chartLabel) {
  const ctx = document.getElementById(canvasid);
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of ' + chartLabel,
        data: data,
        backgroundColor: chartColors,
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
makeBarChart('myChart', viewsArray, namesArray, 'Views');



// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });
