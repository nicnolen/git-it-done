// FUNCTIONS
// Search for GitHub users and list all their repositories
var getUserRepos = function () {
    // fetch resources by making an HTTP request to GitHub's web server
    fetch("https://api.github.com/users/octocat/repos");
};

getUserRepos();