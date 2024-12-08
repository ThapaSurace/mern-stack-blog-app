import Image from '../components/Image'
import { Link } from 'react-router-dom'
import { FaRegHeart, FaRegBookmark } from 'react-icons/fa';
import Comments from '../components/Comments';

const SinglePostPage = () => {
    return (
        <div className="my-6 max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold text-slate-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. In, magni?</h1>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <div className='w-12 h-12'>
                        <Image
                            src='zoro.jpg'
                            className='w-full h-full rounded-full object-cover object-center'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <Link className='font-medium text-sm'>Zoro Senapi</Link>
                        <span className='text-xs text-gray-400'>Web Design</span>
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
                    src='postImage.png'
                    className="rounded-2xl object-center object-cover w-full h-full shadow-md"
                />
            </div>

            {/* content */}
            <hr />
            <div className='text-slate-700 leading-relaxed tracking-wide space-y-4'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ducimus incidunt placeat vero velit illo aut iure debitis, accusantium consequatur.</p>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus asperiores quos quo molestias nihil saepe qui ratione perspiciatis quam voluptate iste ipsum illum tempora soluta, delectus dicta, obcaecati voluptatum impedit debitis quibusdam error repellendus? Cupiditate minus eligendi ea dolore. Exercitationem facilis totam praesentium ea enim natus asperiores distinctio vitae quibusdam!</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sequi earum quam labore veniam cumque dolorum mollitia alias sed aliquid saepe placeat enim a iusto.</p>
            </div>

            <div>
                <Comments />
            </div>
        </div>
    )
}
export default SinglePostPage