const cloudName = "dej6zydgw";
const uploadPreset = "Travelgram";

async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    return data.secure_url; // Returns the uploaded image URL
}
