import Image from '../components/Image'
import { format } from "timeago.js"
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';

const Comment = ({ item, postId }) => {
    const { user } = useUser()
    const { getToken } = useAuth()



    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return axios.delete(
                `${import.meta.env.VITE_API_URL}/comments/${item._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
            toast.success("Comment deleted successfully");
        },
        onError: (error) => {
            toast.error(error.response.data);
        },
    });


    return (
        <>
            <div className="flex gap-2 items-center">
                <div className='w-8 h-8 '>
                    {
                        item?.user.img ? (
                            <Image
                                src={item.user.img}
                                className='w-full h-full rounded-full object-cover object-center'
                            />
                        ) :
                            (
                                <Image
                                    src={'zoro.jpg'}
                                    className='w-full h-full rounded-full object-cover object-center'
                                />
                            )
                    }

                </div>
                <div className="text-xs space-x-1">
                    <span className="font-medium">{item.user.username}</span>
                    <span className="text-gray-400">
                        {format(item.createdAt)}
                    </span>
                </div>
            </div>
            <p className="mt-2 leading-relaxed tracking-wide text-slate-600 text-sm">
                {item.desc}
            </p>
            {
                user?.username === item.user.username &&
                <button
                    className='text-sm font-light cursor-pointer'
                    onClick={() => mutate()}
                >
                    remove
                </button>
            }
        </>
    )
}
export default Comment