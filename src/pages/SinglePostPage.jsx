import Image from '../components/Image'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";
import Comments from '../components/Comments';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchPost } from '../services/postService';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';

const SinglePostPage = () => {
    const { slug } = useParams();
    const { user } = useUser()
    const { getToken } = useAuth()
    const navigate = useNavigate()

    const isAdmin = user?.publicMetadata?.role === "admin" || false

    const { isPending, error, data: post } = useQuery({
        queryKey: ["post", slug],
        queryFn: () => fetchPost(slug),
    });


    const { mutate } = useMutation({
        mutationFn: async (postId) => {
            const token = await getToken();
            return axios.delete(
                `${import.meta.env.VITE_API_URL}/posts/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post", slug] });
            toast.success("Blog deleted successfully");
            navigate('/')
        },
        onError: (error) => {
            toast.error(error.response.data);
        },
    });

    if (isPending) return "loading...";
    if (error) return "Something went wrong!" + error.message;
    if (!post || post.length === 0) return <span>Post not found!</span>

    return (
        <div className="my-6 max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold text-slate-800">
                {post.title}
            </h1>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <div className='w-12 h-12'>
                        {
                            post.user.img ? (
                                <Image
                                    src={post.user.img}
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
                    <div className='flex flex-col'>
                        <Link className='font-medium text-sm'>
                            {post?.user?.username}
                        </Link>
                        <span className='text-xs text-gray-400'>
                            {post.category}
                        </span>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <div title='save' className="w-10 h-10 bg-white text-2xl text-gray-800 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-colors duration-300">
                        <FaRegHeart />
                    </div>
                    {
                        (post.user.username === user?.username || isAdmin) && (
                            <div
                                title='delete'
                                className="w-10 h-10 bg-white text-2xl text-gray-800 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-colors duration-300"
                                onClick={() => mutate(post._id)}
                            >
                                <MdDeleteOutline />
                            </div>
                        )
                    }
                </div>
            </div>

            <div className='w-full h-80'>
                <Image
                    src={post.cover}
                    className="rounded-2xl object-center object-cover w-full h-full shadow-md"
                />
            </div>
            <p className='text-gray-600 leading-relaxed tracking-wide italic font-light text-sm'>
                {post.desc}
            </p>

            {/* content */}
            <hr />
            <div className='prose text-slate-700 leading-relaxed tracking-wide space-y-4'>
                <div
                    dangerouslySetInnerHTML={{
                        __html: post.content,
                    }}
                />
            </div>

            <div>
                <Comments postId={post._id} />
            </div>
        </div>
    )
}
export default SinglePostPage