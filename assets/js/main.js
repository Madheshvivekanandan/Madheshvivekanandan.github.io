// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (event) => {
      // Let HTML5 handle its own validation first
      if (!form.checkValidity()) {
        return;
      }

      // Now perform additional custom validation
      const message = document.getElementById("message").value.trim();

      if (message.length < 10) {
        alert("Your message should be at least 10 characters long.");
        event.preventDefault(); // Stop submission
        return;
      }

      alert("Thank you! Your message has been sent successfully.");
      form.reset(); // Clear form after submission
      event.preventDefault(); // Prevent actual sending for demo
    });
  }

  // Fetch GitHub Repos
  fetchGitHubRepos();

});


async function fetchGitHubRepos() {
  const apiURL = `https://api.github.com/users/Madheshvivekanandan/repos`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const repos = await response.json();
    console.log("Fetched repos:", repos);
    const repoList = document.getElementById("repo-list");

    if (!repoList) return; // if not on project page, exit

    repoList.innerHTML = "";

    repos.forEach(repo => {
      const repoCard = document.createElement("div");
      repoCard.classList.add("repo-card");
      repoCard.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description provided."}</p>
        <p>⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      repoList.appendChild(repoCard);
    });

  } catch (error) {
    console.error("Error fetching repos:", error);
    const repoList = document.getElementById("repo-list");
    if (repoList)
      repoList.innerHTML = "<p>Unable to load projects right now.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
});
