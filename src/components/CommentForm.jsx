import { Button } from "./ui/button";
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast"

const CommentForm = ({ postId }) => {
    const { getToken } = useAuth()

    const queryClient = useQueryClient()

    const { mutate, isPending, isError } = useMutation({
        mutationFn: async (newComment) => {
            const token = await getToken()
            return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['comments', postId]
            })
            toast.success("Comment had been created sucessfully!")
        },
        onError: (error) => {
            toast.error(error.res.data)
        }
    })



    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const data = {
            desc: formData.get("desc")
        }
        mutate(data)
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 items-center">
            <textarea
                type="text"
                name="desc"
                className="w-full p-4 rounded-2xl border border-slate-300 focus:outline-none"
                placeholder="Write something..."
            />
            <Button>Submit</Button>
        </form>
    )
}
export default CommentForm