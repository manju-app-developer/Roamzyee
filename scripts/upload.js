document.getElementById("uploadBtn").addEventListener("click", async function() {
    const fileInput = document.getElementById("fileInput");
    const captionInput = document.getElementById("captionInput");

    if (fileInput.files.length === 0) {
        alert("Please select an image to upload.");
        return;
    }

    const file = fileInput.files[0];
    const imageUrl = await uploadImage(file);

    const newPost = {
        image: imageUrl,
        caption: captionInput.value || "No caption"
    };

    // Store new post in local storage (temporary solution)
    let posts = JSON.parse(localStorage.getItem("roamzyeePosts")) || [];
    posts.unshift(newPost);
    localStorage.setItem("roamzyeePosts", JSON.stringify(posts));

    // Redirect to homepage
    window.location.href = "index.html";
});
