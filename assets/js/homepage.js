// FUNCTIONS
// Search for GitHub users and list all their repositories
var getUserRepos = function () {
    // make an HTTP request to GitHub's web server. In response, Github's server gave us JSON data.
    fetch("https://api.github.com/users/octocat/repos");

    // read the data that was return in Github's server response
    var response = fetch("https://api.github.com/users/octocat/repos").then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getUserRepos();