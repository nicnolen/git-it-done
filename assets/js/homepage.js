// GLOBAL VARIABLES
// reference to the form element with an id of user-form
var userFormEl = document.querySelector("#user-form");
// reference to the input with an id of username
var nameInputEl = document.querySelector("#username");
// reference to the div where all the repository data will be written
var repoContainerEl = document.querySelector("#repos-container");
// reference to the span element where the search term will be written
var repoSearchTerm = document.querySelector("#repo-search-term");

// FUNCTIONS
// Search for GitHub users and list all their repositories
var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url 
  fetch(apiUrl).then(function(response) {
    // Make a conditional for if the user enters a valid repository or not
    // if the request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user);
      });
    } else {
      alert("Error: GitHub User Not Found");
    }
  })
  .catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to GitHub");
  });
};

// Function to handle form submissions
var formSubmitHandler = function(event) {
  // prevent the browser from performing the default action the event wants it to do. (In this case, prevent the browser from submitting a form to a URL)
  event.preventDefault();

  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    // clear the form
    nameInputEl.value = "";
  } else {
    alert("Please enter a Github username");
  } 
};

// Display repositories
var displayRepos = function(repos, searchTerm) { // repos is the array of repo data and searchTerm is the term we searched for
  // check for an empty array (no repos added for the user) 
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  // clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align center";

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
      "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

// EVENT LISTENERS
// Submit event listener
userFormEl.addEventListener("submit", formSubmitHandler);