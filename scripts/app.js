document.addEventListener("DOMContentLoaded", function() {
    let feed = document.getElementById("feed");
    let postCount = 0;

    function fetchPosts() {
        fetch("assets/sample-posts.json")
            .then(response => response.json())
            .then(posts => {
                posts.slice(postCount, postCount + 5).forEach(post => {
                    let postElement = document.createElement("div");
                    postElement.classList.add("post");
                    postElement.innerHTML = `
                        <img src="${post.image}" alt="Post Image">
                        <p class="caption">${post.caption}</p>
                        <button class="like-btn">❤️ Like</button> <span class="likes">0</span>
                        <div class="comments"></div>
                        <input type="text" class="comment-input" placeholder="Add a comment...">
                    `;
                    
                    postElement.querySelector(".like-btn").addEventListener("click", function() {
                        let likes = parseInt(postElement.querySelector(".likes").innerText);
                        postElement.querySelector(".likes").innerText = likes + 1;
                    });

                    feed.appendChild(postElement);
                });
                postCount += 5;
            });
    }

    fetchPosts();

    window.addEventListener("scroll", function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            fetchPosts();
        }
    });
});
