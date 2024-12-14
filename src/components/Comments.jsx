import { Button } from "./ui/button";
import Comment from "./Comment";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchComments } from "../services/commentService";
import { useMutation } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

const Comments = ({ postId }) => {
    const { getToken } = useAuth()
    const { user } = useUser()

    const { data, error, isPending } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId)
    })

    const queryClient = useQueryClient()

    const { mutate, isPending: mutationIsPending, variables } = useMutation({
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
        <div>
            <h1 className="underline text-lg text-slate-800 mb-4">Comments</h1>
            <form onSubmit={handleSubmit} className="flex gap-4 items-center">
                <textarea
                    type="text"
                    name="desc"
                    className="w-full p-4 rounded-2xl border border-slate-300 focus:outline-none"
                    placeholder="Write something..."
                />
                <Button
                    disabled={mutationIsPending}
                    className="disabled:cursor-not-allowed disabled:bg-slate-500"
                >
                    {mutationIsPending ? "Submitting..." : "Submit"}
                </Button>
            </form>

            <div className="mt-4 space-y-6">
                {
                    isPending ? <span>loading...</span>
                        : error ? <span>Something went wrong!</span>
                            : <>
                                {
                                    mutationIsPending &&
                                    <Comment item={{
                                        desc: `${variables.desc} (sending...)`,
                                        user: {
                                            img: user.imageUrl,
                                            username: user.username
                                        }
                                    }} />

                                }
                                {
                                    data.map(item => (
                                        <Comment item={item} postId={postId} key={item._id} />
                                    ))
                                }
                            </>
                }
            </div>
        </div>
    )
}
export default Comments