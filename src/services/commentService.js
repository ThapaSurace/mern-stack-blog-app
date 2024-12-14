import axios from "axios";

export const fetchComments = async (postId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`)
    return res.data
}
