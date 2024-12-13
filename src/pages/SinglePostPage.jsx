import Image from '../components/Image'
import { Link, useParams } from 'react-router-dom'
import { FaRegHeart, FaRegBookmark } from 'react-icons/fa';
import Comments from '../components/Comments';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPost = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
    return res.data;
};

const SinglePostPage = () => {
    const { slug } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ["post", slug],
        queryFn: () => fetchPost(slug),
    });

    if (isPending) return "loading...";
    if (error) return "Something went wrong!" + error.message;
    if (!data) return "Post not found!";


    console.log(data);

    return (
        <div className="my-6 max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold text-slate-800">
                {data.title}
            </h1>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <div className='w-12 h-12'>
                        {
                            data.user.image ? (
                                <Image
                                    src={'zoro.jpg'}
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
                            {data.user.username}
                        </Link>
                        <span className='text-xs text-gray-400'>
                            {data.category}
                        </span>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <div className="w-10 h-10 bg-white text-2xl text-gray-800 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-colors duration-300">
                        <FaRegHeart />
                    </div>
                    <div className="w-10 h-10 bg-white text-2xl text-gray-800 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-colors duration-300">
                        <FaRegBookmark />
                    </div>
                </div>
            </div>

            <div className='w-full h-80'>
                <Image
                    src={data.cover}
                    className="rounded-2xl object-center object-cover w-full h-full shadow-md"
                />
            </div>
            <p className='text-gray-600 leading-relaxed tracking-wide italic font-light text-sm'>
                {data.desc}
            </p>

            {/* content */}
            <hr />
            <div className='prose text-slate-700 leading-relaxed tracking-wide space-y-4'>
                <div
                    dangerouslySetInnerHTML={{
                        __html: data.content,
                    }}
                />
            </div>

            <div>
                <Comments />
            </div>
        </div>
    )
}
export default SinglePostPage