// Get the search button element by its id
const searchbtn = document.getElementById("search-btn");

// Get the result and loader elements by their ids
const result = document.getElementById("result");
const loader = document.getElementById("loader");

// Variable to store previously fetched data
let previousData = '';

// Add click event listener to the search button
searchbtn.addEventListener("click", () => {
  // Show the loader when search button is clicked
  loader.style.display = "block";

  // Get the value of the input field and remove any leading or trailing whitespace
  const inputBtn = document.getElementById("search-inp").value.trim();

  // Construct the final URL for the API request
  const finalURL = `https://www.omdbapi.com/?s=${inputBtn}&apikey=c9466890`;

  // Fetch data from the OMDB API
  fetch(finalURL)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      // Hide the loader once data is fetched
      loader.style.display = "none";

      // Check if the response contains search results
      if (data.Search) {
        // Clear the result element
        result.innerHTML = '';

        // Iterate over each movie in the search results and prepend to the existing result
        data.Search.forEach((element) => {
          result.innerHTML += `
            <div class="container-box">
              <div class="movie-list" id="movie-list">
                <img src="${element.Poster}">
                <h2>${element.Title}</h2>
                <button>Watch Now</button>
              </div>
            </div>
          `;
        });

        // Prepend the previously fetched data to the existing result
        result.innerHTML += previousData;

        // Update the previousData variable with the newly fetched data
        previousData = result.innerHTML;
      }
      // If the input is empty, display a message
      else if (inputBtn.length == 0) {
        result.innerHTML = `<h4>Input can't be empty</h4>`;
      }
      // If the search returns no results, display a message
      else {
        result.innerHTML = `<h4>Please enter a valid name</h4>`;
      }
    });
});
