document.addEventListener("DOMContentLoaded", loadPosts);

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Upload Post
function uploadPost() {
    const caption = document.getElementById("caption").value;
    const imageInput = document.getElementById("imageUpload").files[0];

    if (!caption || !imageInput) {
        alert("Please add a caption and an image!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const imageData = event.target.result;
        const post = { caption, image: imageData, likes: 0, comments: [] };
        savePost(post);
    };
    reader.readAsDataURL(imageInput);
}

// Save Post to LocalStorage
function savePost(post) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// Load Posts
function loadPosts() {
    const postFeed = document.getElementById("postFeed");
    postFeed.innerHTML = "";
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.forEach((post, index) => {
        postFeed.innerHTML += `
            <div class="post">
                <p>${post.caption}</p>
                <img src="${post.image}" alt="Travel Photo">
                <div class="actions">
                    <span class="like" onclick="likePost(${index})">❤️ ${post.likes}</span>
                    <span class="comment" onclick="addComment(${index})">💬 Comment</span>
                </div>
            </div>
        `;
    });
}

// Like Post
function likePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts"));
    posts[index].likes++;
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// Add Comment (To be implemented later)
function addComment(index) {
    alert("Comment feature coming soon!");
}
