import axios from "axios";

export const fetchPosts = async (pageParams) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
        params: {
            page: pageParams,
            limit: 5
        }
    })
    return res.data
}


export const fetchPost = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
    return res.data;
};