import { postImgData } from "../firebaseConfig";

const API_BASE_URL = __DEV__
  ? "http://10.0.2.2:5000"
  : "https://your-backend-url.com";
class ApiService {
  // Get all images for a user
  static async getUserImages(uid) {
    try {
      const response = await fetch(`${API_BASE_URL}/post/images/${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user images:", error);
      throw error;
    }
  }

  // Get profile picture for a user
  static async getProfilePicture(uid) {
    try {
      const response = await fetch(`${API_BASE_URL}/post/profile-pic/${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      throw error;
    }
  }

  // Upload image (you'll need to add this endpoint to your backend)
  static async uploadImage(uid, imageUri) {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg",
        name: `${Date.now()}.jpg`,
      });
      formData.append("uid", uid);

      const response = await fetch(`${API_BASE_URL}/post/upload/${uid}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Image uploaded successfully:", data.path);
      /*console.log("Image URL:", data.data.publicUrl);*/
      await postImgData(uid, data.path);
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
      console.log("Stack trace:", error.stack);
      throw error;
    }
  }
}

export default ApiService;
