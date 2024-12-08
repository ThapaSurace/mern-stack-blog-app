import { Link } from 'react-router-dom';
import Image from './Image';
import { FaRegHeart, FaRegBookmark } from 'react-icons/fa';

const PostCard = () => {
    return (
        <div>
            <div className="relative overflow-hidden group rounded-2xl">
                <Link to={`/${'slug'}`}>
                    {/* Animated Image */}
                    <Image
                        src="postImage.png"
                        className="rounded-2xl object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay with fade-in animation */}
                    <div className="absolute top-0 w-full h-full py-2 px-6 bg-black/20 rounded-2xl flex justify-between items-end opacity-0 hover:opacity-100 transition-opacity duration-500">
                        <h1 className="text-lg font-bold text-white">
                            Home Page
                        </h1>
                        <div className="flex gap-2 items-center">
                            <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-colors duration-300">
                                <FaRegHeart />
                            </div>
                            <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-colors duration-300">
                                <FaRegBookmark />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Meta Info */}
            <div className="text-[12px] py-2 flex justify-between items-center px-2">
                <div className='space-x-1'>
                    <span>Written by</span>
                    <Link to="#" className="text-blue-800 font-medium">
                        Zoro
                    </Link>
                </div>
                <span className="text-gray-600">2 days ago</span>
            </div>
        </div>
    );
};

export default PostCard;
