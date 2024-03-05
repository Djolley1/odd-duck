state = {
  products: [],
  maxVotes: 25,
  votesCast: 0,
  roundsRemaining: 25,
}

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.votes = 0;
  this.views = 0;
  state.products.push(this);
}

function getRandomProduct() {
  return state.products[Math.floor(Math.random() * state.products.length)];
}

function renderProduct(containerId) {
  let container = document.getElementById(containerId);
  let randomProduct = getRandomProduct();
  
  container.innerHTML = ''; // Clear the container
  let img = document.createElement('img');
  img.src = randomProduct.src;
  img.alt = randomProduct.name;

  container.appendChild(img);

  randomProduct.views++;

  img.addEventListener('click', clickHandler);
  img.setAttribute('data-product-index', state.products.indexOf(randomProduct));
}

function clickHandler(event) {
  let productIndex = event.target.getAttribute('data-product-index');
  if (productIndex !== null) {
    let clickedProduct = state.products[+productIndex];
    clickedProduct.votes++;

    state.roundsRemaining--;

    if (state.roundsRemaining === 0) {
      alert('Voting session has ended. Thank you!');
      state.votingSessionended = true;
    }

    // Determine which container was clicked and re-render that container
    let containerId = event.target.closest('.product-container').id;
    renderProduct(containerId);
  }
}

// Add your Product instances for all images
new Product("Bag", "./img/201-lab11-assets-/assets/bag.jpg");
new Product("Banana", "./img/201-lab11-assets-/assets/banana.jpg");
new Product("Bathroom", "img/201-lab11-assets-/assets/bathroom.jpg");
new Product("Boots", "img/201-lab11-assets-/assets/boots.jpg");
new Product("Breakfast", "img/201-lab11-assets-/assets/breakfast.jpg");
new Product("Bubblegum", "img/201-lab11-assets-/assets/bubblegum.jpg");
new Product("Chair", "img/201-lab11-assets-/assets/chair.jpg");
new Product("Cthulhu", "img/201-lab11-assets-/assets/cthulhu.jpg");
new Product("Dog Duck", "img/201-lab11-assets-/assets/dog-duck.jpg");
new Product("Dragon", "./img/201-lab11-assets-/assets/dragon.jpg");
new Product("Pen", "./img/201-lab11-assets-/assets/pen.jpg");
new Product("Pet Sweep", "./img/201-lab11-assets-/assets/pet-sweep.jpg");
new Product("Scissors", "./img/201-lab11-assets-/assets/scissors.jpg");
new Product("Shark", "./img/201-lab11-assets-/assets/shark.jpg");
new Product("Sweep", "./img/201-lab11-assets-/assets/sweep.png");
new Product("Tauntaun", "./img/201-lab11-assets-/assets/tauntaun.jpg");
new Product("Unicorn", "./img/201-lab11-assets-/assets/unicorn.jpg");
new Product("Water Can", "./img/201-lab11-assets-/assets/water-can.jpg");
new Product("Wine Glass", "./img/201-lab11-assets-/assets/wine-glass.jpg");


// Initialize the rendering for each container
renderProduct("product-container-1");
renderProduct("product-container-2");
renderProduct("product-container-3");
