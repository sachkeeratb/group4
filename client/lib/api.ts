import axios from "axios";

const API_URL =
  (process.env.NEXT_PUBLIC_API_URL as string) || "http://localhost:5000/api";

// Send a chat message to the AI service
export async function sendChatMessage({
  message,
  tool = null,
  userId = null,
  chatId = null,
}) {
  try {
    const response = await axios.post(`${API_URL}/api/chat/message`, {
      message,
      tool,
      userId,
      chatId,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
}

// Get chat history for the logged-in user
export async function getUserChats() {
  try {
    const response = await axios.get(`${API_URL}/api/chat/history`, {
      withCredentials: true, // Important for cookies/auth
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user chats:", error);
    throw error;
  }
}

// Delete a chat from history
export async function deleteChat(chatId: string) {
  try {
    const response = await axios.delete(`${API_URL}/api/chat/${chatId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting chat:", error);
    throw error;
  }
}

// Create a new user account
export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(
      `${API_URL}/api/users/register`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
