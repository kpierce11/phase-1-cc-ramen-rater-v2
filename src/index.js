// Callbacks
const handleClick = (ramen) => {
  // Get elements from #ramen-detail
  const detailImage = document.querySelector('.detail-image');
  const detailName = document.querySelector('.name');
  const detailRestaurant = document.querySelector('.restaurant');

  // Get elements for rating and commenting
  const detailRating = document.getElementById('rating-display');
  const detailComment = document.getElementById('comment-display');

  // Update #ramen-detail with ramen data
  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const ramenForm = document.getElementById('new-ramen');
  if (ramenForm) {
      ramenForm.addEventListener('submit', (event) => {
          event.preventDefault();

          const name = document.querySelector('#new-name').value;
          const restaurant = document.querySelector('#new-restaurant').value;
          const image = document.querySelector('#new-image').value;
          const rating = document.querySelector('#new-rating').value;
          const comment = document.querySelector('#new-comment').value;

          const newRamen = {
              name,
              restaurant,
              image,
              rating,
              comment,
          };

          const img = document.createElement('img');
          img.src = newRamen.image;
          document.getElementById('ramen-menu').appendChild(img);

          // Add event to display ramen details when clicked
          img.addEventListener('click', () => handleClick(newRamen));

          // Add new ramen to db.json (requires server update)
          fetch('http://localhost:3000/ramens', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newRamen),
              })
              .then(response => response.json())
              .then(data => console.log('New ramen added:', data))
              .catch(error => console.error('Error adding ramen:', error));
      });
  }
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(json => {
          // Loop through each ramen object
          json.forEach(ramen => {
              const img = document.createElement('img');
              img.src = ramen.image;

              // Add event to display ramen details when clicked
              img.addEventListener('click', () => handleClick(ramen));

              //Append the image to #ramen-menu
              document.getElementById('ramen-menu').appendChild(img);
          })
      })
      .catch(error => console.error('error fetching data', error));
};

const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};