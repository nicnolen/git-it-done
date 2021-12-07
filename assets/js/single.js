// GLOBAL VARIABLES
// Reference the issues container
var issueContainerEl = document.querySelector("#issues-container");
// Reference limit warning container
var limitWarningEl = document.querySelector("#limit-warning");

// FUNCTIONS
// Create an HTTP request
var getRepoIssues = function(repo) {
    // variable to hold the query
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"; // ?direction=asc will reverse order to return older issues first
    
    // build an HTTP reqest to hit the apiUrl endpoint and check the information returned in the response
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to dom function
                displayIssues(data);

                // check if api has paginated (split the issues past the first 30 issues into a seperate header) issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
};

// Turn GitHub issue data into DOM Elements
var displayIssues = function(issues) {
    if (issues.length === 0) {
      issueContainerEl.textContent = "This repo has no open issues!";
      return;
    }
  
    // loop over given issues
    for (var i = 0; i < issues.length; i++) {
      // create a link element to take users to the issue on github
      var issueEl = document.createElement("a");
      issueEl.classList = "list-item flex-row justify-space-between align-center";
      issueEl.setAttribute("href", issues[i].html_url);
      issueEl.setAttribute("target", "_blank");
      
      // create span to hold issue title
      var titleEl = document.createElement("span");
      titleEl.textContent = issues[i].title;
      
    
      // append to container
      issueEl.appendChild(titleEl);
  
      // create a type element
      var typeEl = document.createElement("span");
  
      // check if issue is an actual issue or a pull request
      if (issues[i].pull_request) {
        typeEl.textContent = "(Pull request)";
      }
      else {
        typeEl.textContent = "(Issue)";
      }
  
      // append to container
      issueEl.appendChild(typeEl);
    
      // append to the dom
      issueContainerEl.appendChild(issueEl);
    }
  };

  // Sends users to github when there are more than 30 issues
  var displayWarning = function(repo) {
      // add text to warning container
      limitWarningEl.textContent = "To see more than 30 issues, visit ";

      // append a link with an href that points to the github issues 
      var linkEl = document.createElement("a");
      linkEl.textContent = "See More Issues on Github.com";
      linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
      linkEl.setAttribute("target", "_blank");

      // append to warning container
      limitWarningEl.appendChild(linkEl);
  };

getRepoIssues("facebook/react");