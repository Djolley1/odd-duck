let state = {
  products: [],
  maxVotes: 6,
  votesCast: 0,
  previousImages: [],
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

// function renderProducts() {
//   let product1 = getRandomNumber();
//   let product2 = getRandomNumber();
//   let product3 = getRandomNumber();

//   if (product1 === product2 || product1 === product3 || product2 === product3) {
//     renderProducts();
//   }

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

  //Showing product on screen.
  productImage1.src = state.products[product1].imagePath;
  productImage1.alt = state.products[product1].name;

  productImage2.src = state.products[product2].imagePath;
  productImage2.alt = state.products[product2].name;

  productImage3.src = state.products[product3].imagePath;
  productImage3.alt = state.products[product3].name;
  console.log('productImage1', productImage1);
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
